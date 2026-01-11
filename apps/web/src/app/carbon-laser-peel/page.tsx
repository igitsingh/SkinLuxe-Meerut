import React from 'react';
import Link from 'next/link';
import { Zap, Star } from 'lucide-react';

export const metadata = {
    title: 'Carbon Laser Peel | Hollywood Peel | SkinLuxe Meerut',
    description: 'The famous Hollywood Facial. Carbon laser peel for instant brightening, pore reduction, and oil control.',
};

export default function CarbonPeelPage() {
    return (
        <div className="bg-white">
            {/* HERO */}
            <section className="relative min-h-[60vh] flex items-center justify-center bg-[#000000] text-white pt-32 pb-20">
                <div className="container relative z-10 text-center max-w-4xl">
                    <span className="inline-block py-2 px-4 border border-white text-white text-xs font-serif tracking-[0.2em] uppercase mb-6">
                        Red Carpet Ready
                    </span>
                    <h1 className="font-serif text-4xl md:text-7xl mb-6 leading-tight text-white">
                        The Carbon <br /><span className="text-[#B4838D] italic">"Hollywood"</span> Peel
                    </h1>
                    <p className="text-white/70 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-10">
                        A revolutionary laser treatment that is completely painless with zero downtime.
                        It exfoliates, clears pores, and gives an instant camera-ready glow.
                    </p>
                    <Link href="/book-appointment">
                        <button className="btn-luxury-filled bg-white text-black border-white hover:bg-[#B4838D] hover:text-white hover:border-[#B4838D] min-w-[200px]">
                            Book Appointment
                        </button>
                    </Link>
                </div>
            </section>

            {/* PROCESS */}
            <section className="py-24 bg-[#F9F8F6]">
                <div className="container max-w-5xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-[#1C1C1C] mb-6">Two Steps to Radiance</h2>

                            <div className="space-y-8">
                                <div className="flex gap-6">
                                    <div className="w-12 h-12 flex-shrink-0 bg-[#1C1C1C] text-white flex items-center justify-center font-serif text-xl">1</div>
                                    <div>
                                        <h4 className="font-serif text-xl text-[#1C1C1C] mb-2">The Mask</h4>
                                        <p className="text-[#4A4A4A] font-light text-sm leading-relaxed">
                                            We apply a layer of medical-grade carbon lotion. This carbon acts as a "target" for the laser,
                                            absorbing into pores and binding to oil and dead skin cells.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="w-12 h-12 flex-shrink-0 bg-[#B4838D] text-white flex items-center justify-center font-serif text-xl">2</div>
                                    <div>
                                        <h4 className="font-serif text-xl text-[#1C1C1C] mb-2">The Laser</h4>
                                        <p className="text-[#4A4A4A] font-light text-sm leading-relaxed">
                                            A Q-Switch laser is passed over the skin. It destroys the carbon particles, taking the bound
                                            dirt, oil, and dead skin with it. You'll feel a slight warmth, but no pain.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right side box */}
                        <div className="bg-white p-10 border border-[#E6E2DD] shadow-lg">
                            <h3 className="font-serif text-2xl text-[#1C1C1C] mb-6 text-center">Benefits</h3>
                            <ul className="space-y-4">
                                {[
                                    'Instantly brightens skin tone',
                                    'Deep cleans and shrinks pores',
                                    'Reduces oil production (great for acne)',
                                    'Stimulates collagen growth',
                                    'No redness or peeling'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-[#4A4A4A]">
                                        <Star className="w-5 h-5 text-[#B4838D]" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}
