"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Sparkles, Zap, Droplets, ArrowRight, Shield, Crown, Clock, CheckCircle } from 'lucide-react';
import api from '@/lib/api';
import PageLoader from '@/components/PageLoader';

// Icon Mapping Helper
const getIcon = (iconName: string | null) => {
    switch (iconName) {
        case 'Zap': return Zap;
        case 'Droplets': return Droplets;
        case 'Shield': return Shield;
        default: return Sparkles;
    }
};

interface Treatment {
    id: string;
    name: string;
    slug: string;
    description: string;
    category: string;
    price: string;
    duration: string;
    icon: string | null;
    isFeatured: boolean;
}

export default function TreatmentsPage() {
    const [treatments, setTreatments] = useState<Treatment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTreatments = async () => {
            try {
                const res = await api.get('/treatments');
                setTreatments(res.data);
            } catch (error) {
                console.error("Failed to fetch treatments", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTreatments();
    }, []);

    // Filter by isFeatured first, otherwise fall back to 'Signature' category if strict transition is needed
    // But user explicitly asked about "Mark as Featured". So let's prioritize isFeatured.
    const featuredList = treatments.filter(t => t.isFeatured);
    // If no featured items (e.g. existing data not migrated), fallback to Signature category to prevent empty section
    const displayList = featuredList.length > 0 ? featuredList : treatments.filter(t => t.category === 'Signature');

    if (loading) {
        return <PageLoader />;
    }

    return (
        <div className="bg-white">

            {/* HERO SECTION */}
            <section className="relative py-24 md:py-32 bg-[#1C1C1C] text-white">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#B4838D] opacity-5 blur-[100px] rounded-full pointer-events-none"></div>
                <div className="container relative z-10 text-center max-w-4xl mx-auto">
                    <span className="inline-block py-2 px-4 border border-[#B4838D] text-[#B4838D] text-xs font-serif tracking-[0.2em] uppercase mb-8">
                        Clinical Aesthetics
                    </span>
                    <h1 className="font-serif text-5xl md:text-7xl leading-tight mb-8">
                        <span className="text-white">Treatment</span> <span className="text-white/70 italic">Menu</span>
                    </h1>
                    <p className="text-white/60 text-lg font-light max-w-2xl mx-auto leading-relaxed">
                        A curated portfolio of advanced dermatological procedures and luxury facials.
                        All treatments are supervised by certified cosmetologists.
                    </p>
                </div>
            </section>

            {/* CATEGORY 1: SIGNATURE / FEATURED THERAPIES */}
            <section className="py-24 bg-[#F9F8F6]">
                <div className="container">
                    <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 border-b border-[#E6E2DD] pb-6 text-center md:text-left">
                        <div>
                            <h2 className="text-[#1C1C1C] font-serif text-4xl mb-2">Featured Treatments</h2>
                            <p className="text-[#4A4A4A] font-light">Our most sought-after medical protocols.</p>
                        </div>
                        <div className="mt-6 md:mt-0">
                            <Link href="/book-appointment">
                                <button className="text-sm font-serif border-b border-[#1C1C1C] pb-1 hover:text-[#B4838D] hover:border-[#B4838D] transition-colors">
                                    Book Consultation
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Grid with gap-px for perfect borders across multiple rows */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-[#E6E2DD] border border-[#E6E2DD]">
                        {displayList.map((t, idx) => {
                            const Icon = getIcon(t.icon);
                            return (
                                <div key={t.id} className="group bg-white p-10 hover:bg-[#1C1C1C] hover:text-white transition-all duration-500 relative overflow-hidden text-center md:text-left flex flex-col items-center md:items-start">
                                    <div className="relative z-10 w-full flex flex-col items-center md:items-start transition-all duration-500">
                                        <Icon className="w-10 h-10 text-[#B4838D] mb-6" />
                                        <h3 className="font-serif text-2xl mb-4 group-hover:text-white">{t.name}</h3>
                                        <p className="text-[#4A4A4A] group-hover:text-white/70 font-light text-sm leading-relaxed mb-8 min-h-[5rem]">
                                            {t.description}
                                        </p>
                                        <Link href={`/treatments/${t.slug}`} className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#B4838D] font-medium">
                                            View Treatment <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CATEGORY 2: ADVANCED AESTHETICS LIST */}
            <section className="py-24 bg-white">
                <div className="container max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-[#1C1C1C] font-serif text-4xl mb-4">Complete Treatment List</h2>
                        <p className="text-[#4A4A4A] font-light">Targeted solutions for specific concerns.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
                        {/* Dynamic Category Rendering */}
                        {Object.entries(
                            treatments.reduce((acc, t) => {
                                const cat = t.category || 'Other';
                                if (!acc[cat]) acc[cat] = [];
                                acc[cat].push(t);
                                return acc;
                            }, {} as Record<string, Treatment[]>)
                        ).map(([category, items], index) => (
                            <div key={category} className="mb-8 break-inside-avoid text-center md:text-left">
                                <h3 className="font-serif text-xl text-[#B4838D] mb-6 border-b border-[#B4838D]/20 pb-2 inline-block md:block">
                                    {category}
                                </h3>
                                <div className="space-y-6">
                                    {items.map((item) => (
                                        <Link key={item.id} href={`/treatments/${item.slug}`} className="block group cursor-pointer">
                                            <div className="flex flex-col md:flex-row justify-between items-center md:items-baseline mb-1">
                                                <h4 className="text-[#1C1C1C] text-lg font-serif group-hover:text-[#B4838D] transition-colors">
                                                    {item.name}
                                                </h4>
                                                <ArrowRight className="w-4 h-4 text-[#E6E2DD] group-hover:text-[#B4838D] transition-colors opacity-0 group-hover:opacity-100 hidden md:block" />
                                            </div>
                                            <p className="text-sm text-[#4A4A4A] font-light max-w-xs mx-auto md:mx-0">
                                                {item.description ? item.description.slice(0, 60) + '...' : ''}
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Banner for Makeup */}
                    <div className="mt-20 border border-[#E6E2DD] p-12 text-center bg-[#F9F8F6]">
                        <Crown className="w-8 h-8 text-[#B4838D] mx-auto mb-4" />
                        <h3 className="font-serif text-3xl text-[#1C1C1C] mb-4">Event & Bridal Services</h3>
                        <p className="text-[#4A4A4A] font-light max-w-lg mx-auto mb-8">
                            We offer premium HD and Airbrush makeup services for brides and party guests.
                        </p>
                        <Link href="/book-appointment" className="w-full sm:w-auto inline-block">
                            <button className="btn-luxury-filled w-full sm:w-auto h-[54px] min-w-[200px] flex items-center justify-center bg-transparent border !border-[#1C1C1C] !text-[#1C1C1C] hover:!bg-[#1C1C1C] hover:!text-white transition-colors duration-300 uppercase tracking-widest text-xs mx-auto">
                                Book Makeup Artist
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* BOTTOM CTA */}
            <section className="py-24 bg-[#1C1C1C] text-white">
                <div className="container text-center">
                    <h2 className="font-serif text-4xl text-white mb-6">Start Your Transformation</h2>
                    <p className="text-white/60 text-lg font-light mb-10 max-w-xl mx-auto">
                        Not sure what you need? Book a consultation with a professional skin analysis.
                    </p>
                    <Link href="/book-appointment" className="w-full sm:w-auto inline-block">
                        <button className="btn-luxury-filled w-full sm:w-auto h-[54px] min-w-[200px] flex items-center justify-center bg-[#B4838D] border-[#B4838D] text-white hover:bg-white hover:text-[#1C1C1C] hover:border-white transition-colors duration-300 font-serif tracking-widest text-xs uppercase mx-auto">
                            Book Consultation
                        </button>
                    </Link>
                </div>
            </section>

        </div>
    );
}

