"use client";

import { useEffect, useState } from "react";
import { Calendar, Plus, Clock, User, FileText, Check, X, Search, Filter } from "lucide-react";
import api from "@/lib/api";

interface Appointment {
    id: string;
    date: string; // ISO
    status: string;
    name?: string; // New Schema
    phone?: string; // New Schema
    email?: string; // New Schema
    notes?: string;
    user?: {
        name: string;
        email: string;
        phone: string | null;
    };
    treatment?: {
        name: string;
        duration: string;
    };
}

interface User {
    id: string;
    name: string;
    email: string;
    phone: string | null;
}

interface Treatment {
    id: string;
    name: string;
    duration: string;
}

export default function AppointmentsPage() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

    // Form Data
    const [users, setUsers] = useState<User[]>([]);
    const [treatments, setTreatments] = useState<Treatment[]>([]);
    const [formData, setFormData] = useState({
        userId: "",
        treatmentId: "",
        date: "",
        time: "",
        notes: ""
    });

    useEffect(() => {
        fetchAppointments();
        fetchFormOptions();
    }, []);

    const fetchAppointments = async () => {
        try {
            const res = await api.get("/admin/appointments");
            setAppointments(res.data);
        } catch (error) {
            console.error("Failed to fetch appointments", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchFormOptions = async () => {
        try {
            const [usersRes, treatmentsRes] = await Promise.all([
                api.get("/admin/users?role=CUSTOMER"),
                api.get("/admin/treatments")
            ]);
            setUsers(usersRes.data);
            setTreatments(treatmentsRes.data);
        } catch (error) {
            console.error("Failed to fetch options", error);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Combine date and time to ISO
            const dateTime = new Date(`${formData.date}T${formData.time}`).toISOString();

            await api.post("/admin/appointments", {
                userId: formData.userId,
                treatmentId: formData.treatmentId,
                date: dateTime,
                notes: formData.notes,
                status: "CONFIRMED" // Default for admin created
            });

            setIsModalOpen(false);
            fetchAppointments();
            // Reset form
            setFormData({ userId: "", treatmentId: "", date: "", time: "", notes: "" });
        } catch (error) {
            console.error("Failed to create appointment", error);
            alert("Failed to create appointment. Ensure all fields are valid.");
        }
    };

    const handleStatusUpdate = async (id: string, status: string) => {
        try {
            await api.put(`/admin/appointments/${id}`, { status });
            // Update local state
            setAppointments(apps => apps.map(a => a.id === id ? { ...a, status } : a));

            if (selectedAppointment && selectedAppointment.id === id) {
                setSelectedAppointment({ ...selectedAppointment, status });
            }
        } catch (error) {
            console.error('Update failed', error);
            alert('Failed to update status');
        }
    };

    const formatDate = (isoString: string) => {
        return new Date(isoString).toLocaleString('en-IN', {
            dateStyle: 'medium',
            timeStyle: 'short'
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'CONFIRMED': return 'bg-green-100 text-green-700';
            case 'PENDING': return 'bg-yellow-100 text-yellow-700';
            case 'CANCELLED': return 'bg-red-100 text-red-700';
            case 'COMPLETED': return 'bg-blue-100 text-blue-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-serif text-dark mb-2">Appointments</h1>
                    <p className="text-gray-600">Manage client bookings and schedules</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg transition shadow-md text-sm md:text-base"
                >
                    <Plus className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="hidden sm:inline">New Appointment</span>
                    <span className="sm:hidden">New</span>
                </button>
            </div>

            {/* Content */}
            {loading ? (
                <div className="p-12 text-center text-gray-500">Loading appointments...</div>
            ) : appointments.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border border-secondary p-12">
                    <div className="text-center text-gray-500">
                        <Calendar className="w-16 h-16 mx-auto mb-4 opacity-30" />
                        <h3 className="text-lg font-medium text-gray-700 mb-2">No Appointments Yet</h3>
                        <p className="mb-6">Start by creating your first appointment</p>
                        <button onClick={() => setIsModalOpen(true)} className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg transition">
                            Create Appointment
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    {/* Desktop Table View */}
                    <div className="hidden md:block bg-white rounded-lg shadow-sm border border-secondary overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="p-4 font-serif text-gray-700">Client</th>
                                    <th className="p-4 font-serif text-gray-700">Service</th>
                                    <th className="p-4 font-serif text-gray-700">Date & Time</th>
                                    <th className="p-4 font-serif text-gray-700">Status</th>
                                    <th className="p-4 font-serif text-gray-700 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {appointments.map((appt) => {
                                    const clientName = appt.name || appt.user?.name || 'Unknown Client';
                                    const clientContact = appt.phone || appt.user?.phone || appt.user?.email || 'No Contact';
                                    const treatmentName = appt.treatment?.name || 'General Consultation';
                                    const duration = appt.treatment?.duration || '-';

                                    return (
                                        <tr key={appt.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="p-4">
                                                <div className="font-medium text-gray-900">{clientName}</div>
                                                <div className="text-xs text-gray-500">{clientContact}</div>
                                            </td>
                                            <td className="p-4">
                                                <div className="text-gray-900">{treatmentName}</div>
                                                <div className="text-xs text-gray-500 flex items-center gap-1">
                                                    <Clock className="w-3 h-3" /> {duration}
                                                </div>
                                            </td>
                                            <td className="p-4 text-gray-600 text-sm">
                                                {formatDate(appt.date)}
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appt.status)}`}>
                                                    {appt.status}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right">
                                                <button
                                                    onClick={() => setSelectedAppointment(appt)}
                                                    className="text-primary hover:text-primary/70 text-sm font-medium transition underline underline-offset-4"
                                                >
                                                    Details
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="md:hidden space-y-3">
                        {appointments.map((appt) => {
                            const clientName = appt.name || appt.user?.name || 'Unknown';
                            const clientContact = appt.phone || appt.user?.phone || '';
                            const treatmentName = appt.treatment?.name || 'General Consultation';

                            return (
                                <div
                                    key={appt.id}
                                    className="bg-white rounded-lg border border-secondary p-4 shadow-sm"
                                    onClick={() => setSelectedAppointment(appt)}
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-medium text-gray-900 text-sm truncate">{clientName}</h3>
                                            <p className="text-xs text-gray-500 truncate">{clientContact}</p>
                                        </div>
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${getStatusColor(appt.status)} ml-2 flex-shrink-0`}>
                                            {appt.status}
                                        </span>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-xs text-gray-600">
                                            <User className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                                            <span className="truncate">{treatmentName}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-600">
                                            <Calendar className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                                            <span>{formatDate(appt.date)}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}

            {/* Details Modal */}
            {selectedAppointment && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-fadeIn">
                        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50">
                            <div>
                                <h2 className="text-xl font-serif text-dark mb-1">Appointment Details</h2>
                                <p className="text-xs text-gray-500 uppercase tracking-widest">{selectedAppointment.id.slice(0, 8)}</p>
                            </div>
                            <button onClick={() => setSelectedAppointment(null)} className="text-gray-400 hover:text-gray-600">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Client Info */}
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                    <User className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900 text-lg">
                                        {selectedAppointment.name || selectedAppointment.user?.name || 'Unknown'}
                                    </h3>
                                    <p className="text-gray-500">{selectedAppointment.phone || selectedAppointment.user?.phone || 'No Phone'}</p>
                                    <p className="text-gray-400 text-sm">{selectedAppointment.email || selectedAppointment.user?.email}</p>
                                </div>
                            </div>

                            {/* Service Info */}
                            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase mb-1">Service</p>
                                    <p className="font-medium text-gray-900">{selectedAppointment.treatment?.name || 'Consultation'}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase mb-1">Date & Time</p>
                                    <p className="font-medium text-gray-900">{formatDate(selectedAppointment.date)}</p>
                                </div>
                            </div>

                            {/* Notes */}
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-2">Notes / Request</p>
                                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 text-gray-700 text-sm italic">
                                    "{selectedAppointment.notes || 'No notes provided.'}"
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="pt-4 border-t border-gray-100">
                                <p className="text-xs text-gray-500 uppercase mb-3">Update Status</p>
                                <div className="flex flex-wrap gap-2">
                                    {['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => handleStatusUpdate(selectedAppointment.id, status)}
                                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border
                                                ${selectedAppointment.status === status
                                                    ? 'bg-primary text-white border-primary shadow-md'
                                                    : 'bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary'
                                                }`}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Create Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
                        <form onSubmit={handleCreate}>
                            <div className="flex items-center justify-between p-6 border-b border-gray-100">
                                <h2 className="text-xl font-serif text-dark">New Appointment</h2>
                                <button type="button" onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X className="w-6 h-6" /></button>
                            </div>

                            <div className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Client</label>
                                    {users.length === 0 ? (
                                        <div className="bg-blue-50 text-blue-700 p-3 rounded-lg text-sm">
                                            Creating guest booking (No client selected)
                                        </div>
                                    ) : (
                                        <select required className="w-full border border-gray-300 rounded-lg p-2 bg-white"
                                            value={formData.userId} onChange={(e) => setFormData({ ...formData, userId: e.target.value })}>
                                            <option value="">-- Choose Client --</option>
                                            {users.map(u => (
                                                <option key={u.id} value={u.id}>{u.name} ({u.phone || u.email})</option>
                                            ))}
                                        </select>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Treatment</label>
                                    <select required className="w-full border border-gray-300 rounded-lg p-2 bg-white"
                                        value={formData.treatmentId} onChange={(e) => setFormData({ ...formData, treatmentId: e.target.value })}>
                                        <option value="">-- Choose Treatment --</option>
                                        {treatments.map(t => (
                                            <option key={t.id} value={t.id}>{t.name} ({t.duration})</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                        <input type="date" required className="w-full border border-gray-300 rounded-lg p-2"
                                            value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                                        <input type="time" required className="w-full border border-gray-300 rounded-lg p-2"
                                            value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Internal Notes</label>
                                    <textarea className="w-full border border-gray-300 rounded-lg p-2" rows={2}
                                        value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} placeholder="Optional notes..."></textarea>
                                </div>
                            </div>

                            <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                                <button type="submit" className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">Create Booking</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
