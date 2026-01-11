import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Shield, Clock, AlertCircle } from 'lucide-react';

export const metadata = {
    title: 'Botox & Dermal Fillers | SkinLuxe Meerut',
    description: 'Natural-looking anti-aging treatments. US-FDA approved Botox and Juvederm fillers administered by certified cosmetologists.',
};

export default function BotoxFillersPage() {
    return (
        <div className="bg-white">
            {/* -----------------------------------------------------------------------
          HERO SECTION
      ----------------------------------------------------------------------- */}
            <section className="relative min-h-[60vh] flex items-center justify-center bg-[#1C1C1C] text-white pt-32 pb-20">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

                <div className="container relative z-10 text-center max-w-4xl">
                    <span className="inline-block py-2 px-4 border border-[#B4838D] text-[#B4838D] text-xs font-serif tracking-[0.2em] uppercase mb-6">
                        Anti-Aging Injectables
                    </span>
                    <h1 className="font-serif text-5xl md:text-7xl mb-6 leading-tight">
                        The Art of <br />
                        <span className="text-white/80 italic">Subtle Refinement</span>
                    </h1>
                    <p className="text-white/70 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-10">
                        We believe the best aesthetic work goes unnoticed. Our medical-grade injectables
                        refresh your look without removing your natural expression.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link href="/book-appointment">
                            <button className="btn-luxury-filled bg-[#B4838D] border-[#B4838D] hover:bg-white hover:text-[#1C1C1C] hover:border-white min-w-[200px]">
                                Book Consultation
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* -----------------------------------------------------------------------
          THE PHILOSOPHY vs FEAR
      ----------------------------------------------------------------------- */}
            <section className="py-24 bg-[#F9F8F6]">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        <div>
                            <h2 className="text-[#1C1C1C] mb-6">"Will I look frozen?"</h2>
                            <p className="text-[#4A4A4A] text-lg font-light leading-relaxed mb-8">
                                This is the #1 question we get. The "frozen" look comes from over-treatment.
                                At SkinLuxe, we follow a strict <strong>"Less is More"</strong> philosophy.
                            </p>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-full bg-[#E91E63]/10 flex items-center justify-center flex-shrink-0 text-[#E91E63]">
                                        <Shield className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-serif text-xl text-[#1C1C1C]">US-FDA Approved Only</h4>
                                        <p className="text-sm text-[#4A4A4A] mt-1">We strictly use premium brands like Allergan Botox® and Juvederm® fillers. No cheap generic alternatives.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-full bg-[#E91E63]/10 flex items-center justify-center flex-shrink-0 text-[#E91E63]">
                                        <CheckCircle className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-serif text-xl text-[#1C1C1C]">Micro-Dosing Technique</h4>
                                        <p className="text-sm text-[#4A4A4A] mt-1">We administer precise micro-doses to soften lines while keeping your natural movement intact.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Visual Placeholder */}
                        <div className="relative aspect-square border border-[#B4838D]/20 p-8 flex items-center justify-center bg-white">
                            <div className="text-center space-y-2">
                                <p className="font-serif text-2xl text-[#1C1C1C]">Botox® vs Fillers</p>
                                <p className="text-sm text-[#4A4A4A] uppercase tracking-widest">Know the difference</p>
                                <div className="w-16 h-px bg-[#B4838D] mx-auto my-4"></div>
                                <div className="grid grid-cols-2 gap-8 text-left text-sm mt-8">
                                    <div>
                                        <strong className="block text-[#B4838D] mb-1">Botox</strong>
                                        <p className="text-[#4A4A4A]">Relaxes muscles to smooth dynamic wrinkles (forehead, crows feet).</p>
                                    </div>
                                    <div>
                                        <strong className="block text-[#B4838D] mb-1">Fillers</strong>
                                        <p className="text-[#4A4A4A]">Restores lost volume and structures (lips, cheeks, chin, jawline).</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* -----------------------------------------------------------------------
          TREATMENT ZONES
      ----------------------------------------------------------------------- */}
            <section className="py-24 bg-white">
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="text-[#1C1C1C] mb-4">Common Treatment Areas</h2>
                        <p className="text-[#4A4A4A] font-light">Customized contouring for your unique facial structure.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: 'Upper Face', desc: 'Forehead lines, Frown lines (11s), Crows feet.', type: 'Botox' },
                            { title: 'Mid Face', desc: 'Cheek volume, Under-eye hollows (tear troughs).', type: 'Fillers' },
                            { title: 'Lower Face', desc: 'Lip enhancement, Chin projection, Jawline definition.', type: 'Fillers' }
                        ].map((area, i) => (
                            <div key={i} className="group p-8 border border-[#E6E2DD] hover:border-[#B4838D] transition-all duration-300">
                                <span className="text-xs font-bold text-[#B4838D] uppercase tracking-widest mb-4 block">{area.type}</span>
                                <h3 className="font-serif text-2xl text-[#1C1C1C] mb-3">{area.title}</h3>
                                <p className="text-[#4A4A4A] font-light text-sm mb-6">{area.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* -----------------------------------------------------------------------
          FAQ / CONCERNS
      ----------------------------------------------------------------------- */}
            <section className="py-24 bg-[#1C1C1C] text-white">
                <div className="container max-w-4xl">
                    <h2 className="text-center mb-12 font-serif text-4xl">Common Concerns</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-6 border border-white/10 rounded-lg">
                            <h4 className="flex items-center gap-3 text-lg font-serif mb-3">
                                <Clock className="w-5 h-5 text-[#B4838D]" /> How long does it last?
                            </h4>
                            <p className="text-white/60 font-light text-sm">Botox typically lasts 3-4 months. Fillers can last anywhere from 9 to 18 months depending on the type used.</p>
                        </div>
                        <div className="p-6 border border-white/10 rounded-lg">
                            <h4 className="flex items-center gap-3 text-lg font-serif mb-3">
                                <AlertCircle className="w-5 h-5 text-[#B4838D]" /> Does it hurt?
                            </h4>
                            <p className="text-white/60 font-light text-sm">Discomfort is minimal. We use numbing cream for fillers, and Botox needles are extremely fine, feeling like a tiny pinch.</p>
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                        <p className="mb-6 text-white/80">Ready to refresh your look?</p>
                        <Link href="/book-appointment">
                            <button className="btn-luxury-filled bg-white text-[#1C1C1C] border-white hover:bg-[#B4838D] hover:text-white hover:border-[#B4838D]">
                                Book Consultation
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
}
