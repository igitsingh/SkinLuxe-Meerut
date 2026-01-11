'use client';

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import Link from 'next/link';
import {
    Save,
    ArrowLeft,
    Upload,
    X,
    Star,
    Eye,
    Image as ImageIcon,
} from 'lucide-react';
import Image from 'next/image';

export default function CollectionEditorPage() {
    const [collectionData, setCollectionData] = useState({
        name: '',
        slug: '',
        description: '',
        shortDescription: '',
        status: 'DRAFT',
        isFeatured: false,
        featuredImage: '',
        bannerImage: '',
        seoTitle: '',
        seoDescription: '',
    });

    const handleNameChange = (name: string) => {
        const slug = name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
        setCollectionData({ ...collectionData, name, slug });
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/collections">
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-serif text-gray-900">Create Collection</h1>
                            <p className="mt-1 text-gray-600">Add a new jewellery collection</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            <Eye className="w-4 h-4" />
                            Preview
                        </button>
                        <button className="flex items-center gap-2 px-6 py-2 bg-[#D4AF37] text-white rounded-lg font-medium hover:bg-[#B8941F] transition-colors">
                            <Save className="w-4 h-4" />
                            Save Collection
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Basic Information */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                Basic Information
                            </h2>
                            <div className="space-y-4">
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Collection Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={collectionData.name}
                                        onChange={(e) => handleNameChange(e.target.value)}
                                        placeholder="e.g., Bridal Collection"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                                    />
                                </div>

                                {/* Slug */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        URL Slug
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-500">/collections/</span>
                                        <input
                                            type="text"
                                            value={collectionData.slug}
                                            onChange={(e) =>
                                                setCollectionData({ ...collectionData, slug: e.target.value })
                                            }
                                            placeholder="bridal-collection"
                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                {/* Short Description */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Short Description
                                    </label>
                                    <input
                                        type="text"
                                        value={collectionData.shortDescription}
                                        onChange={(e) =>
                                            setCollectionData({
                                                ...collectionData,
                                                shortDescription: e.target.value,
                                            })
                                        }
                                        placeholder="Brief description for cards and previews"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                                    />
                                    <p className="mt-1 text-xs text-gray-500">
                                        Used in collection cards (max 100 characters)
                                    </p>
                                </div>

                                {/* Full Description */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Description
                                    </label>
                                    <textarea
                                        rows={6}
                                        value={collectionData.description}
                                        onChange={(e) =>
                                            setCollectionData({
                                                ...collectionData,
                                                description: e.target.value,
                                            })
                                        }
                                        placeholder="Detailed description of the collection..."
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Images */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Images</h2>
                            <div className="space-y-6">
                                {/* Featured Image */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Featured Image
                                    </label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#D4AF37] transition-colors cursor-pointer">
                                        {collectionData.featuredImage ? (
                                            <div className="relative aspect-video">
                                                <Image
                                                    src={collectionData.featuredImage}
                                                    alt="Featured"
                                                    fill
                                                    className="object-cover rounded-lg"
                                                />
                                                <button
                                                    onClick={() =>
                                                        setCollectionData({ ...collectionData, featuredImage: '' })
                                                    }
                                                    className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                                <p className="text-gray-900 font-medium mb-1">
                                                    Upload featured image
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    Recommended: 1200x800px (16:9 ratio)
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Banner Image */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Banner Image (Optional)
                                    </label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#D4AF37] transition-colors cursor-pointer">
                                        {collectionData.bannerImage ? (
                                            <div className="relative aspect-[21/9]">
                                                <Image
                                                    src={collectionData.bannerImage}
                                                    alt="Banner"
                                                    fill
                                                    className="object-cover rounded-lg"
                                                />
                                                <button
                                                    onClick={() =>
                                                        setCollectionData({ ...collectionData, bannerImage: '' })
                                                    }
                                                    className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                                <p className="text-gray-900 font-medium mb-1">
                                                    Upload banner image
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    Recommended: 2400x800px (wide format)
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SEO */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                SEO Settings
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        SEO Title
                                    </label>
                                    <input
                                        type="text"
                                        value={collectionData.seoTitle}
                                        onChange={(e) =>
                                            setCollectionData({ ...collectionData, seoTitle: e.target.value })
                                        }
                                        placeholder="Collection name | ZEVARAZ"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                                    />
                                    <p className="mt-1 text-xs text-gray-500">60 characters recommended</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        SEO Description
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={collectionData.seoDescription}
                                        onChange={(e) =>
                                            setCollectionData({
                                                ...collectionData,
                                                seoDescription: e.target.value,
                                            })
                                        }
                                        placeholder="Brief description for search engines..."
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                                    />
                                    <p className="mt-1 text-xs text-gray-500">160 characters recommended</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Publish Settings */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Publish Settings
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Status
                                    </label>
                                    <select
                                        value={collectionData.status}
                                        onChange={(e) =>
                                            setCollectionData({ ...collectionData, status: e.target.value })
                                        }
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                                    >
                                        <option value="DRAFT">Draft</option>
                                        <option value="PUBLISHED">Published</option>
                                        <option value="ARCHIVED">Archived</option>
                                    </select>
                                </div>

                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={collectionData.isFeatured}
                                        onChange={(e) =>
                                            setCollectionData({
                                                ...collectionData,
                                                isFeatured: e.target.checked,
                                            })
                                        }
                                        className="rounded border-gray-300 text-[#D4AF37] focus:ring-[#D4AF37]"
                                    />
                                    <div className="flex items-center gap-2">
                                        <Star className="w-4 h-4 text-yellow-600" />
                                        <span className="text-sm text-gray-700">Featured collection</span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Products */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Products</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Add products to this collection after saving
                            </p>
                            <Link href="/admin/products">
                                <button className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                                    Manage Products
                                </button>
                            </Link>
                        </div>

                        {/* Help */}
                        <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
                            <h3 className="text-sm font-semibold text-blue-900 mb-2">💡 Tips</h3>
                            <ul className="text-sm text-blue-800 space-y-2">
                                <li>• Use high-quality images</li>
                                <li>• Write compelling descriptions</li>
                                <li>• Optimize SEO for better ranking</li>
                                <li>• Feature your best collections</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
