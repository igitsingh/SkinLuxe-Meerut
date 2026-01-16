"use client";

import { useEffect, useState } from "react";
import { Settings as SettingsIcon, Save, Loader2 } from "lucide-react";
import api from "@/lib/api";
import LoadingSpinner from "@/lib/LoadingSpinner";

interface Settings {
    siteName: string;
    contactEmail: string;
    contactPhone: string;
    address: string;
}

export default function SettingsPage() {
    const [settings, setSettings] = useState<Settings>({
        siteName: "",
        contactEmail: "",
        contactPhone: "",
        address: ""
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await api.get("/admin/settings");
            if (res.data) setSettings(res.data);
        } catch (error) {
            console.error("Failed to fetch settings", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await api.put("/admin/settings", settings);
            alert("Settings saved successfully!");
        } catch (error) {
            console.error("Failed to save settings", error);
            alert("Failed to save settings");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <LoadingSpinner className="min-h-screen" />;

    return (
        <div>
            {/* Header */}
            <div className="mb-6 md:mb-8">
                <h1 className="text-2xl md:text-3xl font-serif text-dark mb-2">Settings</h1>
                <p className="text-sm md:text-base text-gray-600">Manage clinic settings and configuration</p>
            </div>

            {/* Content */}
            <div className="bg-white rounded-lg shadow-sm border border-secondary p-4 md:p-8">
                <div className="space-y-4 md:space-y-6">
                    <div>
                        <h3 className="text-base md:text-lg font-medium text-dark mb-3 md:mb-4">Clinic Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                            <div>
                                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                                    Clinic Name
                                </label>
                                <input
                                    type="text"
                                    value={settings.siteName}
                                    onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                                    className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-primary outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                                    Contact Email
                                </label>
                                <input
                                    type="email"
                                    value={settings.contactEmail}
                                    onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                                    className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-primary outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                                    Contact Phone
                                </label>
                                <input
                                    type="tel"
                                    value={settings.contactPhone}
                                    onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                                    className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-primary outline-none"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    value={settings.address || ''}
                                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                                    className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-primary outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-2 md:pt-4">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="bg-primary hover:bg-primary/90 text-white px-4 md:px-6 py-2 rounded-lg transition flex items-center gap-2 text-sm md:text-base"
                        >
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
