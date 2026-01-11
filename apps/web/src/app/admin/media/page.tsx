'use client';

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import {
    Upload,
    Search,
    Grid3x3,
    List,
    Trash2,
    Download,
    Eye,
    FolderPlus,
    Filter,
    Image as ImageIcon,
    File,
    Video,
    X,
} from 'lucide-react';
import Image from 'next/image';

// Mock media data
const mockMedia = [
    {
        id: '1',
        filename: 'hero-main.jpg',
        url: '/hero-main.jpg',
        type: 'IMAGE',
        size: 245000,
        width: 2400,
        height: 800,
        alt: 'Main hero banner',
        createdAt: '2024-12-06T10:00:00Z',
    },
    {
        id: '2',
        filename: 'hero-bridal.jpg',
        url: '/hero-bridal.jpg',
        type: 'IMAGE',
        size: 312000,
        width: 2400,
        height: 800,
        alt: 'Bridal collection banner',
        createdAt: '2024-12-06T09:30:00Z',
    },
    {
        id: '3',
        filename: 'hero-fine.jpg',
        url: '/hero-fine.jpg',
        type: 'IMAGE',
        size: 198000,
        width: 2400,
        height: 800,
        alt: 'Fine jewellery banner',
        createdAt: '2024-12-06T09:00:00Z',
    },
    {
        id: '4',
        filename: 'hero-heritage.jpg',
        url: '/hero-heritage.jpg',
        type: 'IMAGE',
        size: 278000,
        width: 2400,
        height: 800,
        alt: 'Heritage collection banner',
        createdAt: '2024-12-06T08:30:00Z',
    },
    {
        id: '5',
        filename: 'craftsmanship.jpg',
        url: '/craftsmanship.jpg',
        type: 'IMAGE',
        size: 156000,
        width: 1200,
        height: 1200,
        alt: 'Craftsmanship',
        createdAt: '2024-12-06T08:00:00Z',
    },
];

