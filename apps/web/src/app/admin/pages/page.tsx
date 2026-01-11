'use client';

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import Link from 'next/link';
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Eye,
    Copy,
    MoreVertical,
    FileText,
    Globe,
    Archive,
} from 'lucide-react';

// Mock data - will be replaced with actual API calls
const mockPages = [
    {
        id: '1',
        title: 'Home',
        slug: '/',
        status: 'PUBLISHED',
        updatedAt: '2024-12-06T10:30:00Z',
        isHomePage: true,
    },
    {
        id: '2',
        title: 'About Us',
        slug: '/about',
        status: 'PUBLISHED',
        updatedAt: '2024-12-05T14:20:00Z',
        isHomePage: false,
    },
    {
        id: '3',
        title: 'Bridal Collection',
        slug: '/bridal',
        status: 'PUBLISHED',
        updatedAt: '2024-12-04T09:15:00Z',
        isHomePage: false,
    },
    {
        id: '4',
        title: 'Fine Jewellery',
        slug: '/fine-jewellery',
        status: 'PUBLISHED',
        updatedAt: '2024-12-03T16:45:00Z',
        isHomePage: false,
    },
    {
        id: '5',
        title: 'Heritage Collection',
        slug: '/heritage',
        status: 'DRAFT',
        updatedAt: '2024-12-02T11:30:00Z',
        isHomePage: false,
    },
];

const statusColors = {
    PUBLISHED: 'bg-green-100 text-green-800',
    DRAFT: 'bg-yellow-100 text-yellow-800',
    ARCHIVED: 'bg-gray-100 text-gray-800',
};

const statusIcons = {
    PUBLISHED: Globe,
    DRAFT: FileText,
    ARCHIVED: Archive,
};

export default function PagesListPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');

    const filteredPages = mockPages.filter((page) => {
        const matchesSearch = page.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'ALL' || page.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-serif text-gray-900">Pages</h1>
                        <p className="mt-2 text-gray-600">
                            Manage all pages on your website
                        </p>
                    </div>
                    <Link href="/admin/pages/new">
                        <button className="flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-white rounded-lg font-medium hover:bg-[#B8941F] transition-colors">
                            <Plus className="w-5 h-5" />
                            Create Page
                        </button>
                    </Link>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search pages..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                            />
                        </div>

                        {/* Status Filter */}
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                        >
                            <option value="ALL">All Status</option>
                            <option value="PUBLISHED">Published</option>
                            <option value="DRAFT">Draft</option>
                            <option value="ARCHIVED">Archived</option>
                        </select>
                    </div>
                </div>

                {/* Pages Table */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Page
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Slug
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Last Updated
                                    </th>
                                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredPages.map((page) => {
                                    const StatusIcon = statusIcons[page.status as keyof typeof statusIcons];
                                    return (
                                        <tr key={page.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <FileText className="w-5 h-5 text-gray-400" />
                                                    <div>
                                                        <p className="font-medium text-gray-900">{page.title}</p>
                                                        {page.isHomePage && (
                                                            <span className="text-xs text-[#D4AF37]">Homepage</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <code className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                                    {page.slug}
                                                </code>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusColors[page.status as keyof typeof statusColors]
                                                        }`}
                                                >
                                                    <StatusIcon className="w-3 h-3" />
                                                    {page.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {new Date(page.updatedAt).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric',
                                                })}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link href={page.slug} target="_blank">
                                                        <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                                                            <Eye className="w-4 h-4" />
                                                        </button>
                                                    </Link>
                                                    <Link href={`/admin/pages/${page.id}`}>
                                                        <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                    </Link>
                                                    <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                                                        <Copy className="w-4 h-4" />
                                                    </button>
                                                    <button className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {filteredPages.length === 0 && (
                        <div className="text-center py-12">
                            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600">No pages found</p>
                            <Link href="/admin/pages/new">
                                <button className="mt-4 text-[#D4AF37] hover:text-[#B8941F] font-medium">
                                    Create your first page
                                </button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Pagination (placeholder) */}
                {filteredPages.length > 0 && (
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600">
                            Showing {filteredPages.length} of {mockPages.length} pages
                        </p>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                Previous
                            </button>
                            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
