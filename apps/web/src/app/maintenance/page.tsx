'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Wrench, Clock, Mail, Phone } from 'lucide-react';

export default function MaintenancePage() {
    const [settings, setSettings] = useState<any>(null);

    useEffect(() => {
        // Fetch settings for contact info
        fetch('/api/settings')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setSettings(data.data);
                }
            })
            .catch(err => console.error('Error fetching settings:', err));
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#E91E63]/5 via-white to-[#E91E63]/10 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-block">
                        <Image
                            src="/skinluxe-logo-dark.png"
                            alt="SkinLuxe"
                            width={200}
                            height={80}
                            className="mx-auto"
                            priority
                        />
                    </div>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-[#E91E63] to-[#C2185B] p-8 text-white text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4 backdrop-blur-sm">
                            <Wrench className="w-10 h-10" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
                            Under Maintenance
                        </h1>
                        <p className="text-lg text-white/90">
                            We're making things better for you
                        </p>
                    </div>

                    {/* Content */}
                    <div className="p-8 md:p-12">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E91E63]/10 rounded-full text-[#E91E63] mb-6">
                                <Clock className="w-5 h-5" />
                                <span className="font-medium">Temporarily Unavailable</span>
                            </div>

                            <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                We're currently performing scheduled maintenance to improve your experience.
                                Our team is working hard to bring the site back online as soon as possible.
                            </p>

                            <p className="text-gray-500">
                                Thank you for your patience and understanding.
                            </p>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-200 my-8"></div>

                        {/* Contact Info */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-900 text-center mb-6">
                                Need Immediate Assistance?
                            </h2>

                            <div className="grid md:grid-cols-2 gap-4">
                                {/* Email */}
                                <a
                                    href={`mailto:${settings?.contactEmail || 'info@skinluxe-meerut.com'}`}
                                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                                >
                                    <div className="w-12 h-12 bg-[#E91E63]/10 rounded-full flex items-center justify-center group-hover:bg-[#E91E63]/20 transition-colors">
                                        <Mail className="w-6 h-6 text-[#E91E63]" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Email Us</p>
                                        <p className="font-medium text-gray-900">
                                            {settings?.contactEmail || 'info@skinluxe-meerut.com'}
                                        </p>
                                    </div>
                                </a>

                                {/* Phone */}
                                <a
                                    href={`tel:${settings?.contactPhone || '+911211234567'}`}
                                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                                >
                                    <div className="w-12 h-12 bg-[#E91E63]/10 rounded-full flex items-center justify-center group-hover:bg-[#E91E63]/20 transition-colors">
                                        <Phone className="w-6 h-6 text-[#E91E63]" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Call Us</p>
                                        <p className="font-medium text-gray-900">
                                            {settings?.contactPhone || '+91 121 XXX XXXX'}
                                        </p>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* Admin Access */}
                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <p className="text-center text-sm text-gray-500">
                                Administrator?{' '}
                                <a
                                    href="/admin"
                                    className="text-[#E91E63] hover:text-[#C2185B] font-medium underline"
                                >
                                    Access Admin Panel
                                </a>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8 text-gray-500 text-sm">
                    <p>
                        {settings?.copyrightText || '© 2024 SkinLuxe Aesthetics & Academy. All rights reserved.'}
                    </p>
                </div>
            </div>
        </div>
    );
}
