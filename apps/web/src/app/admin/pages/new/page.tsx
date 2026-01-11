'use client';

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import Link from 'next/link';
import {
    Save,
    Eye,
    ArrowLeft,
    Plus,
    Settings,
    Trash2,
    GripVertical,
    Image as ImageIcon,
    Type,
    Layout,
    Video,
    Mail,
    Star,
    Grid3x3,
    Code,
} from 'lucide-react';

// Section type options
const sectionTypes = [
    { type: 'HERO', label: 'Hero Banner', icon: ImageIcon, description: 'Full-width hero with image and text' },
    { type: 'TEXT', label: 'Text Content', icon: Type, description: 'Rich text editor for content' },
    { type: 'IMAGE_TEXT', label: 'Image + Text', icon: Layout, description: 'Image with text side by side' },
    { type: 'GALLERY', label: 'Image Gallery', icon: Grid3x3, description: 'Grid of images' },
    { type: 'COLLECTION_GRID', label: 'Collections', icon: Grid3x3, description: 'Display collections' },
    { type: 'PRODUCT_GRID', label: 'Products', icon: Grid3x3, description: 'Display products' },
    { type: 'TESTIMONIALS', label: 'Testimonials', icon: Star, description: 'Customer reviews' },
    { type: 'CONTACT_FORM', label: 'Contact Form', icon: Mail, description: 'Contact form' },
    { type: 'VIDEO', label: 'Video', icon: Video, description: 'Embedded video' },
    { type: 'CUSTOM_HTML', label: 'Custom HTML', icon: Code, description: 'Custom code' },
];

