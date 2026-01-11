import React from 'react';
import Link from 'next/link';
import { Sparkles, Droplets, ArrowRight } from 'lucide-react';

export const metadata = {
    title: 'Vampire Facial (PRP) | SkinLuxe Meerut',
    description: 'Natural skin rejuvenation using your own growth factors. PRP therapy for acne scars, hair loss, and anti-aging.',
};

export default function PrpPage() {
    return (
        <div className="bg-white">
            {/* -----------------------------------------------------------------------
          HERO SECTION
      ----------------------------------------------------------------------- */}
            <section className="relative min-h-[60vh] flex items-center justify-center bg-[#1C1C1C] text-white pt-32 pb-20">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

                <div className="container relative z-10 text-center max-w-4xl">
                    <span className="inline-block py-2 px-4 border border-[#B4838D] text-[#B4838D] text-xs font-serif tracking-[0.2em] uppercase mb-6">
                        Regenerative Medicine
                    </span>
                    <h1 className="font-serif text-4xl md:text-7xl mb-6 leading-tight">
                        The Vampire <span className="text-white/80 italic">Facial</span>
                    </h1>
                    <p className="text-white/70 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-10">
                        Harness the power of your body's own growth factors. Platelet-Rich Plasma (PRP) therapy
                        stimulates intense collagen production for natural, long-lasting rejuvenation.
                    </p>
                    <Link href="/book-appointment">
                        <button className="btn-luxury-filled bg-[#B4838D] border-[#B4838D] hover:bg-white hover:text-[#1C1C1C] hover:border-white min-w-[200px]">
                            Book Consultation
                        </button>
                    </Link>
                </div>
            </section>

            {/* -----------------------------------------------------------------------
          HOW IT WORKS
      ----------------------------------------------------------------------- */}
            <section className="py-24 bg-white">
                <div className="container max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="relative aspect-[4/5] bg-[#F9F8F6] border border-[#E6E2DD] p-8 flex items-center justify-center">
                            <div className="text-center">
                                <Droplets className="w-16 h-16 text-[#B4838D] mx-auto mb-4" />
                                <h3 className="font-serif text-2xl text-[#1C1C1C]">Liquid Gold</h3>
                                <p className="text-sm text-[#4A4A4A] mt-2">Your plasma is rich in platelets that heal and repair.</p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-[#1C1C1C] mb-6">Science, Not Magic.</h2>
                            <p className="text-[#4A4A4A] text-lg font-light leading-relaxed mb-8">
                                PRP therapy involves drawing a small amount of your blood, spinning it in a centrifuge to isolate the plasma,
                                and re-injecting it into the skin (often with microneedling).
                            </p>

                            <div className="space-y-6">
                                {[
                                    { step: '01', title: 'Draw', desc: 'We take a small sample of your blood, similar to a routine lab test.' },
                                    { step: '02', title: 'Isolate', desc: 'A centrifuge spins the blood to separate the platelet-rich plasma.' },
                                    { step: '03', title: 'Infuse', desc: 'We use microneedling or injections to deliver growth factors deep into the dermis.' }
                                ].map((s, i) => (
                                    <div key={i} className="flex gap-4 group">
                                        <span className="text-3xl font-serif text-[#E6E2DD] group-hover:text-[#B4838D] transition-colors">{s.step}</span>
                                        <div>
                                            <h4 className="font-serif text-lg text-[#1C1C1C]">{s.title}</h4>
                                            <p className="text-sm text-[#4A4A4A]">{s.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* -----------------------------------------------------------------------
          BENEFITS GRID
      ----------------------------------------------------------------------- */}
            <section className="py-24 bg-[#F9F8F6]">
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="text-[#1C1C1C] mb-4">What Can PRP Treat?</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { title: 'Acne Scars', desc: 'Accelerates tissue repair to smooth out uneven texture and pits.' },
                            { title: 'Hair Loss', desc: 'Stimulates dormant hair follicles to promote new growth and thickness.' },
                            { title: 'Fine Lines', desc: 'Boosts collagen to plump up thinning skin under eyes and neck.' }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-8 border border-[#E6E2DD] hover:border-[#B4838D] transition-all">
                                <h3 className="font-serif text-xl text-[#1C1C1C] mb-3">{item.title}</h3>
                                <p className="text-[#4A4A4A] font-light text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
