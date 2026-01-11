import React from 'react';
import Link from 'next/link';
import { Target, Sun, Eraser } from 'lucide-react';

export const metadata = {
    title: 'Q-Switch Laser | Pigmentation Removal | SkinLuxe Meerut',
    description: 'Advanced laser technology for pigmentation, tattoo removal, and skin toning. Safe and effective.',
};

export default function QSwitchPage() {
    return (
        <div className="bg-white">
            {/* HERO */}
            <section className="relative min-h-[60vh] flex items-center justify-center bg-[#1C1C1C] text-white pt-32 pb-20">
                <div className="container relative z-10 text-center max-w-4xl">
                    <span className="inline-block py-2 px-4 border border-[#ADD8E6] text-[#ADD8E6] text-xs font-serif tracking-[0.2em] uppercase mb-6">
                        Advanced Laser
                    </span>
                    <h1 className="font-serif text-4xl md:text-7xl mb-6 leading-tight">
                        Clear Skin. <br /><span className="text-[#ffffff]/80 italic">Flawless Tone.</span>
                    </h1>
                    <p className="text-white/70 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-10">
                        The Gold Standard for treating pigmentation, dark spots, and tattoos.
                        Q-Switch laser technology breaks down pigment without damaging the surrounding skin.
                    </p>
                    <Link href="/book-appointment">
                        <button className="btn-luxury-filled bg-white text-[#2A2A2A] border-white hover:bg-transparent hover:text-white">
                            Consult Expert
                        </button>
                    </Link>
                </div>
            </section>

            {/* APPLICATIONS */}
            <section className="py-24 bg-white">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <div className="p-8 group hover:bg-[#F9F8F6] transition-colors">
                            <Sun className="w-12 h-12 mx-auto mb-6 text-[#1C1C1C] group-hover:text-[#B4838D] transition-colors" />
                            <h3 className="font-serif text-2xl text-[#1C1C1C] mb-4">Pigmentation</h3>
                            <p className="text-[#4A4A4A] font-light text-sm">
                                Effective for melasma, sun spots, freckles, and age spots.
                            </p>
                        </div>
                        <div className="p-8 group hover:bg-[#F9F8F6] transition-colors">
                            <Eraser className="w-12 h-12 mx-auto mb-6 text-[#1C1C1C] group-hover:text-[#B4838D] transition-colors" />
                            <h3 className="font-serif text-2xl text-[#1C1C1C] mb-4">Tattoo Removal</h3>
                            <p className="text-[#4A4A4A] font-light text-sm">
                                Breaks down tattoo ink particles for the body to naturally eliminate.
                            </p>
                        </div>
                        <div className="p-8 group hover:bg-[#F9F8F6] transition-colors">
                            <Target className="w-12 h-12 mx-auto mb-6 text-[#1C1C1C] group-hover:text-[#B4838D] transition-colors" />
                            <h3 className="font-serif text-2xl text-[#1C1C1C] mb-4">Laser Toning</h3>
                            <p className="text-[#4A4A4A] font-light text-sm">
                                Improves overall skin tone and texture, often called the "Angel Peel".
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ SECTION */}
            <section className="py-24 bg-[#F9F8F6]">
                <div className="container max-w-4xl">
                    <h2 className="text-[#1C1C1C] mb-12 text-center">Common Questions</h2>

                    <div className="space-y-6">
                        <div className="bg-white p-8 border border-[#E6E2DD]">
                            <h4 className="font-serif text-lg text-[#1C1C1C] mb-2">Does it hurt?</h4>
                            <p className="text-sm text-[#4A4A4A]">Most patients describe the sensation as a small rubber band snapping against the skin. We use numbing cream for comfort.</p>
                        </div>
                        <div className="bg-white p-8 border border-[#E6E2DD]">
                            <h4 className="font-serif text-lg text-[#1C1C1C] mb-2">How many sessions do I need?</h4>
                            <p className="text-sm text-[#4A4A4A]">For toning, 4-6 sessions. For tattoo removal, it varies widely (6-10+) depending on ink depth and color.</p>
                        </div>
                        <div className="bg-white p-8 border border-[#E6E2DD]">
                            <h4 className="font-serif text-lg text-[#1C1C1C] mb-2">Is there downtime?</h4>
                            <p className="text-sm text-[#4A4A4A]">Minimal. You may have some redness for a few hours. For tattoo removal, scabbing is possible.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
