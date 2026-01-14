'use client';

import { useSettings } from '@/contexts/SettingsContext';
import { useEffect } from 'react';

export default function DynamicSchema() {
    const { settings } = useSettings();

    useEffect(() => {
        if (!settings) return;

        // Create new schema with dynamic settings
        const brandSchema = {
            "@context": "https://schema.org",
            "@type": "JewelryStore",
            "name": settings.siteName || "ZEVARAZ",
            "description": settings.siteTagline || "Timeless, royal, handcrafted luxury jewellery in Jaipur.",
            "url": "https://zevaraz.com",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": settings.address || "Vidhyadhar Nagar",
                "addressLocality": "Jaipur",
                "addressRegion": "Rajasthan",
                "postalCode": "302039",
                "addressCountry": "IN"
            },
            "telephone": settings.contactPhone || "+91 1234567890",
            "email": settings.contactEmail || "contact@zevaraz.com",
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 26.9620,
                "longitude": 75.7760
            },
            "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday"
                ],
                "opens": "10:00",
                "closes": "19:30"
            },
            "priceRange": "₹25000 - ₹5000000"
        };

        // Find or create schema script
        let schemaScript = document.querySelector('script[data-schema="brand"]') as HTMLScriptElement;
        if (!schemaScript) {
            schemaScript = document.createElement('script');
            schemaScript.type = 'application/ld+json';
            schemaScript.setAttribute('data-schema', 'brand');
            document.head.appendChild(schemaScript);
        }

        // Update the content
        schemaScript.textContent = JSON.stringify(brandSchema);

    }, [settings]);

    return null; // This component doesn't render anything
}
