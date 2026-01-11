'use client';

import { useEffect } from 'react';
import { useSettings } from '@/contexts/SettingsContext';

export default function DynamicFavicon() {
    const { settings } = useSettings();

    useEffect(() => {
        if (!settings?.favicon) return;

        // Find or create favicon link
        let faviconLink = document.querySelector("link[rel='icon']") as HTMLLinkElement;
        if (!faviconLink) {
            faviconLink = document.createElement('link');
            faviconLink.rel = 'icon';
            faviconLink.type = 'image/png';
            document.head.appendChild(faviconLink);
        }
        faviconLink.href = settings.favicon;

        // Find or create apple-touch-icon
        let appleTouchIcon = document.querySelector("link[rel='apple-touch-icon']") as HTMLLinkElement;
        if (!appleTouchIcon) {
            appleTouchIcon = document.createElement('link');
            appleTouchIcon.rel = 'apple-touch-icon';
            document.head.appendChild(appleTouchIcon);
        }
        appleTouchIcon.href = settings.favicon;

    }, [settings?.favicon]);

    return null; // This component doesn't render anything
}
