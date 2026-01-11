import React from 'react';
import Link from 'next/link';
import { Droplets, Sparkles } from 'lucide-react';

export const metadata = {
    title: 'Skin Boosters & Profhilo | SkinLuxe Meerut',
    description: 'Deep hydration treatments using hyaluronic acid micro-injections. Achieve the glass skin look with Profhilo and Restylane Vital.',
};

export default function SkinBoostersPage() {
    return (
        <div className="bg-white">
            {/* HERO */}
            <section className="relative min-h-[60vh] flex items-center justify-center bg-[#1C1C1C] text-white pt-32 pb-20 overflow-hidden">
                {/* Abstract water/glow effect */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#B4838D] rounded-full blur-[150px] opacity-10"></div>

                <div className="container relative z-10 text-center max-w-4xl">
                    <span className="inline-block py-2 px-4 border border-[#B4838D] text-[#B4838D] text-xs font-serif tracking-[0.2em] uppercase mb-6">
                        Injectable Skincare
                    </span>
                    <h1 className="font-serif text-4xl md:text-7xl mb-6 leading-tight">
                        The Ultimate <br /><span className="italic text-white/50">Hydration</span>
                    </h1>
                    <p className="text-white/70 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-10">
                        Also known as the "Glass Skin" treatment. Skin boosters deliver micro-droplets of hyaluronic acid
                        deep into the dermis for glow that makeup can't mimic.
                    </p>
                    <Link href="/book-appointment">
                        <button className="btn-luxury-filled bg-[#B4838D] border-[#B4838D] text-white hover:bg-white hover:text-[#1C1C1C] hover:border-white min-w-[200px]">
                            Get The Glow
                        </button>
                    </Link>
                </div>
            </section>

            {/* PROFHILO SPOTLIGHT */}
            <section className="py-24 bg-white">
                <div className="container max-w-4xl text-center">
                    <h2 className="text-[#1C1C1C] mb-6">Introducing Profhilo®</h2>
                    <p className="text-[#4A4A4A] text-lg font-light leading-relaxed mb-12">
                        Not a filler, not a toxin. Profhilo is a bio-remodeling treatment that contains one of the highest
                        concentrations of Hyaluronic Acid on the market. It treats skin laxity and boosts hydration from within.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-[#E6E2DD]">
                        <div className="p-10 border-b md:border-b-0 md:border-r border-[#E6E2DD]">
                            <h3 className="font-serif text-3xl text-[#1C1C1C] mb-2">5 Points</h3>
                            <p className="text-sm text-[#4A4A4A]">Injected into only 5 specific points per side of face.</p>
                        </div>
                        <div className="p-10">
                            <h3 className="font-serif text-3xl text-[#1C1C1C] mb-2">2 Sessions</h3>
                            <p className="text-sm text-[#4A4A4A]">Ideally spaced 4 weeks apart for maximum results.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* BENEFITS */}
            <section className="py-24 bg-[#1C1C1C] text-white">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 border border-white/10 hover:bg-white/5 transition-colors">
                            <Droplets className="w-8 h-8 text-[#B4838D] mb-4" />
                            <h3 className="font-serif text-xl mb-4">Deep Hydration</h3>
                            <p className="text-white/60 font-light text-sm">Treats crepey skin and fine lines by attracting water molecules.</p>
                        </div>
                        <div className="p-6 border border-white/10 hover:bg-white/5 transition-colors">
                            <Sparkles className="w-8 h-8 text-[#B4838D] mb-4" />
                            <h3 className="font-serif text-xl mb-4">Elasticity Boost</h3>
                            <p className="text-white/60 font-light text-sm">Stimulates 4 types of collagen and elastin for firmer skin.</p>
                        </div>
                        <div className="p-6 border border-white/10 hover:bg-white/5 transition-colors">
                            <Sparkles className="w-8 h-8 text-[#B4838D] mb-4" />
                            <h3 className="font-serif text-xl mb-4">Natural Glow</h3>
                            <p className="text-white/60 font-light text-sm">Results look completely natural, just fresher and more radiant.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
