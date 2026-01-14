"use client";

import { useEffect, useState } from "react";
import { Users, Plus, Search, Mail, Phone, Calendar, X, Clock, FileText } from "lucide-react";
import api from "@/lib/api";

interface User {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    createdAt: string;
}

interface Appointment {
    id: string;
    date: string;
    timeSlot: string;
    status: string;
    treatment: { name: string } | null;
    notes: string;
}

export default function ClientsPage() {
    const [clients, setClients] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // History Modal State
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState<User | null>(null);
    const [historyAppointments, setHistoryAppointments] = useState<Appointment[]>([]);
    const [historyLoading, setHistoryLoading] = useState(false);

    // Form
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: ""
    });

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            const res = await api.get("/admin/users?role=CUSTOMER");
            setClients(res.data);
        } catch (error) {
            console.error("Failed to fetch clients", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post("/admin/users", formData);
            setIsModalOpen(false);
            fetchClients();
            setFormData({ firstName: "", lastName: "", email: "", phone: "" });
        } catch (error) {
            console.error("Failed to create client", error);
            alert("Failed to create client. Check email/phone uniqueness.");
        }
    };

    const handleViewHistory = async (client: User) => {
        setSelectedClient(client);
        setIsHistoryOpen(true);
        setHistoryLoading(true);
        try {
            // Fetch appointments filtering by email
            const res = await api.get(`/admin/appointments?email=${client.email}`);
            setHistoryAppointments(res.data);
        } catch (error) {
            console.error("Failed to fetch history", error);
        } finally {
            setHistoryLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric', month: 'short', day: 'numeric'
        });
    };

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-serif text-dark mb-2">Clients</h1>
                    <p className="text-gray-600">Manage your client database</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition shadow-md"
                >
                    <Plus className="w-5 h-5" />
                    Add Client
                </button>
            </div>

            {/* Content */}
            {loading ? (
                <div className="p-12 text-center text-gray-500">Loading clients...</div>
            ) : clients.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border border-secondary p-12">
                    <div className="text-center text-gray-500">
                        <Users className="w-16 h-16 mx-auto mb-4 opacity-30" />
                        <h3 className="text-lg font-medium text-gray-700 mb-2">No Clients Yet</h3>
                        <p className="mb-6">Your client list will appear here once they book appointments</p>
                        <button onClick={() => setIsModalOpen(true)} className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg transition">
                            Add First Client
                        </button>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-sm border border-secondary overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="p-4 font-serif text-gray-700">Name</th>
                                <th className="p-4 font-serif text-gray-700">Contact</th>
                                <th className="p-4 font-serif text-gray-700">Joined</th>
                                <th className="p-4 font-serif text-gray-700 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {clients.map((client) => (
                                <tr key={client.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="p-4 font-medium text-gray-900">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                                                {client.name ? client.name[0].toUpperCase() : 'U'}
                                            </div>
                                            {client.name}
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-600">
                                        <div className="flex flex-col gap-1 text-sm">
                                            <div className="flex items-center gap-2"><Mail className="w-3 h-3" /> {client.email}</div>
                                            {client.phone && <div className="flex items-center gap-2"><Phone className="w-3 h-3" /> {client.phone}</div>}
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-600 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-3 h-3" /> {formatDate(client.createdAt)}
                                        </div>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button
                                            onClick={() => handleViewHistory(client)}
                                            className="text-primary hover:underline text-sm font-medium"
                                        >
                                            View History
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Create Client Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
                        <form onSubmit={handleCreate}>
                            <div className="flex items-center justify-between p-6 border-b border-gray-100">
                                <h2 className="text-xl font-serif text-dark">Add New Client</h2>
                                <button type="button" onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
                            </div>

                            <div className="p-6 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                        <input required className="w-full border border-gray-300 rounded-lg p-2"
                                            value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                        <input required className="w-full border border-gray-300 rounded-lg p-2"
                                            value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input type="email" required className="w-full border border-gray-300 rounded-lg p-2"
                                        value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input type="tel" required className="w-full border border-gray-300 rounded-lg p-2"
                                        value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                                </div>
                            </div>

                            <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                                <button type="submit" className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">Add Client</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* History Modal */}
            {isHistoryOpen && selectedClient && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col">
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <div>
                                <h2 className="text-xl font-serif text-dark">{selectedClient.name}</h2>
                                <p className="text-sm text-gray-500">Appointment History</p>
                            </div>
                            <button onClick={() => setIsHistoryOpen(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
                        </div>

                        <div className="p-6 overflow-y-auto flex-1">
                            {historyLoading ? (
                                <div className="text-center py-8 text-gray-500">Loading history...</div>
                            ) : historyAppointments.length === 0 ? (
                                <div className="text-center py-8 border-2 border-dashed border-gray-100 rounded-lg">
                                    <p className="text-gray-500">No appointments found for this client.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {historyAppointments.map((apt) => (
                                        <div key={apt.id} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h4 className="font-medium text-gray-900">{apt.treatment?.name || 'General Appointment'}</h4>
                                                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                                                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {formatDate(apt.date)}</span>
                                                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {apt.timeSlot}</span>
                                                    </div>
                                                </div>
                                                <span className={`px-2 py-1 rounded text-xs font-medium 
                                                    ${apt.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' :
                                                        apt.status === 'COMPLETED' ? 'bg-blue-100 text-blue-700' :
                                                            'bg-yellow-100 text-yellow-700'}`}>
                                                    {apt.status}
                                                </span>
                                            </div>
                                            {apt.notes && (
                                                <div className="bg-gray-50 p-2 rounded text-xs text-gray-600 flex gap-2 mt-2">
                                                    <FileText className="w-3 h-3 shrink-0 mt-0.5" />
                                                    {apt.notes}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
