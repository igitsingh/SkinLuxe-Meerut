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
                <div className="space-y-3">
                    {inquiries.map((inquiry) => (
                        <div key={inquiry.id} className="bg-white rounded-lg border border-secondary p-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-3 mb-3">
                                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2 mb-1">
                                        <h3 className="font-medium text-gray-900 text-sm truncate">{inquiry.subject || 'General Inquiry'}</h3>
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase flex-shrink-0 ${getStatusColor(inquiry.status)}`}>
                                            {inquiry.status.replace('_', ' ')}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-0.5 text-xs text-gray-500">
                                        <span className="flex items-center gap-1 truncate">
                                            <User className="w-3 h-3 flex-shrink-0" /> {inquiry.name}
                                        </span>
                                        <span className="truncate">{inquiry.email}</span>
                                        {inquiry.phone && <span>{inquiry.phone}</span>}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-gray-700 text-xs mb-3 line-clamp-3">
                                {inquiry.message}
                            </div>

                            <div className="flex items-center justify-between text-xs border-t border-gray-100 pt-3">
                                <div className="flex gap-2 flex-wrap">
                                    {inquiry.status !== 'RESOLVED' && (
                                        <button
                                            onClick={() => handleStatusUpdate(inquiry.id, 'RESOLVED')}
                                            className="flex items-center gap-1 px-2 py-1 text-green-600 bg-green-50 rounded hover:bg-green-100 transition"
                                        >
                                            <CheckCircle className="w-3 h-3" /> Resolve
                                        </button>
                                    )}
                                    {inquiry.status !== 'ARCHIVED' && (
                                        <button
                                            onClick={() => handleStatusUpdate(inquiry.id, 'ARCHIVED')}
                                            className="flex items-center gap-1 px-2 py-1 text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition"
                                        >
                                            <Archive className="w-3 h-3" /> Archive
                                        </button>
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-400 flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> {formatDate(inquiry.createdAt)}
                                    </span>
                                    <button
                                        onClick={() => handleDelete(inquiry.id)}
                                        className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
