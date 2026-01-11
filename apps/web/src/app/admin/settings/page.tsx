'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import {
    Save,
    Upload,
    Globe,
    Mail,
    Phone,
    MapPin,
    Facebook,
    Instagram,
    Twitter,
    Youtube,
    Palette,
    Code,
    Settings as SettingsIcon,
    CheckCircle,
    AlertCircle,
    Trash2,
} from 'lucide-react';
import Image from 'next/image';
import { useSettings } from '@/contexts/SettingsContext';

export default function SettingsPage() {
    const { settings: contextSettings, refreshSettings } = useSettings();

    const [settings, setSettings] = useState({
        // General
        siteName: 'SkinLuxe Aesthetics & Academy',
        siteTagline: 'Your Journey to Radiant Skin',
        logo: '/skinluxe-logo-dark.png',
        favicon: '/favicon.ico',

        // Contact
        contactEmail: 'info@skinluxe-meerut.com',
        contactPhone: '+91 121 XXX XXXX',
        address: 'Meerut, Uttar Pradesh, India',

        // Social Media
        instagram: 'https://instagram.com/skinluxe_clinic_meerut',
        facebook: 'https://facebook.com/skinluxe',
        twitter: 'https://twitter.com/skinluxe',
        youtube: '',

        // Colors
        primaryColor: '#E91E63',
        secondaryColor: '#000000',
        accentColor: '#C2185B',

        // SEO
        seoTitle: 'SkinLuxe | Premier Aesthetics Clinic in Meerut',
        seoDescription: 'Advanced aesthetic treatments and professional training academy in Meerut',
        googleAnalyticsId: '',

        // Footer
        footerText: 'Your Journey to Radiant Skin',
        copyrightText: '© 2024 SkinLuxe Aesthetics & Academy. All rights reserved.',

        // Advanced
        maintenanceMode: false,
        customCSS: '',
        customJS: '',
    });

    const [activeTab, setActiveTab] = useState('general');
    const [saving, setSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [uploading, setUploading] = useState(false);

    // Load settings from API on mount
    useEffect(() => {
        const loadSettings = async () => {
            try {
                const response = await fetch('/api/settings');
                const data = await response.json();
                if (data.success && data.data) {
                    setSettings(data.data);
                }
            } catch (error) {
                console.error('Failed to load settings:', error);
            }
        };
        loadSettings();
    }, []);

    // Handle file upload (logo/favicon)
    const handleFileUpload = async (file: File, type: 'logo' | 'favicon') => {
        if (!file) return;

        // Validate file type
        const validTypes = type === 'favicon'
            ? ['image/x-icon', 'image/png', 'image/jpeg']
            : ['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp'];

        if (!validTypes.includes(file.type)) {
            setSaveMessage({
                type: 'error',
                text: `Invalid file type. Please upload ${type === 'favicon' ? 'ICO, PNG, or JPG' : 'PNG, JPG, SVG, or WebP'} file.`
            });
            setTimeout(() => setSaveMessage(null), 3000);
            return;
        }

        // Validate file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            setSaveMessage({ type: 'error', text: 'File size must be less than 2MB' });
            setTimeout(() => setSaveMessage(null), 3000);
            return;
        }

        setUploading(true);

        try {
            // Convert to base64
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                setSettings({ ...settings, [type]: result });
                setSaveMessage({ type: 'success', text: `${type === 'logo' ? 'Logo' : 'Favicon'} uploaded! Click "Save Changes" to apply.` });
                setTimeout(() => setSaveMessage(null), 3000);
                setUploading(false);
            };
            reader.onerror = () => {
                setSaveMessage({ type: 'error', text: 'Failed to read file' });
                setTimeout(() => setSaveMessage(null), 3000);
                setUploading(false);
            };
            reader.readAsDataURL(file);
        } catch (error) {
            setSaveMessage({ type: 'error', text: 'Failed to upload file' });
            setTimeout(() => setSaveMessage(null), 3000);
            setUploading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setSaveMessage(null);

        try {
            const response = await fetch('/api/settings', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(settings),
            });

            const data = await response.json();

            if (data.success) {
                setSaveMessage({ type: 'success', text: 'Settings saved successfully!' });
                // Refresh settings in context so changes appear immediately
                await refreshSettings();
                setTimeout(() => setSaveMessage(null), 3000);
            } else {
                setSaveMessage({ type: 'error', text: data.error || 'Failed to save settings' });
            }
        } catch (error) {
            setSaveMessage({ type: 'error', text: 'An error occurred while saving' });
        } finally {
            setSaving(false);
        }
    };

    const tabs = [
        { id: 'general', label: 'General', icon: SettingsIcon },
        { id: 'contact', label: 'Contact', icon: Mail },
        { id: 'social', label: 'Social Media', icon: Globe },
        { id: 'appearance', label: 'Appearance', icon: Palette },
        { id: 'seo', label: 'SEO', icon: Globe },
        { id: 'advanced', label: 'Advanced', icon: Code },
    ];

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-serif text-gray-900">Settings</h1>
                        <p className="mt-2 text-gray-600">
                            Configure your website settings
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        {saveMessage && (
                            <div
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${saveMessage.type === 'success'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                    }`}
                            >
                                {saveMessage.type === 'success' ? (
                                    <CheckCircle className="w-5 h-5" />
                                ) : (
                                    <AlertCircle className="w-5 h-5" />
                                )}
                                <span className="text-sm font-medium">{saveMessage.text}</span>
                            </div>
                        )}
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="flex items-center gap-2 px-6 py-3 bg-[#E91E63] text-white rounded-lg font-medium hover:bg-[#C2185B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Save className="w-5 h-5" />
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Tabs Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg border border-gray-200 p-2">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.id
                                        ? 'bg-[#E91E63] text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    <tab.icon className="w-5 h-5" />
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            {/* General Tab */}
                            {activeTab === 'general' && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                            General Settings
                                        </h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Site Name
                                            </label>
                                            <input
                                                type="text"
                                                value={settings.siteName}
                                                onChange={(e) =>
                                                    setSettings({ ...settings, siteName: e.target.value })
                                                }
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E91E63] focus:border-transparent"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Site Tagline
                                            </label>
                                            <input
                                                type="text"
                                                value={settings.siteTagline}
                                                onChange={(e) =>
                                                    setSettings({ ...settings, siteTagline: e.target.value })
                                                }
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E91E63] focus:border-transparent"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Logo
                                        </label>
                                        <div className="flex items-center gap-4">
                                            <div className="w-32 h-16 border border-gray-300 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                                                {settings.logo ? (
                                                    <Image
                                                        src={settings.logo}
                                                        alt="Logo"
                                                        width={128}
                                                        height={64}
                                                        className="object-contain"
                                                    />
                                                ) : (
                                                    <Upload className="w-8 h-8 text-gray-400" />
                                                )}
                                            </div>
                                            <div className="flex gap-2">
                                                <input
                                                    type="file"
                                                    id="logo-upload"
                                                    accept="image/png,image/jpeg,image/svg+xml,image/webp"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) handleFileUpload(file, 'logo');
                                                    }}
                                                    className="hidden"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => document.getElementById('logo-upload')?.click()}
                                                    disabled={uploading}
                                                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {uploading ? 'Uploading...' : 'Change Logo'}
                                                </button>
                                                {settings.logo && settings.logo !== '/skinluxe-logo-dark.png' && (
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setSettings({ ...settings, logo: '/skinluxe-logo-dark.png' });
                                                            setSaveMessage({ type: 'success', text: 'Logo removed! Click "Save Changes" to apply.' });
                                                            setTimeout(() => setSaveMessage(null), 3000);
                                                        }}
                                                        className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                        Remove
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Favicon
                                        </label>
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 border border-gray-300 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                                                {settings.favicon && settings.favicon !== '/favicon.ico' ? (
                                                    <Image
                                                        src={settings.favicon}
                                                        alt="Favicon"
                                                        width={32}
                                                        height={32}
                                                        className="object-contain"
                                                    />
                                                ) : (
                                                    <Upload className="w-6 h-6 text-gray-400" />
                                                )}
                                            </div>
                                            <div className="flex gap-2">
                                                <input
                                                    type="file"
                                                    id="favicon-upload"
                                                    accept="image/x-icon,image/png,image/jpeg"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) handleFileUpload(file, 'favicon');
                                                    }}
                                                    className="hidden"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => document.getElementById('favicon-upload')?.click()}
                                                    disabled={uploading}
                                                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {uploading ? 'Uploading...' : 'Upload Favicon'}
                                                </button>
                                                {settings.favicon && settings.favicon !== '/favicon.ico' && (
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setSettings({ ...settings, favicon: '/favicon.ico' });
                                                            setSaveMessage({ type: 'success', text: 'Favicon removed! Click "Save Changes" to apply.' });
                                                            setTimeout(() => setSaveMessage(null), 3000);
                                                        }}
                                                        className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                        Remove
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        <p className="mt-2 text-xs text-gray-500">
                                            Recommended: 32x32px or 64x64px, ICO or PNG format
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Contact Tab */}
                            {activeTab === 'contact' && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                            Contact Information
                                        </h2>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <Mail className="w-4 h-4 inline mr-2" />
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            value={settings.contactEmail}
                                            onChange={(e) =>
                                                setSettings({ ...settings, contactEmail: e.target.value })
                                            }
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E91E63] focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <Phone className="w-4 h-4 inline mr-2" />
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            value={settings.contactPhone}
                                            onChange={(e) =>
                                                setSettings({ ...settings, contactPhone: e.target.value })
                                            }
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E91E63] focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <MapPin className="w-4 h-4 inline mr-2" />
                                            Address
                                        </label>
                                        <textarea
                                            rows={3}
                                            value={settings.address}
                                            onChange={(e) =>
                                                setSettings({ ...settings, address: e.target.value })
                                            }
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E91E63] focus:border-transparent"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Social Media Tab */}
                            {activeTab === 'social' && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                            Social Media Links
                                        </h2>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <Instagram className="w-4 h-4 inline mr-2" />
                                            Instagram
                                        </label>
                                        <input
                                            type="url"
                                            value={settings.instagram}
                                            onChange={(e) =>
                                                setSettings({ ...settings, instagram: e.target.value })
                                            }
                                            placeholder="https://instagram.com/skinluxe_clinic_meerut"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E91E63] focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <Facebook className="w-4 h-4 inline mr-2" />
                                            Facebook
                                        </label>
                                        <input
                                            type="url"
                                            value={settings.facebook}
                                            onChange={(e) =>
                                                setSettings({ ...settings, facebook: e.target.value })
                                            }
                                            placeholder="https://facebook.com/skinluxe"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E91E63] focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <Twitter className="w-4 h-4 inline mr-2" />
                                            Twitter
                                        </label>
                                        <input
                                            type="url"
                                            value={settings.twitter}
                                            onChange={(e) =>
                                                setSettings({ ...settings, twitter: e.target.value })
                                            }
                                            placeholder="https://twitter.com/skinluxe"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E91E63] focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <Youtube className="w-4 h-4 inline mr-2" />
                                            YouTube
                                        </label>
                                        <input
                                            type="url"
                                            value={settings.youtube}
                                            onChange={(e) =>
                                                setSettings({ ...settings, youtube: e.target.value })
                                            }
                                            placeholder="https://youtube.com/@skinluxe"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E91E63] focus:border-transparent"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Appearance Tab */}
                            {activeTab === 'appearance' && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                            Brand Colors
                                        </h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Primary Color
                                            </label>
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="color"
                                                    value={settings.primaryColor}
                                                    onChange={(e) =>
                                                        setSettings({ ...settings, primaryColor: e.target.value })
                                                    }
                                                    className="w-16 h-10 rounded border border-gray-300 cursor-pointer"
                                                />
                                                <input
                                                    type="text"
                                                    value={settings.primaryColor}
                                                    onChange={(e) =>
                                                        setSettings({ ...settings, primaryColor: e.target.value })
                                                    }
                                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E91E63] focus:border-transparent"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Secondary Color
                                            </label>
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="color"
                                                    value={settings.secondaryColor}
                                                    onChange={(e) =>
                                                        setSettings({ ...settings, secondaryColor: e.target.value })
                                                    }
                                                    className="w-16 h-10 rounded border border-gray-300 cursor-pointer"
                                                />
                                                <input
                                                    type="text"
                                                    value={settings.secondaryColor}
                                                    onChange={(e) =>
                                                        setSettings({ ...settings, secondaryColor: e.target.value })
                                                    }
                                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E91E63] focus:border-transparent"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Accent Color
                                            </label>
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="color"
                                                    value={settings.accentColor}
                                                    onChange={(e) =>
                                                        setSettings({ ...settings, accentColor: e.target.value })
                                                    }
                                                    className="w-16 h-10 rounded border border-gray-300 cursor-pointer"
                                                />
                                                <input
                                                    type="text"
                                                    value={settings.accentColor}
                                                    onChange={(e) =>
                                                        setSettings({ ...settings, accentColor: e.target.value })
                                                    }
                                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E91E63] focus:border-transparent"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                        <p className="text-sm text-blue-900">
                                            💡 Color changes will be applied across the entire website
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* SEO Tab */}
                            {activeTab === 'seo' && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                            SEO & Analytics
                                        </h2>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Default SEO Title
                                        </label>
                                        <input
                                            type="text"
                                            value={settings.seoTitle}
                                            onChange={(e) =>
                                                setSettings({ ...settings, seoTitle: e.target.value })
                                            }
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E91E63] focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Default SEO Description
                                        </label>
                                        <textarea
                                            rows={3}
                                            value={settings.seoDescription}
                                            onChange={(e) =>
                                                setSettings({ ...settings, seoDescription: e.target.value })
                                            }
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E91E63] focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Google Analytics ID
                                        </label>
                                        <input
                                            type="text"
                                            value={settings.googleAnalyticsId}
                                            onChange={(e) =>
                                                setSettings({ ...settings, googleAnalyticsId: e.target.value })
                                            }
                                            placeholder="G-XXXXXXXXXX"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E91E63] focus:border-transparent"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Advanced Tab */}
                            {activeTab === 'advanced' && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                            Advanced Settings
                                        </h2>
                                    </div>

                                    {settings.maintenanceMode && (
                                        <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg mb-4">
                                            <div className="flex items-start gap-3">
                                                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="font-semibold text-red-900 mb-1">
                                                        🚫 Maintenance Mode is ACTIVE
                                                    </p>
                                                    <p className="text-sm text-red-800">
                                                        Your website is currently showing a maintenance page to all visitors.
                                                        Only the admin panel is accessible. Click "Save Changes" to apply.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${settings.maintenanceMode
                                            ? 'border-red-300 bg-red-50 hover:bg-red-100'
                                            : 'border-gray-300 hover:bg-gray-50'
                                        }`}>
                                        <input
                                            type="checkbox"
                                            checked={settings.maintenanceMode}
                                            onChange={(e) =>
                                                setSettings({ ...settings, maintenanceMode: e.target.checked })
                                            }
                                            className="rounded border-gray-300 text-[#E91E63] focus:ring-[#E91E63] w-5 h-5"
                                        />
                                        <div className="flex-1">
                                            <p className={`font-medium ${settings.maintenanceMode ? 'text-red-900' : 'text-gray-900'}`}>
                                                Maintenance Mode
                                            </p>
                                            <p className="text-sm text-gray-600 mt-1">
                                                When enabled, all public pages will show a maintenance screen.
                                                Admin panel and API routes remain accessible.
                                            </p>
                                            {settings.maintenanceMode && (
                                                <div className="mt-2 text-xs text-red-700 font-medium">
                                                    ⚠️ Remember to click "Save Changes" to activate!
                                                </div>
                                            )}
                                        </div>
                                    </label>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Custom CSS
                                        </label>
                                        <textarea
                                            rows={6}
                                            value={settings.customCSS}
                                            onChange={(e) =>
                                                setSettings({ ...settings, customCSS: e.target.value })
                                            }
                                            placeholder="/* Add your custom CSS here */"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-[#E91E63] focus:border-transparent"
                                        />
                                    </div>

                                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                                        <p className="text-sm text-yellow-900">
                                            ⚠️ Advanced settings can affect your website. Use with caution.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
