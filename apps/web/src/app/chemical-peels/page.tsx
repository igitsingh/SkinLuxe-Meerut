import React from 'react';
import Link from 'next/link';
import { Sparkles, Shield, AlertTriangle, ArrowRight } from 'lucide-react';

export const metadata = {
    title: 'Chemical Peels | SkinLuxe Meerut',
    description: 'Medical-grade chemical peels for acne, pigmentation, and glowing skin. Safe, controlled exfoliation by certified dermatologists.',
};

export default function ChemicalPeelsPage() {
    return (
        <div className="bg-white">
            {/* HERO */}
            <section className="relative min-h-[60vh] flex items-center justify-center bg-[#1C1C1C] text-white pt-32 pb-20">
                <div className="container relative z-10 text-center max-w-4xl">
                    <span className="inline-block py-2 px-4 border border-[#B4838D] text-[#B4838D] text-xs font-serif tracking-[0.2em] uppercase mb-6">
                        Clinical Exfoliation
                    </span>
                    <h1 className="font-serif text-5xl md:text-7xl mb-6 leading-tight">
                        Resurface <span className="text-white/80 italic">& Renew</span>
                    </h1>
                    <p className="text-white/70 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-10">
                        Shed dullness and reveal the fresh, healthy skin underneath. Our medical-grade peels are
                        significantly more effective than salon facials or over-the-counter serums.
                    </p>
                    <Link href="/book-appointment">
                        <button className="btn-luxury-filled bg-[#B4838D] border-[#B4838D] hover:bg-white hover:text-[#1C1C1C] hover:border-white min-w-[200px]">
                            Book Skin Analysis
                        </button>
                    </Link>
                </div>
            </section>

            {/* COMPARISON: WHY MEDICAL PEELS? */}
            <section className="py-24 bg-[#F9F8F6]">
                <div className="container max-w-5xl">
                    <div className="text-center mb-16">
                        <h2 className="text-[#1C1C1C] mb-4">Why Choose a Medical Peel?</h2>
                        <p className="text-[#4A4A4A] font-light max-w-2xl mx-auto">
                            A salon "peel" often just scrubs the surface. A medical peel penetrates deeper to stimulate cellular turnover.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-10 border border-[#E6E2DD]">
                            <h3 className="font-serif text-2xl text-[#1C1C1C] mb-6 flex items-center gap-3">
                                <AlertTriangle className="w-6 h-6 text-gray-400" /> Salon Facials
                            </h3>
                            <ul className="space-y-4 text-sm text-[#4A4A4A]">
                                <li className="flex gap-3"><span className="text-red-400">✕</span> Works only on superficial layer (epidermis)</li>
                                <li className="flex gap-3"><span className="text-red-400">✕</span> Results last 2-3 days max</li>
                                <li className="flex gap-3"><span className="text-red-400">✕</span> Generic products for all skin types</li>
                            </ul>
                        </div>

                        <div className="bg-[#1C1C1C] p-10 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#B4838D] opacity-10 rounded-full blur-2xl"></div>
                            <h3 className="font-serif text-2xl text-white mb-6 flex items-center gap-3 relative z-10">
                                <Shield className="w-6 h-6 text-[#B4838D]" /> SkinLuxe Medical Peels
                            </h3>
                            <ul className="space-y-4 text-sm text-white/80 relative z-10">
                                <li className="flex gap-3"><span className="text-[#B4838D]">✓</span> Penetrates vertically to treat root cause</li>
                                <li className="flex gap-3"><span className="text-[#B4838D]">✓</span> Long-term structural improvement</li>
                                <li className="flex gap-3"><span className="text-[#B4838D]">✓</span> Customized acids (Glycolic, Salicylic, Lactic)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* PEEL MENU */}
            <section className="py-24 bg-white">
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="text-[#1C1C1C]">Our Peel Menu</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#E6E2DD]">
                        {[
                            { title: 'The Party Peel', acid: 'Lactic / Arginine', desc: 'Instant glow with zero downtime. Perfect before weddings or events to get that "glass skin" look.' },
                            { title: 'Acne Control', acid: 'Salicylic Acid', desc: 'Oil-soluble acid that dives deep into pores to dissolve sebum and kill acne-causing bacteria.' },
                            { title: 'De-Tan & Brightening', acid: 'Glycolic / Kojic', desc: 'Exfoliates sun-damaged layers and inhibits melanin production to reduce pigmentation.' }
                        ].map((item, i) => (
                            <div key={i} className="p-10 text-center hover:bg-[#F9F8F6] transition-colors border-b md:border-b-0 md:border-r border-[#E6E2DD] last:border-r-0">
                                <span className="text-xs font-bold text-[#B4838D] uppercase tracking-widest mb-4 block">{item.acid}</span>
                                <h3 className="font-serif text-2xl text-[#1C1C1C] mb-4">{item.title}</h3>
                                <p className="text-[#4A4A4A] font-light text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-[#F9F8F6] text-center">
                <div className="container">
                    <h2 className="font-serif text-3xl mb-6 text-[#1C1C1C]">Unsure which peel fits your skin?</h2>
                    <p className="text-[#4A4A4A] mb-8 font-light">
                        Using the wrong acid can burn your skin. Trust only certified experts.
                    </p>
                    <Link href="/book-appointment">
                        <button className="btn-luxury-filled bg-[#1C1C1C] border-[#1C1C1C] text-white hover:bg-transparent hover:text-[#1C1C1C]">
                            Consult a Dermatologist
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