export default function MediaLibraryPage() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMedia, setSelectedMedia] = useState<string[]>([]);
    const [showUpload, setShowUpload] = useState(false);
    const [previewMedia, setPreviewMedia] = useState<any>(null);

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    const filteredMedia = mockMedia.filter((media) =>
        media.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
        media.alt?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleSelect = (id: string) => {
        setSelectedMedia((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-serif text-gray-900">Media Library</h1>
                        <p className="mt-2 text-gray-600">
                            Manage images, videos, and files
                        </p>
                    </div>
                    <button
                        onClick={() => setShowUpload(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-white rounded-lg font-medium hover:bg-[#B8941F] transition-colors"
                    >
                        <Upload className="w-5 h-5" />
                        Upload Files
                    </button>
                </div>

                {/* Toolbar */}
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        {/* Search */}
                        <div className="flex-1 w-full md:w-auto relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search media..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                            {selectedMedia.length > 0 && (
                                <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg">
                                    <span className="text-sm text-blue-900 font-medium">
                                        {selectedMedia.length} selected
                                    </span>
                                    <button className="p-1 text-red-600 hover:text-red-700">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            )}

                            <div className="flex items-center gap-1 border border-gray-300 rounded-lg p-1">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded ${viewMode === 'grid'
                                            ? 'bg-[#D4AF37] text-white'
                                            : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    <Grid3x3 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded ${viewMode === 'list'
                                            ? 'bg-[#D4AF37] text-white'
                                            : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Media Grid/List */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    {viewMode === 'grid' ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {filteredMedia.map((media) => (
                                <div
                                    key={media.id}
                                    className={`group relative aspect-square rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${selectedMedia.includes(media.id)
                                            ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/20'
                                            : 'border-gray-200 hover:border-[#D4AF37]'
                                        }`}
                                    onClick={() => toggleSelect(media.id)}
                                >
                                    {/* Image */}
                                    <div className="relative w-full h-full bg-gray-100">
                                        <Image
                                            src={media.url}
                                            alt={media.alt || media.filename}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="absolute bottom-0 left-0 right-0 p-3">
                                            <p className="text-white text-xs font-medium truncate">
                                                {media.filename}
                                            </p>
                                            <p className="text-white/80 text-xs">
                                                {formatFileSize(media.size)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setPreviewMedia(media);
                                            }}
                                            className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50"
                                        >
                                            <Eye className="w-4 h-4 text-gray-700" />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                            className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50"
                                        >
                                            <Download className="w-4 h-4 text-gray-700" />
                                        </button>
                                    </div>

                                    {/* Checkbox */}
                                    <div className="absolute top-2 left-2">
                                        <input
                                            type="checkbox"
                                            checked={selectedMedia.includes(media.id)}
                                            onChange={() => toggleSelect(media.id)}
                                            onClick={(e) => e.stopPropagation()}
                                            className="w-5 h-5 rounded border-2 border-white text-[#D4AF37] focus:ring-[#D4AF37] shadow-lg"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {filteredMedia.map((media) => (
                                <div
                                    key={media.id}
                                    className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${selectedMedia.includes(media.id)
                                            ? 'border-[#D4AF37] bg-[#FDFBF7]'
                                            : 'border-gray-200 hover:border-[#D4AF37]'
                                        }`}
                                    onClick={() => toggleSelect(media.id)}
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedMedia.includes(media.id)}
                                        onChange={() => toggleSelect(media.id)}
                                        onClick={(e) => e.stopPropagation()}
                                        className="w-5 h-5 rounded border-gray-300 text-[#D4AF37] focus:ring-[#D4AF37]"
                                    />
                                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                        <Image
                                            src={media.url}
                                            alt={media.alt || media.filename}
                                            width={64}
                                            height={64}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-gray-900 truncate">{media.filename}</p>
                                        <p className="text-sm text-gray-600">
                                            {media.width} × {media.height} • {formatFileSize(media.size)}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setPreviewMedia(media);
                                            }}
                                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={(e) => e.stopPropagation()}
                                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                                        >
                                            <Download className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={(e) => e.stopPropagation()}
                                            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {filteredMedia.length === 0 && (
                        <div className="text-center py-12">
                            <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600 mb-4">No media files found</p>
                            <button
                                onClick={() => setShowUpload(true)}
                                className="text-[#D4AF37] hover:text-[#B8941F] font-medium"
                            >
                                Upload your first file
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Upload Modal */}
            {showUpload && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-2xl font-serif text-gray-900">Upload Files</h2>
                            <button
                                onClick={() => setShowUpload(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-[#D4AF37] transition-colors cursor-pointer">
                                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-900 font-medium mb-2">
                                    Drop files here or click to browse
                                </p>
                                <p className="text-sm text-gray-600">
                                    Supports: JPG, PNG, GIF, WebP, MP4 (Max 10MB)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Preview Modal */}
            {previewMedia && (
                <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
                    <div className="max-w-6xl w-full">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-white text-xl font-semibold">{previewMedia.filename}</h2>
                            <button
                                onClick={() => setPreviewMedia(null)}
                                className="text-white hover:text-gray-300"
                            >
                                <X className="w-8 h-8" />
                            </button>
                        </div>
                        <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                            <Image
                                src={previewMedia.url}
                                alt={previewMedia.alt || previewMedia.filename}
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                    <p className="text-white/60">Dimensions</p>
                                    <p className="font-medium">{previewMedia.width} × {previewMedia.height}</p>
                                </div>
                                <div>
                                    <p className="text-white/60">Size</p>
                                    <p className="font-medium">{formatFileSize(previewMedia.size)}</p>
                                </div>
                                <div>
                                    <p className="text-white/60">Type</p>
                                    <p className="font-medium">{previewMedia.type}</p>
                                </div>
                                <div>
                                    <p className="text-white/60">Uploaded</p>
                                    <p className="font-medium">
                                        {new Date(previewMedia.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
