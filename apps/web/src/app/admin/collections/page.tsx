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
    Star,
    Package,
    Image as ImageIcon,
    Globe,
    FileText,
    Archive,
} from 'lucide-react';
import Image from 'next/image';

// Mock collections data
const mockCollections = [
    {
        id: '1',
        name: 'Bridal Collection',
        slug: 'bridal',
        description: 'Exquisite bridal jewellery for your special day',
        status: 'PUBLISHED',
        featuredImage: '/hero-bridal.jpg',
        productCount: 24,
        isFeatured: true,
        updatedAt: '2024-12-06T10:00:00Z',
    },
    {
        id: '2',
        name: 'Fine Jewellery',
        slug: 'fine-jewellery',
        description: 'Contemporary fine jewellery pieces',
        status: 'PUBLISHED',
        featuredImage: '/hero-fine.jpg',
        productCount: 18,
        isFeatured: true,
        updatedAt: '2024-12-05T14:30:00Z',
    },
    {
        id: '3',
        name: 'Heritage Collection',
        slug: 'heritage',
        description: 'Traditional Polki and Kundan jewellery',
        status: 'PUBLISHED',
        featuredImage: '/hero-heritage.jpg',
        productCount: 15,
        isFeatured: true,
        updatedAt: '2024-12-04T09:15:00Z',
    },
    {
        id: '4',
        name: 'Festive Collection',
        slug: 'festive',
        description: 'Special pieces for celebrations',
        status: 'DRAFT',
        featuredImage: null,
        productCount: 8,
        isFeatured: false,
        updatedAt: '2024-12-03T16:45:00Z',
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

export default function CollectionsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');

    const filteredCollections = mockCollections.filter((collection) => {
        const matchesSearch = collection.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'ALL' || collection.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-serif text-gray-900">Collections</h1>
                        <p className="mt-2 text-gray-600">
                            Organize your jewellery into collections
                        </p>
                    </div>
                    <Link href="/admin/collections/new">
                        <button className="flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-white rounded-lg font-medium hover:bg-[#B8941F] transition-colors">
                            <Plus className="w-5 h-5" />
                            Create Collection
                        </button>
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Collections</p>
                                <p className="text-2xl font-semibold text-gray-900 mt-1">
                                    {mockCollections.length}
                                </p>
                            </div>
                            <Package className="w-8 h-8 text-[#D4AF37]" />
                        </div>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Published</p>
                                <p className="text-2xl font-semibold text-gray-900 mt-1">
                                    {mockCollections.filter((c) => c.status === 'PUBLISHED').length}
                                </p>
                            </div>
                            <Globe className="w-8 h-8 text-green-600" />
                        </div>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Featured</p>
                                <p className="text-2xl font-semibold text-gray-900 mt-1">
                                    {mockCollections.filter((c) => c.isFeatured).length}
                                </p>
                            </div>
                            <Star className="w-8 h-8 text-yellow-600" />
                        </div>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Products</p>
                                <p className="text-2xl font-semibold text-gray-900 mt-1">
                                    {mockCollections.reduce((sum, c) => sum + c.productCount, 0)}
                                </p>
                            </div>
                            <Package className="w-8 h-8 text-blue-600" />
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
                                placeholder="Search collections..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                            />
                        </div>
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

                {/* Collections Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCollections.map((collection) => {
                        const StatusIcon = statusIcons[collection.status as keyof typeof statusIcons];
                        return (
                            <div
                                key={collection.id}
                                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group"
                            >
                                {/* Image */}
                                <div className="relative aspect-[16/9] bg-gray-100">
                                    {collection.featuredImage ? (
                                        <Image
                                            src={collection.featuredImage}
                                            alt={collection.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <ImageIcon className="w-16 h-16 text-gray-300" />
                                        </div>
                                    )}

                                    {/* Featured Badge */}
                                    {collection.isFeatured && (
                                        <div className="absolute top-3 left-3">
                                            <span className="flex items-center gap-1 px-3 py-1 bg-yellow-500 text-white rounded-full text-xs font-medium">
                                                <Star className="w-3 h-3" />
                                                Featured
                                            </span>
                                        </div>
                                    )}

                                    {/* Status Badge */}
                                    <div className="absolute top-3 right-3">
                                        <span
                                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusColors[collection.status as keyof typeof statusColors]
                                                }`}
                                        >
                                            <StatusIcon className="w-3 h-3" />
                                            {collection.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-serif text-gray-900 mb-2">
                                        {collection.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                        {collection.description}
                                    </p>

                                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                        <span>{collection.productCount} products</span>
                                        <span>
                                            {new Date(collection.updatedAt).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                        </span>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2">
                                        <Link href={`/collections/${collection.slug}`} target="_blank" className="flex-1">
                                            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                                                <Eye className="w-4 h-4" />
                                                View
                                            </button>
                                        </Link>
                                        <Link href={`/admin/collections/${collection.id}`} className="flex-1">
                                            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#D4AF37] text-white rounded-lg hover:bg-[#B8941F] transition-colors text-sm font-medium">
                                                <Edit className="w-4 h-4" />
                                                Edit
                                            </button>
                                        </Link>
                                        <button className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {filteredCollections.length === 0 && (
                    <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                        <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-4">No collections found</p>
                        <Link href="/admin/collections/new">
                            <button className="text-[#D4AF37] hover:text-[#B8941F] font-medium">
                                Create your first collection
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
