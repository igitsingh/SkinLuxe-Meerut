'use client';

import { useSettings } from '@/contexts/SettingsContext';
import { useEffect } from 'react';

export default function DynamicColors() {
    const { settings } = useSettings();

    useEffect(() => {
        if (!settings) return;

        // Apply CSS variables to the root element
        const root = document.documentElement;

        if (settings.primaryColor) {
            root.style.setProperty('--color-primary', settings.primaryColor);
        }

        if (settings.secondaryColor) {
            root.style.setProperty('--color-secondary', settings.secondaryColor);
        }

        if (settings.accentColor) {
            root.style.setProperty('--color-accent', settings.accentColor);
        }

    }, [settings]);

    return null; // This component doesn't render anything
}
