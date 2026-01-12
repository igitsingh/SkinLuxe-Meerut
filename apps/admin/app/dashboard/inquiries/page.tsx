"use client";

import { useEffect, useState } from "react";
import { MessageSquare, Clock, CheckCircle, Archive, Trash2, Mail, User } from "lucide-react";
import api from "@/lib/api";

interface Inquiry {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    subject: string | null;
    message: string;
    status: string; // NEW, IN_PROGRESS, RESOLVED, ARCHIVED
    createdAt: string;
}

export default function InquiriesPage() {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        try {
            const res = await api.get("/admin/inquiries");
            setInquiries(res.data);
        } catch (error) {
            console.error("Failed to fetch inquiries", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id: string, status: string) => {
        try {
            await api.put(`/admin/inquiries/${id}`, { status });
            setInquiries(inqs => inqs.map(i => i.id === id ? { ...i, status } : i));
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this inquiry?")) return;
        try {
            await api.delete(`/admin/inquiries/${id}`);
            setInquiries(inqs => inqs.filter(i => i.id !== id));
        } catch (error) {
            console.error("Failed to delete inquiry", error);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-IN', {
            dateStyle: 'medium',
            timeStyle: 'short'
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'NEW': return 'bg-blue-100 text-blue-700';
            case 'IN_PROGRESS': return 'bg-yellow-100 text-yellow-700';
            case 'RESOLVED': return 'bg-green-100 text-green-700';
            case 'ARCHIVED': return 'bg-gray-100 text-gray-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-serif text-dark mb-2">Inquiries</h1>
                <p className="text-gray-600">Contact form submissions and messages</p>
            </div>

            {/* Content */}
            {loading ? (
                <div className="p-12 text-center text-gray-500">Loading inquiries...</div>
            ) : inquiries.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border border-secondary p-12">
                    <div className="text-center text-gray-500">
                        <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-30" />
                        <h3 className="text-lg font-medium text-gray-700 mb-2">No Inquiries Yet</h3>
                        <p>Customer inquiries from the website will appear here</p>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-sm border border-secondary overflow-hidden">
                    <ul className="divide-y divide-gray-50">
                        {inquiries.map((inquiry) => (
                            <li key={inquiry.id} className="p-6 hover:bg-gray-50/50 transition-colors">
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h3 className="font-medium text-gray-900 text-lg">{inquiry.subject || 'No Subject'}</h3>
                                                <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                                                    <span className="flex items-center gap-1"><User className="w-3 h-3" /> {inquiry.name}</span>
                                                    <span>•</span>
                                                    <span>{inquiry.email}</span>
                                                    {inquiry.phone && (
                                                        <>
                                                            <span>•</span>
                                                            <span>{inquiry.phone}</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 ${getStatusColor(inquiry.status)}`}>
                                                    {inquiry.status}
                                                </span>
                                                <div className="text-xs text-gray-400 flex items-center gap-1 justify-end">
                                                    <Clock className="w-3 h-3" /> {formatDate(inquiry.createdAt)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-gray-700 mb-4">
                                            {inquiry.message}
                                        </div>
                                        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                                            <div className="flex gap-2">
                                                {inquiry.status !== 'RESOLVED' && (
                                                    <button onClick={() => handleStatusUpdate(inquiry.id, 'RESOLVED')} className="text-xs font-medium text-green-600 hover:text-green-700 flex items-center gap-1">
                                                        <CheckCircle className="w-4 h-4" /> Mark Resolved
                                                    </button>
                                                )}
                                                {inquiry.status !== 'ARCHIVED' && (
                                                    <button onClick={() => handleStatusUpdate(inquiry.id, 'ARCHIVED')} className="text-xs font-medium text-gray-500 hover:text-gray-700 flex items-center gap-1 ml-4">
                                                        <Archive className="w-4 h-4" /> Archive
                                                    </button>
                                                )}
                                            </div>
                                            <button onClick={() => handleDelete(inquiry.id)} className="text-red-400 hover:text-red-600 transition">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