export default function PageEditorPage() {
    const [pageData, setPageData] = useState({
        title: '',
        slug: '',
        status: 'DRAFT',
        isHomePage: false,
    });

    const [sections, setSections] = useState<any[]>([]);
    const [showSectionPicker, setShowSectionPicker] = useState(false);
    const [editingSection, setEditingSection] = useState<number | null>(null);

    const handleTitleChange = (title: string) => {
        const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
        setPageData({ ...pageData, title, slug: `/${slug}` });
    };

    const addSection = (type: string) => {
        const newSection = {
            id: Date.now(),
            type,
            title: '',
            subtitle: '',
            content: {},
            order: sections.length,
            isVisible: true,
        };
        setSections([...sections, newSection]);
        setShowSectionPicker(false);
        setEditingSection(sections.length);
    };

    const removeSection = (index: number) => {
        setSections(sections.filter((_, i) => i !== index));
    };

    const moveSection = (index: number, direction: 'up' | 'down') => {
        const newSections = [...sections];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= sections.length) return;
        [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
        setSections(newSections);
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/pages">
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-serif text-gray-900">Create New Page</h1>
                            <p className="mt-1 text-gray-600">Build your page with sections</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            <Eye className="w-4 h-4" />
                            Preview
                        </button>
                        <button className="flex items-center gap-2 px-6 py-2 bg-[#D4AF37] text-white rounded-lg font-medium hover:bg-[#B8941F] transition-colors">
                            <Save className="w-4 h-4" />
                            Save Page
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Editor */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Page Settings */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Page Settings</h2>
                            <div className="space-y-4">
                                {/* Title */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Page Title *
                                    </label>
                                    <input
                                        type="text"
                                        value={pageData.title}
                                        onChange={(e) => handleTitleChange(e.target.value)}
                                        placeholder="e.g., About Us"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                                    />
                                </div>

                                {/* Slug */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        URL Slug
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-500">zevaraz.com</span>
                                        <input
                                            type="text"
                                            value={pageData.slug}
                                            onChange={(e) => setPageData({ ...pageData, slug: e.target.value })}
                                            placeholder="/about"
                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                {/* Status */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Status
                                    </label>
                                    <select
                                        value={pageData.status}
                                        onChange={(e) => setPageData({ ...pageData, status: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                                    >
                                        <option value="DRAFT">Draft</option>
                                        <option value="PUBLISHED">Published</option>
                                        <option value="ARCHIVED">Archived</option>
                                    </select>
                                </div>

                                {/* Homepage Toggle */}
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={pageData.isHomePage}
                                        onChange={(e) => setPageData({ ...pageData, isHomePage: e.target.checked })}
                                        className="rounded border-gray-300 text-[#D4AF37] focus:ring-[#D4AF37]"
                                    />
                                    <span className="text-sm text-gray-700">Set as homepage</span>
                                </label>
                            </div>
                        </div>

                        {/* Sections */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold text-gray-900">Page Sections</h2>
                                <button
                                    onClick={() => setShowSectionPicker(true)}
                                    className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-white rounded-lg text-sm font-medium hover:bg-[#B8941F] transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Section
                                </button>
                            </div>

                            {/* Sections List */}
                            <div className="space-y-3">
                                {sections.length === 0 ? (
                                    <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                                        <Layout className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                        <p className="text-gray-600 mb-4">No sections added yet</p>
                                        <button
                                            onClick={() => setShowSectionPicker(true)}
                                            className="text-[#D4AF37] hover:text-[#B8941F] font-medium"
                                        >
                                            Add your first section
                                        </button>
                                    </div>
                                ) : (
                                    sections.map((section, index) => {
                                        const sectionType = sectionTypes.find((t) => t.type === section.type);
                                        const Icon = sectionType?.icon || Layout;
                                        return (
                                            <div
                                                key={section.id}
                                                className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-[#D4AF37] transition-colors"
                                            >
                                                <button className="cursor-move text-gray-400 hover:text-gray-600">
                                                    <GripVertical className="w-5 h-5" />
                                                </button>
                                                <Icon className="w-5 h-5 text-[#D4AF37]" />
                                                <div className="flex-1">
                                                    <p className="font-medium text-gray-900">
                                                        {sectionType?.label || section.type}
                                                    </p>
                                                    <p className="text-sm text-gray-500">{section.title || 'Untitled section'}</p>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <button
                                                        onClick={() => moveSection(index, 'up')}
                                                        disabled={index === 0}
                                                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                                                    >
                                                        ↑
                                                    </button>
                                                    <button
                                                        onClick={() => moveSection(index, 'down')}
                                                        disabled={index === sections.length - 1}
                                                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                                                    >
                                                        ↓
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingSection(index)}
                                                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
                                                    >
                                                        <Settings className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => removeSection(index)}
                                                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* SEO Settings */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Settings</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Meta Title
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Page title for search engines"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                                    />
                                    <p className="mt-1 text-xs text-gray-500">60 characters recommended</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Meta Description
                                    </label>
                                    <textarea
                                        rows={3}
                                        placeholder="Brief description for search results"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                                    />
                                    <p className="mt-1 text-xs text-gray-500">160 characters recommended</p>
                                </div>
                            </div>
                        </div>

                        {/* Help */}
                        <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
                            <h3 className="text-sm font-semibold text-blue-900 mb-2">💡 Quick Tips</h3>
                            <ul className="text-sm text-blue-800 space-y-2">
                                <li>• Add sections to build your page</li>
                                <li>• Drag to reorder sections</li>
                                <li>• Preview before publishing</li>
                                <li>• Optimize SEO for better ranking</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section Picker Modal */}
            {showSectionPicker && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-serif text-gray-900">Choose Section Type</h2>
                                <button
                                    onClick={() => setShowSectionPicker(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {sectionTypes.map((sectionType) => (
                                <button
                                    key={sectionType.type}
                                    onClick={() => addSection(sectionType.type)}
                                    className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:border-[#D4AF37] hover:bg-[#FDFBF7] transition-all text-left group"
                                >
                                    <div className="p-3 bg-[#F4E4C1] rounded-lg group-hover:bg-[#D4AF37] transition-colors">
                                        <sectionType.icon className="w-6 h-6 text-[#D4AF37] group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">{sectionType.label}</h3>
                                        <p className="text-sm text-gray-600">{sectionType.description}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
