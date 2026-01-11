'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import {
    Users,
    Search,
    RefreshCw,
    Eye,
    Edit,
    Trash2,
    X,
    Calendar,
    Mail,
    Phone,
    User,
} from 'lucide-react';

interface Patient {
    id: string;
    email: string;
    full_name: string;
    phone: string;
    date_of_birth: string | null;
    gender: string | null;
    address: string | null;
    created_at: string;
    _count?: {
        appointments: number;
        records: number;
    };
}

export default function UsersPage() {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            setLoading(true);
            let url = '/api/patients';
            if (searchQuery) url += `?search=${searchQuery}`;

            const response = await fetch(url);
            const data = await response.json();

            if (data.success) {
                setPatients(data.data);
            }
        } catch (error) {
            console.error('Error fetching patients:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleView = (patient: Patient) => {
        setSelectedPatient(patient);
        setIsEditing(false);
        setShowModal(true);
    };

    const handleEdit = (patient: Patient) => {
        setSelectedPatient(patient);
        setIsEditing(true);
        setShowModal(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            return;
        }

        try {
            const response = await fetch(`/api/patients/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchPatients();
                alert('User deleted successfully');
            }
        } catch (error) {
            console.error('Error deleting patient:', error);
            alert('Failed to delete user');
        }
    };

    const handleSaveEdit = async () => {
        if (!selectedPatient) return;

        try {
            const response = await fetch(`/api/patients/${selectedPatient.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    full_name: selectedPatient.full_name,
                    phone: selectedPatient.phone,
                    email: selectedPatient.email,
                    date_of_birth: selectedPatient.date_of_birth,
                    gender: selectedPatient.gender,
                    address: selectedPatient.address,
                }),
            });

            if (response.ok) {
                setShowModal(false);
                setSelectedPatient(null);
                fetchPatients();
                alert('User updated successfully!');
            }
        } catch (error) {
            console.error('Error saving patient:', error);
            alert('Failed to update user');
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    const filteredPatients = patients.filter((patient) =>
        patient.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.phone.includes(searchQuery)
    );

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-serif text-gray-900">Users</h1>
                        <p className="mt-2 text-gray-600">
                            Manage registered patients and users
                        </p>
                    </div>
                    <button
                        onClick={fetchPatients}
                        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                        Refresh
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Users</p>
                                <p className="text-2xl font-semibold text-gray-900 mt-1">
                                    {patients.length}
                                </p>
                            </div>
                            <Users className="w-8 h-8 text-[#E91E63]" />
                        </div>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">New This Month</p>
                                <p className="text-2xl font-semibold text-gray-900 mt-1">
                                    {patients.filter(p => {
                                        const created = new Date(p.created_at);
                                        const now = new Date();
                                        return created.getMonth() === now.getMonth() &&
                                            created.getFullYear() === now.getFullYear();
                                    }).length}
                                </p>
                            </div>
                            <Calendar className="w-8 h-8 text-blue-600" />
                        </div>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Active Users</p>
                                <p className="text-2xl font-semibold text-gray-900 mt-1">
                                    {patients.filter(p => p._count && p._count.appointments > 0).length}
                                </p>
                            </div>
                            <User className="w-8 h-8 text-green-600" />
                        </div>
                    </div>
                </div>

                {/* Search */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name, email, or phone..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E91E63] focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <RefreshCw className="w-8 h-8 text-[#E91E63] animate-spin" />
                        </div>
                    ) : filteredPatients.length === 0 ? (
                        <div className="text-center py-12">
                            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600">No users found</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                                            User
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                                            Contact
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                                            Registered
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                                            Appointments
                                        </th>
                                        <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredPatients.map((patient) => (
                                        <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        {patient.full_name}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        {patient.email}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Phone className="w-4 h-4" />
                                                    {patient.phone}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {formatDate(patient.created_at)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                                    {patient._count?.appointments || 0} bookings
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleView(patient)}
                                                        className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="View Details"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleEdit(patient)}
                                                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                                                        title="Edit User"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(patient.id)}
                                                        className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Delete User"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
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
                {showModal && selectedPatient && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                <h2 className="text-2xl font-serif text-gray-900">
                                    {isEditing ? 'Edit User' : 'User Details'}
                                </h2>
                                <button
                                    onClick={() => {
                                        setShowModal(false);
                                        setSelectedPatient(null);
                                    }}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6 space-y-6">
                                {isEditing ? (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                            <input
                                                type="text"
                                                value={selectedPatient.full_name}
                                                onChange={(e) => setSelectedPatient({
                                                    ...selectedPatient,
                                                    full_name: e.target.value
                                                })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E91E63] focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                            <input
                                                type="email"
                                                value={selectedPatient.email}
                                                onChange={(e) => setSelectedPatient({
                                                    ...selectedPatient,
                                                    email: e.target.value
                                                })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E91E63] focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                            <input
                                                type="tel"
                                                value={selectedPatient.phone}
                                                onChange={(e) => setSelectedPatient({
                                                    ...selectedPatient,
                                                    phone: e.target.value
                                                })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E91E63] focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                                            <input
                                                type="date"
                                                value={selectedPatient.date_of_birth?.split('T')[0] || ''}
                                                onChange={(e) => setSelectedPatient({
                                                    ...selectedPatient,
                                                    date_of_birth: e.target.value
                                                })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E91E63] focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                                            <select
                                                value={selectedPatient.gender || ''}
                                                onChange={(e) => setSelectedPatient({
                                                    ...selectedPatient,
                                                    gender: e.target.value
                                                })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E91E63] focus:border-transparent"
                                            >
                                                <option value="">Select Gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                            <textarea
                                                value={selectedPatient.address || ''}
                                                onChange={(e) => setSelectedPatient({
                                                    ...selectedPatient,
                                                    address: e.target.value
                                                })}
                                                rows={3}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E91E63] focus:border-transparent resize-none"
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                                            <div>
                                                <p className="text-sm text-gray-500">Full Name</p>
                                                <p className="font-medium text-gray-900">{selectedPatient.full_name}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Email</p>
                                                <p className="text-gray-900">{selectedPatient.email}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Phone</p>
                                                <p className="text-gray-900">{selectedPatient.phone}</p>
                                            </div>
                                            {selectedPatient.date_of_birth && (
                                                <div>
                                                    <p className="text-sm text-gray-500">Date of Birth</p>
                                                    <p className="text-gray-900">{formatDate(selectedPatient.date_of_birth)}</p>
                                                </div>
                                            )}
                                            {selectedPatient.gender && (
                                                <div>
                                                    <p className="text-sm text-gray-500">Gender</p>
                                                    <p className="text-gray-900 capitalize">{selectedPatient.gender}</p>
                                                </div>
                                            )}
                                            {selectedPatient.address && (
                                                <div>
                                                    <p className="text-sm text-gray-500">Address</p>
                                                    <p className="text-gray-900">{selectedPatient.address}</p>
                                                </div>
                                            )}
                                            <div>
                                                <p className="text-sm text-gray-500">Registered</p>
                                                <p className="text-gray-900">{formatDate(selectedPatient.created_at)}</p>
                                            </div>
                                            {selectedPatient._count && (
                                                <div>
                                                    <p className="text-sm text-gray-500">Total Appointments</p>
                                                    <p className="text-gray-900">{selectedPatient._count.appointments}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Modal Footer */}
                            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
                                <button
                                    onClick={() => {
                                        setShowModal(false);
                                        setSelectedPatient(null);
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
