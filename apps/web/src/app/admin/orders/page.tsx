'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import {
    Calendar,
    Search,
    Filter,
    RefreshCw,
    Eye,
    Edit,
    X,
    CheckCircle,
    Clock,
    User,
} from 'lucide-react';

interface Appointment {
    id: string;
    patient_id: string;
    treatment_id: string;
    appointment_date: string;
    appointment_time: string;
    status: string;
    duration: number;
    patient_notes: string | null;
    admin_notes: string | null;
    created_at: string;
    updated_at: string;
    patient: {
        id: string;
        full_name: string;
        email: string;
        phone: string;
    };
    treatment: {
        id: string;
        name: string;
        category: string;
        duration: number;
        price: string;
    };
}

export default function AppointmentsPage() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');
    const [dateFilter, setDateFilter] = useState('');
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            let url = '/api/appointments';
            const params = new URLSearchParams();

            if (statusFilter !== 'ALL') params.append('status', statusFilter);
            if (dateFilter) params.append('date', dateFilter);

            if (params.toString()) url += `?${params.toString()}`;

            const response = await fetch(url);
            const data = await response.json();

            if (data.success) {
                setAppointments(data.data);
            }
        } catch (error) {
            console.error('Error fetching appointments:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            const response = await fetch(`/api/appointments/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                fetchAppointments();
            }
        } catch (error) {
            console.error('Error updating appointment:', error);
        }
    };

    const handleView = (appointment: Appointment) => {
        setSelectedAppointment(appointment);
        setIsEditing(false);
        setShowModal(true);
    };

    const handleEdit = (appointment: Appointment) => {
        setSelectedAppointment(appointment);
        setIsEditing(true);
        setShowModal(true);
    };

    const handleCancel = async (id: string) => {
        if (confirm('Are you sure you want to cancel this appointment?')) {
            await updateStatus(id, 'cancelled');
        }
    };

    const handleReschedule = (appointment: Appointment) => {
        setSelectedAppointment(appointment);
        setIsEditing(true);
        setShowModal(true);
    };

    const handleSaveEdit = async () => {
        if (!selectedAppointment) return;

        try {
            const response = await fetch(`/api/appointments/${selectedAppointment.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    appointment_date: selectedAppointment.appointment_date,
                    appointment_time: selectedAppointment.appointment_time,
                    status: selectedAppointment.status,
                    admin_notes: selectedAppointment.admin_notes,
                }),
            });

            if (response.ok) {
                setShowModal(false);
                setSelectedAppointment(null);
                fetchAppointments();
                alert('Appointment updated successfully!');
            }
        } catch (error) {
            console.error('Error saving appointment:', error);
            alert('Failed to update appointment');
        }
    };

    const filteredAppointments = appointments.filter((apt) => {
        const matchesSearch =
            apt.patient.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            apt.patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            apt.treatment.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
    });

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    const formatPrice = (price: string) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(parseFloat(price));
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'confirmed':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'completed':
                return 'bg-blue-100 text-blue-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const todayAppointments = appointments.filter(
        apt => new Date(apt.appointment_date).toDateString() === new Date().toDateString()
    );

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-serif text-gray-900">Appointments</h1>
                        <p className="mt-2 text-gray-600">
                            Manage patient appointments and bookings
                        </p>
                    </div>
                    <button
                        onClick={fetchAppointments}
                        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                        Refresh
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Appointments</p>
                                <p className="text-2xl font-semibold text-gray-900 mt-1">
                                    {appointments.length}
                                </p>
                            </div>
                            <Calendar className="w-8 h-8 text-[#E91E63]" />
                        </div>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Today</p>
                                <p className="text-2xl font-semibold text-gray-900 mt-1">
                                    {todayAppointments.length}
                                </p>
                            </div>
                            <Clock className="w-8 h-8 text-blue-600" />
                        </div>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Confirmed</p>
                                <p className="text-2xl font-semibold text-gray-900 mt-1">
                                    {appointments.filter(a => a.status === 'confirmed').length}
                                </p>
                            </div>
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Pending</p>
                                <p className="text-2xl font-semibold text-gray-900 mt-1">
                                    {appointments.filter(a => a.status === 'pending').length}
                                </p>
                            </div>
                            <Clock className="w-8 h-8 text-yellow-600" />
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by patient name, email, or treatment..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E91E63] focus:border-transparent"
                            />
                        </div>
                        <input
                            type="date"
                            value={dateFilter}
                            onChange={(e) => {
                                setDateFilter(e.target.value);
                                setTimeout(fetchAppointments, 100);
                            }}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E91E63] focus:border-transparent"
                        />
                        <select
                            value={statusFilter}
                            onChange={(e) => {
                                setStatusFilter(e.target.value);
                                setTimeout(fetchAppointments, 100);
                            }}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E91E63] focus:border-transparent"
                        >
                            <option value="ALL">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>

                {/* Appointments Table */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <RefreshCw className="w-8 h-8 text-[#E91E63] animate-spin" />
                        </div>
                    ) : filteredAppointments.length === 0 ? (
                        <div className="text-center py-12">
                            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600">No appointments found</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                                            Patient
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                                            Treatment
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                                            Date & Time
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                                            Duration
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredAppointments.map((appointment) => (
                                        <tr key={appointment.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        {appointment.patient.full_name}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        {appointment.patient.phone}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        {appointment.treatment.name}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        {formatPrice(appointment.treatment.price)}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        {formatDate(appointment.appointment_date)}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        {appointment.appointment_time}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {appointment.duration} mins
                                            </td>
                                            <td className="px-6 py-4">
                                                <select
                                                    value={appointment.status}
                                                    onChange={(e) => updateStatus(appointment.id, e.target.value)}
                                                    className={`px-3 py-1 rounded-full text-xs font-medium border-0 ${getStatusColor(appointment.status)}`}
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="confirmed">Confirmed</option>
                                                    <option value="completed">Completed</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleView(appointment)}
                                                        className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="View Details"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleEdit(appointment)}
                                                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                                                        title="Edit Appointment"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleCancel(appointment.id)}
                                                        className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Cancel Appointment"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* View/Edit Modal */}
                {showModal && selectedAppointment && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                <h2 className="text-2xl font-serif text-gray-900">
                                    {isEditing ? 'Edit Appointment' : 'Appointment Details'}
                                </h2>
                                <button
                                    onClick={() => {
                                        setShowModal(false);
                                        setSelectedAppointment(null);
                                    }}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6 space-y-6">
                                {/* Patient Info */}
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-3">Patient Information</h3>
                                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                        <p className="text-gray-900"><strong>Name:</strong> {selectedAppointment.patient.full_name}</p>
                                        <p className="text-gray-900"><strong>Email:</strong> {selectedAppointment.patient.email}</p>
                                        <p className="text-gray-900"><strong>Phone:</strong> {selectedAppointment.patient.phone}</p>
                                    </div>
                                </div>

                                {/* Treatment Info */}
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-3">Treatment Information</h3>
                                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                        <p className="text-gray-900"><strong>Treatment:</strong> {selectedAppointment.treatment.name}</p>
                                        <p className="text-gray-900"><strong>Category:</strong> {selectedAppointment.treatment.category}</p>
                                        <p className="text-gray-900"><strong>Price:</strong> {formatPrice(selectedAppointment.treatment.price)}</p>
                                        <p className="text-gray-900"><strong>Duration:</strong> {selectedAppointment.duration} mins</p>
                                    </div>
                                </div>

                                {/* Appointment Details */}
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-3">Appointment Details</h3>
                                    <div className="space-y-4">
                                        {isEditing ? (
                                            <>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                                                    <input
                                                        type="date"
                                                        value={selectedAppointment.appointment_date.split('T')[0]}
                                                        onChange={(e) => setSelectedAppointment({
                                                            ...selectedAppointment,
                                                            appointment_date: e.target.value
                                                        })}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E91E63] focus:border-transparent"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                                                    <input
                                                        type="time"
                                                        value={selectedAppointment.appointment_time}
                                                        onChange={(e) => setSelectedAppointment({
                                                            ...selectedAppointment,
                                                            appointment_time: e.target.value
                                                        })}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E91E63] focus:border-transparent"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                                    <select
                                                        value={selectedAppointment.status}
                                                        onChange={(e) => setSelectedAppointment({
                                                            ...selectedAppointment,
                                                            status: e.target.value
                                                        })}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E91E63] focus:border-transparent"
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="confirmed">Confirmed</option>
                                                        <option value="completed">Completed</option>
                                                        <option value="cancelled">Cancelled</option>
                                                    </select>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                                <p className="text-gray-900"><strong>Date:</strong> {formatDate(selectedAppointment.appointment_date)}</p>
                                                <p className="text-gray-900"><strong>Time:</strong> {selectedAppointment.appointment_time}</p>
                                                <p className="text-gray-900">
                                                    <strong>Status:</strong>{' '}
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedAppointment.status)}`}>
                                                        {selectedAppointment.status.charAt(0).toUpperCase() + selectedAppointment.status.slice(1)}
                                                    </span>
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Notes */}
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-3">Notes</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Patient Notes</label>
                                            <div className="bg-gray-50 rounded-lg p-4">
                                                <p className="text-gray-900">{selectedAppointment.patient_notes || 'No notes'}</p>
                                            </div>
                                        </div>
                                        {isEditing ? (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Admin Notes</label>
                                                <textarea
                                                    value={selectedAppointment.admin_notes || ''}
                                                    onChange={(e) => setSelectedAppointment({
                                                        ...selectedAppointment,
                                                        admin_notes: e.target.value
                                                    })}
                                                    rows={4}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E91E63] focus:border-transparent resize-none"
                                                    placeholder="Add admin notes..."
                                                />
                                            </div>
                                        ) : (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Admin Notes</label>
                                                <div className="bg-gray-50 rounded-lg p-4">
                                                    <p className="text-gray-900">{selectedAppointment.admin_notes || 'No notes'}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
                                <button
                                    onClick={() => {
                                        setShowModal(false);
                                        setSelectedAppointment(null);
                                    }}
                                    className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    {isEditing ? 'Cancel' : 'Close'}
                                </button>
                                {isEditing && (
                                    <button
                                        onClick={handleSaveEdit}
                                        className="px-6 py-2 bg-[#E91E63] text-white rounded-lg hover:bg-[#C2185B] transition-colors"
                                    >
                                        Save Changes
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
