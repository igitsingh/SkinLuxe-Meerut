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
    siteName: 'ZEVARAZ',
    siteTagline: 'Timeless Luxury Handcrafted Heritage',
    logo: '/MAIN ZEVARAZ LOGO.png',
    favicon: '/favicon.ico',
    contactEmail: 'contact@zevaraz.com',
    contactPhone: '+91 1234567890',
    address: 'Jaipur, Rajasthan, India',
    instagram: 'https://instagram.com/zevaraz',
    facebook: 'https://facebook.com/zevaraz',
    twitter: 'https://twitter.com/zevaraz',
    youtube: '',
    primaryColor: '#D4AF37',
    secondaryColor: '#1A1A1A',
    accentColor: '#E8D5C4',
    seoTitle: 'ZEVARAZ | Luxury Jewellery from Jaipur',
    seoDescription: 'Discover exquisite handcrafted jewellery from Jaipur',
    googleAnalyticsId: '',
    footerText: 'Handcrafted with love in Jaipur',
    copyrightText: '© 2024 ZEVARAZ. All rights reserved.',
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
