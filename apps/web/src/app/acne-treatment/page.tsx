import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Shield, Clock, Calendar } from 'lucide-react';

export const metadata = {
    title: 'Acne & Pigmentation Treatment | SkinLuxe Meerut',
    description: 'Medical-grade acne and scar treatments in Meerut. Scientifically proven protocols for clear, healthy skin. Book a consultation with Alka Yadav.',
};

export default function AcneTreatmentPage() {
    return (
        <div className="bg-[#FFFFFF]">
            {/* -----------------------------------------------------------------------
          HERO SECTION: ARCHITECTURAL & CALM
          Intent: Immediate trust, medical authority, no "beauty salon" vibes.
      ----------------------------------------------------------------------- */}
            <section className="relative min-h-[60vh] flex items-center justify-center bg-[#1C1C1C] text-white pt-32 pb-20">

                {/* Background Texture/Image Overlay */}
                <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#1C1C1C] via-[#2A2A2A] to-[#1C1C1C]"></div>

                <div className="container relative z-10 text-center max-w-4xl">
                    <span className="inline-block py-2 px-4 border border-[#B4838D] text-[#B4838D] text-xs font-serif tracking-[0.2em] uppercase mb-6">
                        Clinical Dermatology
                    </span>
                    <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-8 leading-tight text-white">
                        Reclaim Protocol: <br />
                        <span className="text-white/90">Acne & Scar Defense</span>
                    </h1>
                    <p className="text-white/70 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-12">
                        A medically-guided approach to clearing active acne and restoring skin texture.
                        No quick fixes—just science-backed, long-term results.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link href="/book-appointment">
                            <button className="btn-luxury-filled bg-[#B4838D] border-[#B4838D] hover:bg-white hover:text-[#1C1C1C] hover:border-white min-w-[200px]">
                                Book Consultation
                            </button>
                        </Link>
                        <Link href="#protocol">
                            <button className="btn-luxury text-white border-white hover:bg-white hover:text-[#1C1C1C] min-w-[200px]">
                                View Protocol
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* -----------------------------------------------------------------------
          THE SCIENCE: WHY IT HAPPENS
          Intent: Educate to build authority.
      ----------------------------------------------------------------------- */}
            <section className="bg-[#F9F8F6] border-b border-[#E6E2DD]">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        {/* Left: Text */}
                        <div className="space-y-8">
                            <h2 className="text-[#1C1C1C]">Why Acne Persists</h2>
                            <p className="text-[#4A4A4A] text-lg font-light leading-relaxed">
                                Acne isn't just "dirt" on your face—it's a complex inflammatory condition involving oil regulation, bacteria (C. acnes), and cellular turnover. Store-bought creams often fail because they treat the surface, not the root cause.
                            </p>

                            <div className="space-y-6 pt-4">
                                {[
                                    { title: 'Hormonal Imbalance', desc: 'Regulating androgen sensitivity in oil glands.' },
                                    { title: 'Bacterial Overgrowth', desc: 'Targeting C. acnes without damaging the skin barrier.' },
                                    { title: 'Inflammation Control', desc: 'Calming redness to prevent deep scarring.' }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex gap-4 items-start group">
                                        <div className="w-12 h-12 flex items-center justify-center border border-[#B4838D]/30 text-[#B4838D] font-serif text-xl group-hover:bg-[#B4838D] group-hover:text-white transition-all duration-500 flex-shrink-0">
                                            {idx + 1}
                                        </div>
                                        <div>
                                            <h4 className="font-serif text-xl mb-1 text-[#1C1C1C]">{item.title}</h4>
                                            <p className="text-sm text-[#4A4A4A] font-light">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Abstract/Medical Visual Placeholder */}
                        <div className="relative aspect-square bg-[#E6E2DD] p-8 flex items-center justify-center border border-[#B4838D]/20">
                            <div className="text-center space-y-4">
                                <Shield className="w-16 h-16 text-[#B4838D] mx-auto opacity-50" />
                                <p className="text-sm font-serif tracking-widest text-[#1C1C1C] uppercase">Medical Grade Assessment</p>
                                <p className="text-xs text-[#4A4A4A]">Diagnosis • Treatment • Maintenance</p>
                            </div>
                            {/* Decorative border */}
                            <div className="absolute top-4 left-4 right-4 bottom-4 border border-[#FFFFFF] opacity-50"></div>
                        </div>

                    </div>
                </div>
            </section>

            {/* -----------------------------------------------------------------------
          PROTOCOL GRID: TREATMENTS
          Intent: Show breadth of treatment options.
      ----------------------------------------------------------------------- */}
            <section id="protocol" className="bg-white">
                <div className="container">
                    <div className="max-w-3xl mb-16">
                        <h2 className="mb-6 text-[#1C1C1C]">Our Treatment Protocols</h2>
                        <p className="text-[#4A4A4A] text-lg font-light">
                            We don't use a "one-size-fits-all" approach. Your treatment plan will be a customized combination of the following medical therapies.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-[#E6E2DD]">
                        {[
                            {
                                title: 'Chemical Peels',
                                desc: 'Medical-grade exfoliation (Salicylic, Glycolic, TCA) to declog pores and fade marks.',
                                ideal: 'Active Acne & Mild Scars'
                            },
                            {
                                title: 'Laser Toning (Q-Switch)',
                                desc: 'Advanced laser technology to break down pigmentation and stimulate collagen.',
                                ideal: 'Post-Acne Marks & Pigmentation'
                            },
                            {
                                title: 'MNRF (Microneedling)',
                                desc: 'Radiofrequency energy delivered deep into the skin to remodel scar tissue.',
                                ideal: 'Deep Ice-pick & Boxcar Scars'
                            },
                            {
                                title: 'CO2 Fractional Laser',
                                desc: 'Resurfacing treatment for severe texture issues and deep pitting.',
                                ideal: 'Severe Scarring'
                            },
                            {
                                title: 'Comedone Extraction',
                                desc: 'Sterile, medically supervised removal of blackheads and whiteheads.',
                                ideal: 'Clogged Pores'
                            },
                            {
                                title: 'HydraFacial MD',
                                desc: 'Deep cleansing and hydration to maintain barrier health during treatment.',
                                ideal: 'Maintenance & Glow'
                            }
                        ].map((card, i) => (
                            <div key={i} className="group p-10 border-r border-b border-[#E6E2DD] hover:bg-[#F9F8F6] transition-colors duration-500">
                                <h3 className="font-serif text-2xl mb-4 text-[#1C1C1C] group-hover:text-[#B4838D] transition-colors">{card.title}</h3>
                                <p className="text-[#4A4A4A] font-light mb-6 leading-relaxed text-sm">
                                    {card.desc}
                                </p>
                                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[#B4838D]">
                                    <CheckCircle className="w-4 h-4" />
                                    {card.ideal}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* -----------------------------------------------------------------------
          BEFORE & AFTER: REAL RESULTS
          Intent: Proof.
      ----------------------------------------------------------------------- */}
            <section className="bg-[#1C1C1C] text-white overflow-hidden relative">
                <div className="container py-24">
                    <h2 className="text-white text-center mb-16">Real Clinical Results</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Result 1 */}
                        <div className="bg-[#2A2A2A] p-4 border border-white/10">
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="aspect-[4/5] bg-black/50 relative flex items-center justify-center">
                                    <span className="text-white/30 text-xs tracking-widest uppercase">Before</span>
                                </div>
                                <div className="aspect-[4/5] bg-black/50 relative flex items-center justify-center">
                                    <span className="text-[#B4838D] text-xs tracking-widest uppercase">After 4 Sessions</span>
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="font-serif text-lg text-white mb-1">Severe Cystic Acne</p>
                                <p className="text-white/60 text-xs font-light">Treatment: Chemical Peels + Oral Medication</p>
                            </div>
                        </div>

                        {/* Result 2 */}
                        <div className="bg-[#2A2A2A] p-4 border border-white/10">
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="aspect-[4/5] bg-black/50 relative flex items-center justify-center">
                                    <span className="text-white/30 text-xs tracking-widest uppercase">Before</span>
                                </div>
                                <div className="aspect-[4/5] bg-black/50 relative flex items-center justify-center">
                                    <span className="text-[#B4838D] text-xs tracking-widest uppercase">After 6 Sessions</span>
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="font-serif text-lg text-white mb-1">Post-Acne Scarring</p>
                                <p className="text-white/60 text-xs font-light">Treatment: MNRF + CO2 Laser</p>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <p className="text-white/50 text-sm font-light italic mb-6">
                            *Results vary by individual skin type and adherence to protocol.
                        </p>
                        <Link href="/book-appointment">
                            <button className="btn-luxury border-white text-white hover:bg-white hover:text-[#1C1C1C]">
                                Do I need this? (Free Chat)
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* -----------------------------------------------------------------------
          FAQ / CONCERNS
      ----------------------------------------------------------------------- */}
            <section className="bg-[#F9F8F6]">
                <div className="container max-w-4xl">
                    <h2 className="text-center mb-16 text-[#1C1C1C]">Common Questions</h2>

                    <div className="space-y-4">
                        {[
                            { q: 'How long does it take to see results?', a: 'Acne treatments typically require 3-6 sessions spaced 2-4 weeks apart. You may see inflammation reduce after the first session, but texture changes take time as collagen rebuilds.' },
                            { q: 'Is the treatment painful?', a: 'Most peels cause a mild tingling sensation. Laser treatments may feel like a rubber band snap, but we use numbing cream to ensure your comfort.' },
                            { q: 'Can I wear makeup after treatment?', a: 'We recommend avoiding makeup for 24-48 hours to let your pores breathe and skin heal. We will prescribe a non-comedogenic sunscreen.' }
                        ].map((faq, i) => (
                            <div key={i} className="bg-white p-8 border hover:border-[#B4838D] transition-colors duration-300">
                                <h5 className="font-serif text-xl mb-3 text-[#1C1C1C]">{faq.q}</h5>
                                <p className="text-[#4A4A4A] font-light leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* -----------------------------------------------------------------------
          FINAL CTA
      ----------------------------------------------------------------------- */}
            <section className="py-32 bg-white text-center">
                <div className="container max-w-2xl">
                    <h2 className="mb-8 text-[#1C1C1C]">Clear skin starts with a diagnosis.</h2>
                    <p className="text-[#4A4A4A] text-xl font-light mb-12">
                        Stop guessing with online products. Let a medical professional assess your skin and build a roadmap to recovery.
                    </p>
                    <Link href="/book-appointment">
                        <button className="btn-luxury-filled bg-[#1C1C1C] border-[#1C1C1C] text-white hover:bg-transparent hover:text-[#1C1C1C]">
                            Book My Assessment
                        </button>
                    </Link>
                </div>
            </section>

        </div>
    );
}
