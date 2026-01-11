'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import {
    Mail,
    Search,
    RefreshCw,
    Eye,
    Trash2,
    X,
    Phone,
    Calendar,
    CheckCircle,
    Clock,
    AlertCircle,
} from 'lucide-react';

interface Inquiry {
    id: string;
    name: string;
    email: string;
    phone: string;
    service: string;
    message: string | null;
    status: string;
    notes: string | null;
    created_at: string;
    updated_at: string;
}

export default function InquiriesPage() {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchInquiries();
    }, [statusFilter]);

    const fetchInquiries = async () => {
        try {
            setLoading(true);
            let url = '/api/inquiries';
            const params = new URLSearchParams();

            if (statusFilter !== 'all') params.append('status', statusFilter);
            if (params.toString()) url += `?${params.toString()}`;

            const response = await fetch(url);
            const data = await response.json();

            if (data.success) {
                setInquiries(data.data);
            }
        } catch (error) {
            console.error('Error fetching inquiries:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleView = (inquiry: Inquiry) => {
        setSelectedInquiry(inquiry);
        setShowModal(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this inquiry?')) {
            return;
        }

        try {
            const response = await fetch(`/api/inquiries/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchInquiries();
                alert('Inquiry deleted successfully');
            }
        } catch (error) {
            console.error('Error deleting inquiry:', error);
            alert('Failed to delete inquiry');
        }
    };

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        try {
            const response = await fetch(`/api/inquiries/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                fetchInquiries();
                if (selectedInquiry && selectedInquiry.id === id) {
                    setSelectedInquiry({ ...selectedInquiry, status: newStatus });
                }
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'new':
                return 'bg-blue-100 text-blue-800';
            case 'contacted':
                return 'bg-yellow-100 text-yellow-800';
            case 'resolved':
                return 'bg-green-100 text-green-800';
            case 'closed':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status.toLowerCase()) {
            case 'new':
                return <AlertCircle className="w-4 h-4" />;
            case 'contacted':
                return <Clock className="w-4 h-4" />;
            case 'resolved':
                return <CheckCircle className="w-4 h-4" />;
            default:
                return <Mail className="w-4 h-4" />;
        }
    };

    const filteredInquiries = inquiries.filter((inquiry) =>
        inquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inquiry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inquiry.phone.includes(searchQuery) ||
        inquiry.service.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-serif text-gray-900">Inquiries</h1>
                        <p className="mt-2 text-gray-600">
                            Manage customer inquiries and contact form submissions
                        </p>
                    </div>
                    <button
                        onClick={fetchInquiries}
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
                                <p className="text-sm text-gray-600">Total Inquiries</p>
                                <p className="text-2xl font-semibold text-gray-900 mt-1">
                                    {inquiries.length}
                                </p>
                            </div>
                            <Mail className="w-8 h-8 text-[#E91E63]" />
                        </div>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">New</p>
                                <p className="text-2xl font-semibold text-gray-900 mt-1">
                                    {inquiries.filter(i => i.status === 'new').length}
                                </p>
                            </div>
                            <AlertCircle className="w-8 h-8 text-blue-600" />
                        </div>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Contacted</p>
                                <p className="text-2xl font-semibold text-gray-900 mt-1">
                                    {inquiries.filter(i => i.status === 'contacted').length}
                                </p>
                            </div>
                            <Clock className="w-8 h-8 text-yellow-600" />
                        </div>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Resolved</p>
                                <p className="text-2xl font-semibold text-gray-900 mt-1">
                                    {inquiries.filter(i => i.status === 'resolved').length}
                                </p>
                            </div>
                            <CheckCircle className="w-8 h-8 text-green-600" />
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
                                placeholder="Search by name, email, phone, or service..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E91E63] focus:border-transparent"
                            />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E91E63] focus:border-transparent"
                        >
                            <option value="all">All Status</option>
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="resolved">Resolved</option>
                            <option value="closed">Closed</option>
                        </select>
                    </div>
                </div>

                {/* Inquiries Table */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <RefreshCw className="w-8 h-8 text-[#E91E63] animate-spin" />
                        </div>
                    ) : filteredInquiries.length === 0 ? (
                        <div className="text-center py-12">
                            <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600">No inquiries found</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                                            Contact
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                                            Service
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                                            Date
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
                                    {filteredInquiries.map((inquiry) => (
                                        <tr key={inquiry.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        {inquiry.name}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        {inquiry.email}
                                                    </p>
                                                    <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                                                        <Phone className="w-3 h-3" />
                                                        {inquiry.phone}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-gray-900">
                                                    {inquiry.service}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Calendar className="w-4 h-4" />
                                                    {formatDate(inquiry.created_at)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <select
                                                    value={inquiry.status}
                                                    onChange={(e) => handleStatusUpdate(inquiry.id, e.target.value)}
                                                    className={`px-3 py-1 rounded-full text-xs font-medium border-0 flex items-center gap-1 ${getStatusColor(inquiry.status)}`}
                                                >
                                                    <option value="new">New</option>
                                                    <option value="contacted">Contacted</option>
                                                    <option value="resolved">Resolved</option>
                                                    <option value="closed">Closed</option>
                                                </select>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleView(inquiry)}
                                                        className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="View Details"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(inquiry.id)}
                                                        className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Delete Inquiry"
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

                {/* View Modal */}
                {showModal && selectedInquiry && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                <h2 className="text-2xl font-serif text-gray-900">
                                    Inquiry Details
                                </h2>
                                <button
                                    onClick={() => {
                                        setShowModal(false);
                                        setSelectedInquiry(null);
                                    }}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6 space-y-6">
                                {/* Contact Info */}
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-3">Contact Information</h3>
                                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                                        <div>
                                            <p className="text-sm text-gray-500">Name</p>
                                            <p className="font-medium text-gray-900">{selectedInquiry.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Email</p>
                                            <a href={`mailto:${selectedInquiry.email}`} className="text-[#E91E63] hover:underline">
                                                {selectedInquiry.email}
                                            </a>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Phone</p>
                                            <a href={`tel:${selectedInquiry.phone}`} className="text-[#E91E63] hover:underline">
                                                {selectedInquiry.phone}
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Inquiry Details */}
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-3">Inquiry Details</h3>
                                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                                        <div>
                                            <p className="text-sm text-gray-500">Service Interested In</p>
                                            <p className="font-medium text-gray-900">{selectedInquiry.service}</p>
                                        </div>
                                        {selectedInquiry.message && (
                                            <div>
                                                <p className="text-sm text-gray-500">Message</p>
                                                <p className="text-gray-900 whitespace-pre-wrap">{selectedInquiry.message}</p>
                                            </div>
                                        )}
                                        <div>
                                            <p className="text-sm text-gray-500">Submitted</p>
                                            <p className="text-gray-900">{formatDate(selectedInquiry.created_at)}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Status</p>
                                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedInquiry.status)}`}>
                                                {getStatusIcon(selectedInquiry.status)}
                                                {selectedInquiry.status.charAt(0).toUpperCase() + selectedInquiry.status.slice(1)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="flex items-center justify-between p-6 border-t border-gray-200">
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleStatusUpdate(selectedInquiry.id, 'contacted')}
                                        className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
                                    >
                                        Mark as Contacted
                                    </button>
                                    <button
                                        onClick={() => handleStatusUpdate(selectedInquiry.id, 'resolved')}
                                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                                    >
                                        Mark as Resolved
                                    </button>
                                </div>
                                <button
                                    onClick={() => {
                                        setShowModal(false);
                                        setSelectedInquiry(null);
                                    }}
                                    className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
