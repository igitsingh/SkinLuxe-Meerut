import React from 'react';
import Link from 'next/link';
import { Clock, Calendar, Sparkles } from 'lucide-react';

export const metadata = {
    title: 'HIFU Skin Tightening | SkinLuxe Meerut',
    description: 'Non-surgical facelift using High-Intensity Focused Ultrasound (HIFU). Lift, tighten, and contour your face with zero downtime.',
};

export default function HifuPage() {
    return (
        <div className="bg-white">
            <section className="relative min-h-[60vh] flex items-center justify-center bg-[#1C1C1C] text-white pt-32 pb-20">
                <div className="container relative z-10 text-center max-w-4xl">
                    <span className="inline-block py-2 px-4 border border-[#B4838D] text-[#B4838D] text-xs font-serif tracking-[0.2em] uppercase mb-6">
                        Non-Surgical Facelift
                    </span>
                    <h1 className="font-serif text-4xl md:text-7xl mb-6 leading-tight">
                        Lift Without <span className="text-white/80 italic">Surgery</span>
                    </h1>
                    <p className="text-white/70 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-10">
                        High-Intensity Focused Ultrasound (HIFU) targets the deep structural layers of the skin
                        to stimulate collagen production, resulting in a firmer, more lifted appearance.
                    </p>
                    <Link href="/book-appointment">
                        <button className="btn-luxury-filled bg-[#B4838D] border-[#B4838D] hover:bg-white hover:text-[#1C1C1C] hover:border-white min-w-[200px]">
                            Book Consultation
                        </button>
                    </Link>
                </div>
            </section>

            <section className="py-24 bg-[#F9F8F6]">
                <div className="container text-center max-w-4xl">
                    <h2 className="text-[#1C1C1C] mb-12">What is HIFU?</h2>
                    <p className="text-[#4A4A4A] text-lg font-light leading-relaxed mb-12">
                        Often called a "lunchtime facelift," HIFU uses ultrasound energy to heat deep tissues (SMAS layer),
                        triggering a natural regenerative response. Over 3-6 months, your body produces fresh collagen,
                        lifting sagging skin on the neck, chin, and brow.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 border border-[#E6E2DD]">
                            <Clock className="w-10 h-10 text-[#B4838D] mb-4" />
                            <h3 className="font-serif text-xl text-[#1C1C1C] mb-2">Zero Downtime</h3>
                            <p className="text-sm text-[#4A4A4A]">Return to work immediately after.</p>
                        </div>
                        <div className="bg-white p-8 border border-[#E6E2DD]">
                            <Calendar className="w-10 h-10 text-[#B4838D] mb-4" />
                            <h3 className="font-serif text-xl text-[#1C1C1C] mb-2">Long Lasting</h3>
                            <p className="text-sm text-[#4A4A4A]">Results typically last 12-18 months.</p>
                        </div>
                        <div className="bg-white p-8 border border-[#E6E2DD]">
                            <Sparkles className="w-10 h-10 text-[#B4838D] mb-4" />
                            <h3 className="font-serif text-xl text-[#1C1C1C] mb-2">Natural Lift</h3>
                            <p className="text-sm text-[#4A4A4A]">No frozen look. Just a tighter version of you.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
