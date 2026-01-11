import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Zap, Shield, Sparkles, AlertCircle } from 'lucide-react';

export const metadata = {
    title: 'Laser Hair Reduction Meerut | Painless & Permanent | SkinLuxe',
    description: 'Advanced Triple-Wavelength Laser Hair Reduction in Meerut. FDA-approved technology for safe, painless, and permanent hair removal for Indian skin.',
};

export default function LaserHairReductionPage() {
    return (
        <div className="bg-[#FFFFFF]">
            {/* -----------------------------------------------------------------------
          HERO SECTION: ARCHITECTURAL & PREMIUM
          Intent: Sell the "lifestyle" of hair-free skin, not just the service.
      ----------------------------------------------------------------------- */}
            <section className="relative min-h-[70vh] flex items-center justify-center bg-[#1C1C1C] text-white pt-32 pb-20 overflow-hidden">

                {/* Abstract Light Leaks / Luxury Feel */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#B4838D] opacity-10 blur-[120px] rounded-full pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FFFFFF] opacity-5 blur-[100px] rounded-full pointer-events-none"></div>

                <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="text-left">
                        <span className="inline-block py-2 px-4 border border-[#B4838D] text-[#B4838D] text-xs font-serif tracking-[0.2em] uppercase mb-6">
                            Aesthetics Technology
                        </span>
                        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-6 leading-[1.1] text-white">
                            Experience <br />
                            <span className="text-[#B4838D]">Velvet Smooth</span> <br />
                            Freedom.
                        </h1>
                        <p className="text-white/70 text-lg font-light max-w-xl leading-relaxed mb-10">
                            Forget shaving cuts and waxing pain. Our FDA-approved Triple Wavelength Laser targets hair at the root for permanent reduction—safely and painlessly.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6">
                            <Link href="/book-appointment">
                                <button className="btn-luxury-filled bg-[#B4838D] border-[#B4838D] hover:bg-white hover:text-[#1C1C1C] hover:border-white min-w-[200px]">
                                    Book Free Trial Shot
                                </button>
                            </Link>
                            <Link href="#pricing">
                                <button className="btn-luxury text-white border-white hover:bg-white hover:text-[#1C1C1C] min-w-[200px]">
                                    View Areas & Packages
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Hero Image / Diagram placeholder */}
                    <div className="hidden lg:flex justify-end relative">
                        <div className="relative w-[400px] h-[500px] border border-white/10 p-4">
                            {/* Placeholder for Machine or Smooth Skin Visual */}
                            <div className="w-full h-full bg-[#2A2A2A] flex flex-col items-center justify-center text-center p-8 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]">
                                <Zap className="w-16 h-16 text-[#B4838D] mb-4 opacity-80" />
                                <h3 className="font-serif text-2xl text-white mb-2">Ice-Cool Technology</h3>
                                <p className="text-white/50 text-sm">Maintains -5°C for localized numbness and zero burn risk.</p>
                            </div>
                            {/* Decorative Elements */}
                            <div className="absolute -top-6 -right-6 w-24 h-24 border-t border-r border-[#B4838D] opacity-50"></div>
                            <div className="absolute -bottom-6 -left-6 w-24 h-24 border-b border-l border-[#B4838D] opacity-50"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* -----------------------------------------------------------------------
          THE TECHNOLOGY: TRUST & SAFETY
          Intent: Address safety concerns for Indian skin.
      ----------------------------------------------------------------------- */}
            <section className="bg-[#F9F8F6] py-24 border-b border-[#E6E2DD]">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h2 className="text-[#1C1C1C] mb-6">Why Our Laser is Different</h2>
                        <p className="text-[#4A4A4A] text-lg font-light">
                            We use medical-grade <strong>Triple Wavelength Diode Lasers</strong>. Unlike older IPL machines used in salons, our technology penetrates three depths simultaneously to target thick, medium, and fine hair.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: '100% Painless',
                                desc: 'Advanced Sapphire Cooling tip keeps your skin cold while the heat targets the follicle.',
                                icon: <Sparkles className="w-8 h-8 text-[#B4838D]" />
                            },
                            {
                                title: 'Safe for Indian Skin',
                                desc: 'Specific settings (808nm & 1064nm) bypass the melanin in your skin to avoid burns or pigmentation.',
                                icon: <Shield className="w-8 h-8 text-[#B4838D]" />
                            },
                            {
                                title: 'Faster Sessions',
                                desc: 'In-motion technology allows us to treat a Full Body in just 60-90 minutes.',
                                icon: <Zap className="w-8 h-8 text-[#B4838D]" />
                            }
                        ].map((feature, i) => (
                            <div key={i} className="bg-white p-10 border border-[#E6E2DD] hover:border-[#B4838D] transition-all duration-500 group">
                                <div className="mb-6 opacity-80 group-hover:scale-110 transition-transform duration-500">{feature.icon}</div>
                                <h4 className="font-serif text-xl mb-3 text-[#1C1C1C]">{feature.title}</h4>
                                <p className="text-[#4A4A4A] font-light leading-relaxed text-sm">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* -----------------------------------------------------------------------
          TREATMENT AREAS & PRICING
          Intent: Clear menu of services.
      ----------------------------------------------------------------------- */}
            <section id="pricing" className="bg-white py-24">
                <div className="container">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                        <div className="max-w-xl">
                            <h2 className="text-[#1C1C1C] mb-4">Popular Packages</h2>
                            <p className="text-[#4A4A4A] font-light">
                                Consistent sessions are key. Hair grows in cycles, so we recommend 6-8 sessions for 90% permanent reduction.
                            </p>
                        </div>
                        <Link href="/book-appointment">
                            <button className="text-[#B4838D] border-b border-[#B4838D] pb-1 hover:text-[#1C1C1C] hover:border-[#1C1C1C] transition-all uppercase tracking-widest text-xs font-medium">
                                Download Full Price List
                            </button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-[#E6E2DD]">
                        {[
                            { area: 'Face & Neck', detail: 'Includes upper lip, chin, sidelocks, and neck definition.', price: 'Starting @ ₹2,999' },
                            { area: 'Underarms', detail: 'Quick 15-min session. Reduce sweat/odor and dark shadows.', price: 'Starting @ ₹1,499' },
                            { area: 'Arms & Legs', detail: 'Full arms and full legs. Get ready for any outfit, anytime.', price: 'Starting @ ₹6,999' },
                            { area: 'Full Body', detail: 'Complete head-to-toe freedom. Our bestseller.', price: 'Best Value Package' },
                            { area: 'Bikini / Brazilian', detail: 'Safe, hygienic, and extremely private. Female technicians only.', price: 'Consult for Price' },
                            { area: 'Men’s Beard Shaping', detail: 'Define your beard line and remove cheek hair.', price: 'Starting @ ₹1,999' },
                            { area: 'Chest & Back', detail: 'Popular for men. Reduce density and prevent ingrown hairs.', price: 'Starting @ ₹4,999' },
                            { area: 'Custom Package', detail: 'Choose specific areas tailored to your needs.', price: 'Personalized Quote' },
                        ].map((item, i) => (
                            <div key={i} className="p-10 border-r border-b border-[#E6E2DD] hover:bg-[#F9F8F6] transition-colors duration-300 flex flex-col justify-between h-full">
                                <div>
                                    <h3 className="font-serif text-2xl mb-3 text-[#1C1C1C]">{item.area}</h3>
                                    <p className="text-[#4A4A4A] text-sm font-light mb-6 leading-relaxed opacity-80">{item.detail}</p>
                                </div>
                                <div className="pt-6 border-t border-[#E6E2DD]/50">
                                    <p className="text-[#B4838D] font-medium text-sm tracking-wide">{item.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* -----------------------------------------------------------------------
          COMPARISON
          Intent: CRO - why switch from waxing?
      ----------------------------------------------------------------------- */}
            <section className="bg-[#1C1C1C] text-white py-24">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <div>
                            <h2 className="text-white mb-6">Stop the Endless Cycle.</h2>
                            <p className="text-white/70 text-lg font-light leading-relaxed mb-8">
                                Waxing and shaving are temporary fixes that often cause more harm than good—ingrown hairs, strawberry skin, and darkening. Laser is an investment in your skin's future.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    'No more ingrown hairs or painful bumps.',
                                    'Skin texture becomes smoother and brighter.',
                                    'Save 100+ hours of your life not shaving.',
                                    'Long-term cost is cheaper than monthly waxing.'
                                ].map((point, i) => (
                                    <li key={i} className="flex items-center gap-4">
                                        <CheckCircle className="w-5 h-5 text-[#B4838D]" />
                                        <span className="text-white/90 font-light">{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Visual Comparison Chart */}
                        <div className="bg-[#2A2A2A] p-8 border border-white/10">
                            <h4 className="font-serif text-xl border-b border-white/10 pb-4 mb-6">Lifetime Cost Comparison</h4>
                            <div className="space-y-6">
                                {/* Waxing Bar */}
                                <div>
                                    <div className="flex justify-between text-sm mb-2 text-white/80">
                                        <span>Waxing (Lifetime)</span>
                                        <span>₹3,50,000+</span>
                                    </div>
                                    <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-[#B4838D] w-[90%]"></div>
                                    </div>
                                    <p className="text-[10px] text-white/40 mt-1">Based on monthly waxing for 20 years</p>
                                </div>

                                {/* Laser Bar */}
                                <div>
                                    <div className="flex justify-between text-sm mb-2 text-white/80">
                                        <span>Laser (6-8 Sessions)</span>
                                        <span>₹40,000 - ₹60,000</span>
                                    </div>
                                    <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-white w-[25%]"></div>
                                    </div>
                                    <p className="text-[10px] text-white/40 mt-1">One-time investment + yearly touchup</p>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/10 text-center">
                                <p className="text-white font-serif text-lg">Save over <span className="text-[#B4838D]">₹3 Lakhs</span> in your lifetime.</p>
                            </div>
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
                            { q: 'Is it really painless?', a: 'Yes. Our diode laser has an integrated cooling tip that keeps the skin surface at -5°C. You might feel a slight prickling sensation in sensitive areas, but it is not painful like waxing.' },
                            { q: 'How many sessions do I need?', a: 'Hair growth happens in cycles (Anagen, Catagen, Telogen). Laser only kills hair in the active growth phase. To catch all hairs in this phase, 6-8 sessions are required.' },
                            { q: 'Is it safe for face?', a: 'Absolutely. It is the best treatment for facial hair as it eliminates the root cause without stimulating thicker growth (unlike shaving/threading).' },
                            { q: 'Can I shave between sessions?', a: 'Yes! Shaving is permitted and recommended. However, you must NOT wax, pluck, or thread as the laser needs the hair root to be present to work.' }
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
                    <h2 className="mb-8 text-[#1C1C1C]">Start your journey to velvet skin.</h2>
                    <p className="text-[#4A4A4A] text-xl font-light mb-12">
                        Try a free patch test on a small area to experience the painless technology yourself.
                    </p>
                    <Link href="/book-appointment">
                        <button className="btn-luxury-filled bg-[#1C1C1C] border-[#1C1C1C] text-white hover:bg-transparent hover:text-[#1C1C1C]">
                            Book Free Trial Shot
                        </button>
                    </Link>
                </div>
            </section>

        </div>
    );
}
