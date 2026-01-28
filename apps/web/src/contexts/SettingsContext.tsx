'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '@/lib/api';

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
    heroImage: string;
    heroImageMobile: string;
}

const defaultSettings: Settings = {
    siteName: 'SkinLuxe Aesthetics & Academy',
    siteTagline: 'LASER / SKIN / HAIR',
    logo: '/skinluxe-logo-dark.png',
    favicon: '/skinluxe-logo.png',
    contactEmail: 'skinluxemeerut@gmail.com',
    contactPhone: '7014681829',
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
    heroImage: '/hero-texture-wall.png',
    heroImageMobile: '/hero-texture-wall.png',
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
            // Use the centralized API client which points to the correct backend
            const response = await api.get('/settings');

            // Assuming the main API returns the settings object directly or wrapped
            if (response.data && response.data.success && response.data.data) {
                const apiSettings = response.data.data;

                // Map API fields to our Settings interface
                const mappedSettings: Settings = {
                    ...defaultSettings,
                    siteName: apiSettings.siteName || defaultSettings.siteName,
                    siteTagline: apiSettings.siteTagline || defaultSettings.siteTagline,
                    logo: apiSettings.logo || defaultSettings.logo,
                    contactEmail: apiSettings.contactEmail || defaultSettings.contactEmail,
                    contactPhone: apiSettings.contactPhone || defaultSettings.contactPhone,
                    address: apiSettings.address || defaultSettings.address,
                    // Parse socialMedia JSON if it exists
                    instagram: apiSettings.socialMedia?.instagram || defaultSettings.instagram,
                    facebook: apiSettings.socialMedia?.facebook || defaultSettings.facebook,
                    twitter: apiSettings.socialMedia?.twitter || defaultSettings.twitter,
                    youtube: apiSettings.socialMedia?.youtube || defaultSettings.youtube,
                    heroImage: apiSettings.heroImage || defaultSettings.heroImage,
                    heroImageMobile: apiSettings.heroImageMobile || defaultSettings.heroImageMobile,
                };

                setSettings(mappedSettings);
            }
        } catch (error) {
            console.error('Failed to fetch settings:', error);
            // Keep using default settings if fetch fails
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
