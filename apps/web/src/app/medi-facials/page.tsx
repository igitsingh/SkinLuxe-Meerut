import React from 'react';
import Link from 'next/link';
import { Leaf, Sparkles, UserCheck } from 'lucide-react';

export const metadata = {
    title: 'Luxury Medi-Facials | SkinLuxe Meerut',
    description: 'Clinical grade facials customized for your skin. Experience the difference between a salon facial and a Medi-Facial.',
};

export default function MediFacialsPage() {
    return (
        <div className="bg-white">
            {/* HERO */}
            <section className="relative min-h-[60vh] flex items-center justify-center bg-[#1C1C1C] text-white pt-32 pb-20">
                <div className="container relative z-10 text-center max-w-4xl">
                    <span className="inline-block py-2 px-4 border border-[#B4838D] text-[#B4838D] text-xs font-serif tracking-[0.2em] uppercase mb-6">
                        Clinical Spa Experience
                    </span>
                    <h1 className="font-serif text-4xl md:text-7xl mb-6 leading-tight">
                        More Than Just <br /><span className="text-white/50 italic">Pampering</span>
                    </h1>
                    <p className="text-white/70 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-10">
                        SkinLuxe Medi-Facials combine relaxation with medical-grade efficacy.
                        Designed by dermatologists to treat specific skin concerns while you unwind.
                    </p>
                    <Link href="/book-appointment">
                        <button className="btn-luxury-filled bg-[#B4838D] border-[#B4838D] text-white hover:bg-white hover:text-[#1C1C1C] hover:border-white min-w-[200px]">
                            Browse Menu
                        </button>
                    </Link>
                </div>
            </section>

            {/* WHY MEDI-FACIAL */}
            <section className="py-24 bg-white">
                <div className="container max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-[#1C1C1C] mb-6">Salon Facial vs. Medi-Facial</h2>
                            <p className="text-[#4A4A4A] font-light mb-8">
                                Typical salon facials work on the surface (epidermis) and often use generic creams.
                                Medi-facials use pharmaceutical-grade ingredients and technologies (like ultrasound or microcurrents)
                                to penetrate the dermis for lasting change.
                            </p>

                            <ul className="space-y-4">
                                <li className="flex gap-4 items-start">
                                    <UserCheck className="w-6 h-6 text-[#B4838D] shrink-0" />
                                    <span className="text-[#4A4A4A] text-sm">Performed/Supervised by medical professionals.</span>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <Sparkles className="w-6 h-6 text-[#B4838D] shrink-0" />
                                    <span className="text-[#4A4A4A] text-sm">Uses active ingredients like Retinol, Vitamin C, and Hyaluronic Acid.</span>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <Leaf className="w-6 h-6 text-[#B4838D] shrink-0" />
                                    <span className="text-[#4A4A4A] text-sm">Customized to your acne, pigmentation, or aging concerns.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-[#1C1C1C] text-white p-12">
                            <h3 className="font-serif text-3xl mb-8 border-b border-white/20 pb-4">Signature Menu</h3>

                            <div className="space-y-6">
                                <div className="flex justify-between items-baseline group">
                                    <span className="text-lg font-serif">Oxy-Geneo 3-in-1</span>
                                    <span className="text-sm text-white/50 group-hover:text-[#B4838D] transition-colors">Cleanse • Exfoliate • Oxygenate</span>
                                </div>
                                <div className="flex justify-between items-baseline group">
                                    <span className="text-lg font-serif">Power Glow</span>
                                    <span className="text-sm text-white/50 group-hover:text-[#B4838D] transition-colors">Vitamin C Infusion for Events</span>
                                </div>
                                <div className="flex justify-between items-baseline group">
                                    <span className="text-lg font-serif">Acne Clarifying</span>
                                    <span className="text-sm text-white/50 group-hover:text-[#B4838D] transition-colors">Salicylic Acid Deep Clean</span>
                                </div>
                                <div className="flex justify-between items-baseline group">
                                    <span className="text-lg font-serif">Anti-Age Ritual</span>
                                    <span className="text-sm text-white/50 group-hover:text-[#B4838D] transition-colors">Radiofrequency + Massage</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
