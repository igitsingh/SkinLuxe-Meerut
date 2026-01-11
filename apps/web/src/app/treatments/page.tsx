import React from 'react';
import Link from 'next/link';
import { Sparkles, Zap, Droplets, ArrowRight, Shield, Crown, Clock, CheckCircle } from 'lucide-react';

export const metadata = {
    title: 'Treatments Menu | SkinLuxe Aesthetics Meerut',
    description: 'Explore our medical-grade skin, hair, and laser treatments. US-FDA approved technology curated for Indian skin.',
};

export default function TreatmentsPage() {
    return (
        <div className="bg-white">

            {/* -----------------------------------------------------------------------
          HERO SECTION: MENU HEADER
          Intent: Premium catalog feel.
      ----------------------------------------------------------------------- */}
            <section className="relative py-24 md:py-32 bg-[#1C1C1C] text-white">
                {/* Abstract Background Elements */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#B4838D] opacity-5 blur-[100px] rounded-full pointer-events-none"></div>

                <div className="container relative z-10 text-center max-w-4xl mx-auto">
                    <span className="inline-block py-2 px-4 border border-[#B4838D] text-[#B4838D] text-xs font-serif tracking-[0.2em] uppercase mb-8">
                        Clinical Aesthetics
                    </span>
                    <h1 className="font-serif text-5xl md:text-7xl leading-tight mb-8">
                        Treatment <span className="text-white/70 italic">Menu</span>
                    </h1>
                    <p className="text-white/60 text-lg font-light max-w-2xl mx-auto leading-relaxed">
                        A curated portfolio of advanced dermatological procedures and luxury facials.
                        All treatments are supervised by certified cosmetologists.
                    </p>
                </div>
            </section>

            {/* -----------------------------------------------------------------------
          CATEGORY 1: SIGNATURE THERAPIES
          Intent: Highlight the "Big 3" services (Laser, Hydra, Acne).
      ----------------------------------------------------------------------- */}
            <section className="py-24 bg-[#F9F8F6]">
                <div className="container">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-[#E6E2DD] pb-6">
                        <div>
                            <h2 className="text-[#1C1C1C] font-serif text-4xl mb-2">Signature Therapies</h2>
                            <p className="text-[#4A4A4A] font-light">Our most sought-after medical protocols.</p>
                        </div>
                        <div className="hidden md:block">
                            <Link href="/book-appointment">
                                <button className="text-sm font-serif border-b border-[#1C1C1C] pb-1 hover:text-[#B4838D] hover:border-[#B4838D] transition-colors">
                                    Book Consultation
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-[#E6E2DD] bg-white">

                        {/* Laser Hair Reduction */}
                        <div className="group p-10 border-b lg:border-b-0 lg:border-r border-[#E6E2DD] hover:bg-[#1C1C1C] hover:text-white transition-all duration-500 relative overflow-hidden">
                            <div className="relative z-10">
                                <Zap className="w-10 h-10 text-[#B4838D] mb-6" />
                                <h3 className="font-serif text-2xl mb-4 group-hover:text-white">Laser Hair Reduction</h3>
                                <p className="text-[#4A4A4A] group-hover:text-white/70 font-light text-sm leading-relaxed mb-8 min-h-[5rem]">
                                    Experience freedom from shaving and waxing. Our triple-wavelength diode laser offers painless, permanent reduction safe for all Indian skin types.
                                </p>
                                <Link href="/laser-hair-reduction" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#B4838D] font-medium">
                                    View Pricing <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>

                        {/* HydraFacial */}
                        <div className="group p-10 border-b lg:border-b-0 lg:border-r border-[#E6E2DD] hover:bg-[#1C1C1C] hover:text-white transition-all duration-500 relative overflow-hidden">
                            <div className="relative z-10">
                                <Droplets className="w-10 h-10 text-[#B4838D] mb-6" />
                                <h3 className="font-serif text-2xl mb-4 group-hover:text-white">HydraFacial MD®</h3>
                                <p className="text-[#4A4A4A] group-hover:text-white/70 font-light text-sm leading-relaxed mb-8 min-h-[5rem]">
                                    The original 3-step treatment: Cleanse, Extract, and Hydrate. Get glass-like skin with zero downtime. Perfect for events or monthly maintenance.
                                </p>
                                <Link href="/hydrafacial" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#B4838D] font-medium">
                                    See The Steps <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>

                        {/* Acne Protocol */}
                        <div className="group p-10 hover:bg-[#1C1C1C] hover:text-white transition-all duration-500 relative overflow-hidden">
                            <div className="relative z-10">
                                <Shield className="w-10 h-10 text-[#B4838D] mb-6" />
                                <h3 className="font-serif text-2xl mb-4 group-hover:text-white">Acne & Scar Defense</h3>
                                <p className="text-[#4A4A4A] group-hover:text-white/70 font-light text-sm leading-relaxed mb-8 min-h-[5rem]">
                                    A medical protocol to control active acne and remodel deep scars using Chemical Peels, MNRF, and CO2 Laser technology.
                                </p>
                                <Link href="/acne-treatment" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#B4838D] font-medium">
                                    Explore Protocol <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* -----------------------------------------------------------------------
          CATEGORY 2: ADVANCED AESTHETICS LIST
          Intent: Clean list for other services (Anti-Aging, Pigmentation, etc).
      ----------------------------------------------------------------------- */}
            <section className="py-24 bg-white">
                <div className="container max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-[#1C1C1C] font-serif text-4xl mb-4">Complete Treatment List</h2>
                        <p className="text-[#4A4A4A] font-light">Targeted solutions for specific concerns.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                        {/* Column 1: Anti-Aging & Rejuvenation */}
                        <div>
                            <h3 className="font-serif text-xl text-[#B4838D] mb-6 border-b border-[#B4838D]/20 pb-2">Anti-Aging & Rejuvenation</h3>
                            <div className="space-y-6">
                                {[
                                    { title: 'Botox & Fillers', desc: 'Wrinkle relaxation and volume restoration.', link: '/botox-fillers' },
                                    { title: 'HIFU Skin Tightening', desc: 'Non-surgical facelift using ultrasound energy.', link: '/hifu-treatment' },
                                    { title: 'Vampire Facial (PRP)', desc: 'Natural rejuvenation using growth factors.', link: '/prp-vampire-facial' },
                                    { title: 'Skin Boosters', desc: 'Deep hydration micro-injections for glow.', link: '/skin-boosters' }
                                ].map((item, idx) => (
                                    <Link key={idx} href={item.link} className="block group cursor-pointer">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h4 className="text-[#1C1C1C] text-lg font-serif group-hover:text-[#B4838D] transition-colors">{item.title}</h4>
                                            <ArrowRight className="w-4 h-4 text-[#E6E2DD] group-hover:text-[#B4838D] transition-colors opacity-0 group-hover:opacity-100" />
                                        </div>
                                        <p className="text-sm text-[#4A4A4A] font-light">{item.desc}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Column 2: Pigmentation & Brightening */}
                        <div>
                            <h3 className="font-serif text-xl text-[#B4838D] mb-6 border-b border-[#B4838D]/20 pb-2">Glow & Pigmentation</h3>
                            <div className="space-y-6">
                                {[
                                    { title: 'Carbon Laser Peel', desc: 'Hollywood peel for instant brightening and porch reduction.', link: '/carbon-laser-peel' },
                                    { title: 'Q-Switch Laser Toning', desc: 'Targets melanin to treat pigmentation and uneven tone.', link: '/q-switch-laser' },
                                    { title: 'Chemical Peels', desc: 'Exfoliation for acne, spots, and dullness (Glycolic, Salicylic).', link: '/chemical-peels' },
                                    { title: 'Medi-Facials', desc: 'Customized facials for hydration and glow.', link: '/medi-facials' }
                                ].map((item, idx) => (
                                    <Link key={idx} href={item.link} className="block group cursor-pointer">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h4 className="text-[#1C1C1C] text-lg font-serif group-hover:text-[#B4838D] transition-colors">{item.title}</h4>
                                            <ArrowRight className="w-4 h-4 text-[#E6E2DD] group-hover:text-[#B4838D] transition-colors opacity-0 group-hover:opacity-100" />
                                        </div>
                                        <p className="text-sm text-[#4A4A4A] font-light">{item.desc}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Banner for Makeup */}
                    <div className="mt-20 border border-[#E6E2DD] p-12 text-center bg-[#F9F8F6]">
                        <Crown className="w-8 h-8 text-[#B4838D] mx-auto mb-4" />
                        <h3 className="font-serif text-3xl text-[#1C1C1C] mb-4">Event & Bridal Services</h3>
                        <p className="text-[#4A4A4A] font-light max-w-lg mx-auto mb-8">
                            We offer premium HD and Airbrush makeup services for brides and party guests.
                            Look flawless on your special day.
                        </p>
                        <Link href="/book-appointment">
                            <button className="btn-luxury border-[#1C1C1C] text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-white">
                                Book Makeup Artist
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* -----------------------------------------------------------------------
          BOTTOM CTA
          Intent: Catch-all for undecided users.
      ----------------------------------------------------------------------- */}
            <section className="py-24 bg-[#1C1C1C] text-white overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="container relative z-10 text-center">
                    <h2 className="font-serif text-4xl mb-6">Start Your Transformation</h2>
                    <p className="text-white/60 text-lg font-light mb-10 max-w-xl mx-auto">
                        Not sure what you need? Book a consultation with Alka Yadav for a professional skin analysis.
                    </p>
                    <Link href="/book-appointment">
                        <button className="px-8 py-4 bg-[#B4838D] text-white hover:bg-white hover:text-[#1C1C1C] transition-colors duration-300 font-serif tracking-widest text-xs uppercase">
                            Book Consultation
                        </button>
                    </Link>
                </div>
            </section>

        </div>
    );
}
