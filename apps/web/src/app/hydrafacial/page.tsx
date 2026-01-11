import React from 'react';
import Link from 'next/link';
import { Sparkles, Droplets, Zap, Clock, CheckCircle, Shield } from 'lucide-react';

export const metadata = {
    title: 'HydraFacial Meerut | Instant Glow & Deep Cleansing | SkinLuxe',
    description: 'Experience the original HydraFacial MD in Meerut. 3 steps to best skin of your life. Deep cleanse, extract, and hydrate for an instant glow.',
};

export default function HydraFacialPage() {
    return (
        <div className="bg-[#FFFFFF]">
            {/* -----------------------------------------------------------------------
          HERO SECTION: THE "GLASS SKIN" PROMISE
          Intent: Sell the immediate result—glowing, party-ready skin.
      ----------------------------------------------------------------------- */}
            <section className="relative min-h-[75vh] flex items-center justify-center bg-[#1C1C1C] text-white pt-32 pb-20 overflow-hidden">

                {/* Liquid/Water Effect Overlay */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/water.png')] opacity-10"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#1C1C1C]/50 via-transparent to-[#1C1C1C]"></div>

                <div className="container relative z-10 text-center max-w-5xl">
                    <span className="inline-block py-2 px-4 border border-[#B4838D] text-[#B4838D] text-xs font-serif tracking-[0.2em] uppercase mb-8 animate-fadeIn">
                        The Original HydraFacial MD®
                    </span>
                    <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6 leading-tight text-white animate-fadeIn delay-100">
                        3 Steps. 30 Minutes. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#B4838D] to-white italic">
                            The Best Skin of Your Life.
                        </span>
                    </h1>
                    <p className="text-white/70 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-12 animate-fadeIn delay-200">
                        Not just a facial—it's a high-tech skin transformation. Deeply cleanse, extract, and hydrate with super serums filled with antioxidants, peptides, and hyaluronic acid.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fadeIn delay-300">
                        <Link href="/book-appointment">
                            <button className="btn-luxury-filled bg-[#B4838D] border-[#B4838D] hover:bg-white hover:text-[#1C1C1C] hover:border-white min-w-[250px]">
                                Book Instant Glow
                            </button>
                        </Link>
                        <Link href="#process">
                            <button className="btn-luxury text-white border-white hover:bg-white hover:text-[#1C1C1C] min-w-[250px]">
                                See How It Works
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* -----------------------------------------------------------------------
          THE PROCESS: 3 STEPS
          Intent: Visualize the technology.
      ----------------------------------------------------------------------- */}
            <section id="process" className="bg-[#F9F8F6] py-24 border-b border-[#E6E2DD]">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-[#E6E2DD]">
                        {[
                            {
                                step: '01',
                                title: 'Cleanse + Peel',
                                desc: 'Uncover a new layer of skin with gentle exfoliation and relaxing resurfacing.',
                                icon: <Sparkles className="w-10 h-10 text-[#B4838D]" />
                            },
                            {
                                step: '02',
                                title: 'Extract + Hydrate',
                                desc: 'Remove debris from pores with painless suction. Nourish with intense moisturizers.',
                                icon: <Droplets className="w-10 h-10 text-[#B4838D]" />
                            },
                            {
                                step: '03',
                                title: 'Fuse + Protect',
                                desc: 'Saturate the skin’s surface with antioxidants and peptides to maximize your glow.',
                                icon: <Shield className="w-10 h-10 text-[#B4838D]" />
                            }
                        ].map((item, i) => (
                            <div key={i} className={`p-10 md:p-14 bg-white border-b lg:border-b-0 ${i !== 2 ? 'lg:border-r' : ''} border-[#E6E2DD] hover:bg-[#F9F8F6] transition-all duration-500 group relative`}>
                                <div className="absolute top-6 right-6 text-6xl font-serif text-[#F2F0EB] group-hover:text-[#E6E2DD] transition-colors">
                                    {item.step}
                                </div>
                                <div className="mb-8 relative z-10">{item.icon}</div>
                                <h3 className="font-serif text-2xl mb-4 text-[#1C1C1C] relative z-10">{item.title}</h3>
                                <p className="text-[#4A4A4A] font-light leading-relaxed relative z-10">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* -----------------------------------------------------------------------
          COMPARISON: WHY HYDRAFACIAL?
          Intent: Differentiate from cheap salon facials.
      ----------------------------------------------------------------------- */}
            <section className="bg-white py-24">
                <div className="container">
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-16 text-center">
                            <h2 className="text-[#1C1C1C] mb-6">HydraFacial vs. Traditional Facial</h2>
                            <p className="text-[#4A4A4A] text-lg font-light">
                                Stop paying for creams rubbed on your face. Invest in technology that actually changes your skin health.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Traditional */}
                            <div className="bg-[#F9F8F6] p-10 border border-[#E6E2DD]">
                                <h4 className="font-serif text-xl mb-6 text-[#1C1C1C] opacity-60">Traditional Salon Facial</h4>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <span className="text-red-400 mt-1">✕</span>
                                        <span className="text-[#4A4A4A] text-sm font-light">Manual extraction (painful & redness)</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-red-400 mt-1">✕</span>
                                        <span className="text-[#4A4A4A] text-sm font-light">Surface-level creams only</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-red-400 mt-1">✕</span>
                                        <span className="text-[#4A4A4A] text-sm font-light">Results last 1-2 days</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-red-400 mt-1">✕</span>
                                        <span className="text-[#4A4A4A] text-sm font-light">Downtime due to squeezing</span>
                                    </li>
                                </ul>
                            </div>

                            {/* HydraFacial */}
                            <div className="bg-[#1C1C1C] p-10 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#B4838D] blur-[80px] opacity-20"></div>
                                <h4 className="font-serif text-xl mb-6 text-white flex items-center gap-2">
                                    HydraFacial MD <span className="text-[#B4838D] text-xs border border-[#B4838D] px-2 py-0.5 rounded-full">Medical Grade</span>
                                </h4>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-4 h-4 text-[#B4838D] mt-1" />
                                        <span className="text-white/90 text-sm font-light">Vortex-Fusion suction (Painless)</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-4 h-4 text-[#B4838D] mt-1" />
                                        <span className="text-white/90 text-sm font-light">Deep dermal infusion of serums</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-4 h-4 text-[#B4838D] mt-1" />
                                        <span className="text-white/90 text-sm font-light">Results last 3-4 weeks</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-4 h-4 text-[#B4838D] mt-1" />
                                        <span className="text-white/90 text-sm font-light">Zero downtime - Party ready immediately</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* -----------------------------------------------------------------------
          PRICING / PACKAGES
          Intent: Transparency and upsell.
      ----------------------------------------------------------------------- */}
            <section className="bg-[#1C1C1C] text-white py-24 border-t border-white/10">
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="text-white mb-6">Choose Your Glow</h2>
                        <p className="text-white/60 font-light">From a quick refresh to the ultimate luxury experience.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

                        {/* Signature */}
                        <div className="bg-[#2A2A2A] border border-white/10 p-8 flex flex-col hover:border-[#B4838D] transition-all duration-300">
                            <div className="mb-6">
                                <h3 className="font-serif text-2xl text-white mb-2">Signature</h3>
                                <p className="text-white/50 text-xs tracking-widest uppercase">The Classic (30 Mins)</p>
                            </div>
                            <div className="flex-grow space-y-4 mb-8">
                                <p className="text-sm font-light text-white/80">
                                    Deeply cleanse, extract, and hydrate the skin through our super serums filled with antioxidants, peptides, and hyaluronic acid.
                                </p>
                                <div className="h-px bg-white/10 w-full"></div>
                                <ul className="space-y-2 text-sm text-white/70">
                                    <li>• 3-Step HydraFacial</li>
                                    <li>• Manual Extractions</li>
                                    <li>• Finishing Cream</li>
                                </ul>
                            </div>
                            <h4 className="text-2xl font-serif text-white mb-6">₹3,999</h4>
                            <Link href="/book-appointment">
                                <button className="w-full btn-luxury border-white text-white hover:bg-white hover:text-[#1C1C1C]">Book Signature</button>
                            </Link>
                        </div>

                        {/* Deluxe - RECOMMENDED */}
                        <div className="bg-[#F9F8F6] border border-[#B4838D] p-8 flex flex-col transform md:-translate-y-4 relative">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#B4838D] text-white text-[10px] uppercase tracking-widest px-4 py-1">
                                Most Popular
                            </div>
                            <div className="mb-6 mt-4">
                                <h3 className="font-serif text-2xl text-[#1C1C1C] mb-2">Deluxe</h3>
                                <p className="text-[#B4838D] text-xs tracking-widest uppercase">Corrective (45 Mins)</p>
                            </div>
                            <div className="flex-grow space-y-4 mb-8">
                                <p className="text-sm font-light text-[#4A4A4A]">
                                    All the benefits of Signature + a specific booster to target your concerns (Acne, Pigmentation, or Aging) + LED Light Therapy.
                                </p>
                                <div className="h-px bg-[#E6E2DD] w-full"></div>
                                <ul className="space-y-2 text-sm text-[#4A4A4A]">
                                    <li>• Everything in Signature</li>
                                    <li>• <strong>Custom Booster Serum</strong></li>
                                    <li>• <strong>LED Light Therapy</strong></li>
                                </ul>
                            </div>
                            <h4 className="text-3xl font-serif text-[#1C1C1C] mb-6">₹5,499</h4>
                            <Link href="/book-appointment">
                                <button className="w-full btn-luxury-filled bg-[#1C1C1C] border-[#1C1C1C] text-white hover:bg-transparent hover:text-[#1C1C1C]">Book Deluxe</button>
                            </Link>
                        </div>

                        {/* Platinum */}
                        <div className="bg-[#2A2A2A] border border-white/10 p-8 flex flex-col hover:border-[#B4838D] transition-all duration-300">
                            <div className="mb-6">
                                <h3 className="font-serif text-2xl text-white mb-2">Platinum</h3>
                                <p className="text-white/50 text-xs tracking-widest uppercase">The Ultimate (60 Mins)</p>
                            </div>
                            <div className="flex-grow space-y-4 mb-8">
                                <p className="text-sm font-light text-white/80">
                                    The ultimate experience. Begin with Lymphatic Therapy to contour, followed by the Deluxe HydraFacial methods.
                                </p>
                                <div className="h-px bg-white/10 w-full"></div>
                                <ul className="space-y-2 text-sm text-white/70">
                                    <li>• Everything in Deluxe</li>
                                    <li>• <strong>Lymphatic Drainage</strong></li>
                                    <li>• Neck & Shoulder Massage</li>
                                </ul>
                            </div>
                            <h4 className="text-2xl font-serif text-white mb-6">₹7,999</h4>
                            <Link href="/book-appointment">
                                <button className="w-full btn-luxury border-white text-white hover:bg-white hover:text-[#1C1C1C]">Book Platinum</button>
                            </Link>
                        </div>

                    </div>
                </div>
            </section>

            {/* -----------------------------------------------------------------------
          FAQ
      ----------------------------------------------------------------------- */}
            <section className="bg-[#F9F8F6] py-24">
                <div className="container max-w-3xl">
                    <h2 className="text-center mb-16 text-[#1C1C1C]">Common Questions</h2>

                    <div className="space-y-4">
                        {[
                            { q: 'Is it painful?', a: 'Not at all. The suction feels like a tiny vacuum hugging your skin. It is extremely relaxing and many clients fall asleep.' },
                            { q: 'Will I be red afterwards?', a: 'No. HydraFacial is famous for having zero downtime. You will leave with a healthy glow and can attend an event immediately.' },
                            { q: 'How often should I get one?', a: 'We recommend one treatment per month to maintain skin health and keep pores clear of congestion.' },
                            { q: 'Can men get HydraFacial?', a: 'Absolutely. It is our #1 treatment for men because it deep cleans pores and helps prevent ingrown hairs from shaving.' }
                        ].map((faq, i) => (
                            <div key={i} className="bg-white p-8 border border-[#E6E2DD] hover:border-[#B4838D] transition-colors duration-300">
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
                    <h2 className="mb-8 text-[#1C1C1C]">Ready for the best skin of your life?</h2>
                    <Link href="/book-appointment">
                        <button className="btn-luxury-filled bg-[#1C1C1C] border-[#1C1C1C] text-white hover:bg-transparent hover:text-[#1C1C1C]">
                            Book My Appointment Now
                        </button>
                    </Link>
                </div>
            </section>

        </div>
    );
}
