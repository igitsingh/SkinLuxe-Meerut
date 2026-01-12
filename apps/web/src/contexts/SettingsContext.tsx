'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Settings {
    siteName: string;
    siteTagline: string;
    logo: string;
    favicon: string;
    contactEmail: string;
    contactPhone: string;
    address: string;
    instagram: string;
    facebook: string;
    twitter: string;
    youtube: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    seoTitle: string;
    seoDescription: string;
    googleAnalyticsId: string;
    footerText: string;
    copyrightText: string;
    maintenanceMode: boolean;
    customCSS: string;
    customJS: string;
}

const defaultSettings: Settings = {
    siteName: 'SkinLuxe Aesthetics & Academy',
    siteTagline: 'LASER / SKIN / HAIR',
    logo: '/skinluxe-logo-dark.png',
    favicon: '/skinluxe-logo.png',
    contactEmail: 'skinluxemeerut@gmail.com',
    contactPhone: '9318452282 / 7451910272',
    address: 'FF, No. 38, New Market, Begum Bridge, near Titan Showroom, Sotiganj, Meerut',
    instagram: 'https://instagram.com/skinluxe_clinic_meerut',
    facebook: 'https://facebook.com/skinluxe',
    twitter: '',
    youtube: '',
    primaryColor: '#E91E63',
    secondaryColor: '#000000',
    accentColor: '#C2185B',
    seoTitle: 'SkinLuxe | Premier Aesthetics Clinic in Meerut',
    seoDescription: 'Advanced aesthetic treatments and professional training academy in Meerut',
    googleAnalyticsId: '',
    footerText: 'Your Journey to Radiant Skin',
    copyrightText: '© 2026 SkinLuxe Aesthetics & Academy. All rights reserved.',
    maintenanceMode: false,
    customCSS: '',
    customJS: '',
};

const SettingsContext = createContext<{
    settings: Settings;
    loading: boolean;
    refreshSettings: () => Promise<void>;
}>({
    settings: defaultSettings,
    loading: true,
    refreshSettings: async () => { },
});

export function SettingsProvider({ children }: { children: ReactNode }) {
    const [settings, setSettings] = useState<Settings>(defaultSettings);
    const [loading, setLoading] = useState(true);

    const fetchSettings = async () => {
        try {
            const response = await fetch('/api/settings', {
                cache: 'no-store',
                headers: {
                    'Cache-Control': 'no-cache',
                },
            });
            const data = await response.json();

            if (data.success && data.data) {
                setSettings(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch settings:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    const refreshSettings = async () => {
        await fetchSettings();
    };

    return (
        <SettingsContext.Provider value={{ settings, loading, refreshSettings }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
}
