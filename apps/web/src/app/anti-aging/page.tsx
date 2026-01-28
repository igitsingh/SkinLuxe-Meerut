'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, CheckCircle, Clock, Shield, Award, Sparkles } from 'lucide-react';

export default function AntiAgingPage() {
    const benefits = [
        'Reduced fine lines & wrinkles',
        'Firmer, tighter skin',
        'Improved skin elasticity',
        'Youthful, radiant glow',
        'Even skin tone & texture',
        'Natural-looking results',
        'Non-surgical solutions',
        'Long-lasting effects',
    ];

    const treatments = [
        {
            title: 'Botox & Fillers',
            description: 'FDA-approved injectables to smooth wrinkles and restore volume for a youthful appearance.',
            icon: Star,
        },
        {
            title: 'Skin Tightening',
            description: 'Advanced radiofrequency and ultrasound treatments to lift and firm sagging skin.',
            icon: Sparkles,
        },
        {
            title: 'Chemical Peels',
            description: 'Medical-grade peels to resurface skin, reduce wrinkles, and improve texture.',
            icon: Award,
        },
        {
            title: 'Microneedling with PRP',
            description: 'Collagen induction therapy combined with platelet-rich plasma for skin rejuvenation.',
            icon: Shield,
        },
        {
            title: 'Laser Resurfacing',
            description: 'Fractional laser technology to reduce wrinkles, scars, and sun damage.',
            icon: Star,
        },
        {
            title: 'Anti-Aging Facials',
            description: 'Specialized facials with active ingredients to combat signs of aging.',
            icon: Sparkles,
        },
    ];

    const concernsAddressed = [
        'Fine lines & wrinkles',
        'Sagging skin',
        'Loss of volume',
        'Age spots & sun damage',
        'Uneven skin texture',
        'Dull, tired-looking skin',
    ];

    const faqs = [
        {
            question: 'At what age should I start anti-aging treatments?',
            answer: 'Prevention is key! Many clients start in their late 20s to early 30s with preventive treatments. However, it\'s never too late to start. We customize treatments based on your age, skin condition, and goals.',
        },
        {
            question: 'Are anti-aging treatments safe?',
            answer: 'Yes! All our treatments use FDA-approved products and technologies. Our certified dermatologists ensure safe, effective procedures with minimal risk.',
        },
        {
            question: 'How long do results last?',
            answer: 'Results vary by treatment. Botox lasts 3-6 months, fillers 6-18 months, and treatments like microneedling and lasers provide long-lasting improvements with proper maintenance.',
        },
        {
            question: 'Is there any downtime?',
            answer: 'Most treatments have minimal to no downtime. Injectables may cause slight swelling for 1-2 days, while laser treatments may require 3-5 days of recovery. We\'ll discuss this during consultation.',
        },
    ];

    return (
        <div className="bg-white">
            {/* Hero */}
            <section className="relative h-[70vh] overflow-hidden">
                <div className="absolute inset-0">
                    <Image src="/hero-clinic.jpg" alt="Anti-Aging Treatment" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#000000]/80 via-[#000000]/50 to-transparent" />
                </div>
                <div className="container relative z-10 h-full flex items-center">
                    <div className="max-w-2xl text-white">
                        <div className="flex items-center gap-2 mb-6">
                            <Star className="w-6 h-6 text-[#E91E63]" />
                            <span className="text-sm tracking-[0.3em] uppercase text-[#E91E63] font-serif">Age Gracefully</span>
                        </div>
                        <h1 className="font-serif text-5xl lg:text-6xl mb-6">Anti-Aging & Rejuvenation</h1>
                        <p className="text-xl text-white/90 mb-8 leading-relaxed">
                            Turn back time with our advanced anti-aging treatments. Restore youthful radiance and confidence.
                        </p>
                        <Link href="/contact">
                            <button className="px-10 py-4 bg-[#E91E63] text-white font-serif text-lg rounded-full hover:bg-[#C2185B] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                                Book Consultation
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-20 bg-gradient-to-b from-white to-[rgba(233,30,99,0.03)]">
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-4xl lg:text-5xl text-[#000000] mb-4">Benefits of Anti-Aging Treatments</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="flex items-start gap-4 bg-white rounded-2xl p-6 border-2 border-[#E91E63]/20 hover:border-[#E91E63] transition-all duration-300 shadow-lg hover:shadow-xl">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#E91E63]/10 flex items-center justify-center">
                                    <CheckCircle className="w-5 h-5 text-[#E91E63]" />
                                </div>
                                <p className="text-gray-700 pt-2">{benefit}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Treatments */}
            <section className="py-20 bg-white">
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-4xl lg:text-5xl text-[#000000] mb-4">Our Anti-Aging Treatments</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {treatments.map((treatment, index) => {
                            const Icon = treatment.icon;
                            return (
                                <div key={index} className="bg-gradient-to-br from-white to-[rgba(233,30,99,0.03)] rounded-3xl p-8 border-2 border-[#E91E63]/20 hover:border-[#E91E63] transition-all duration-300 shadow-lg hover:shadow-xl">
                                    <div className="w-16 h-16 rounded-full bg-[#E91E63]/10 flex items-center justify-center mb-6">
                                        <Icon className="w-8 h-8 text-[#E91E63]" />
                                    </div>
                                    <h3 className="font-serif text-xl text-[#000000] mb-4">{treatment.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{treatment.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Concerns */}
            <section className="py-20 bg-gradient-to-b from-white to-[rgba(233,30,99,0.03)]">
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-4xl lg:text-5xl text-[#000000] mb-4">Concerns We Address</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {concernsAddressed.map((concern, index) => (
                            <div key={index} className="bg-white rounded-2xl p-6 border-2 border-[#E91E63]/20 hover:border-[#E91E63] transition-all duration-300 shadow-lg hover:shadow-xl text-center">
                                <div className="w-14 h-14 rounded-full bg-[#E91E63]/10 flex items-center justify-center mx-auto mb-4">
                                    <Star className="w-7 h-7 text-[#E91E63]" />
                                </div>
                                <h3 className="font-serif text-lg text-[#000000]">{concern}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section className="py-20 bg-white">
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-4xl lg:text-5xl text-[#000000] mb-4">Frequently Asked Questions</h2>
                    </div>
                    <div className="max-w-4xl mx-auto space-y-6">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-gradient-to-br from-white to-[rgba(233,30,99,0.03)] rounded-2xl p-8 border-2 border-[#E91E63]/20 shadow-lg">
                                <h3 className="font-serif text-xl text-[#000000] mb-4">{faq.question}</h3>
                                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-[#000000] text-white">
                <div className="container text-center">
                    <Star className="w-16 h-16 text-[#E91E63] mx-auto mb-6" />
                    <h2 className="font-serif text-4xl lg:text-5xl mb-6">Ready to Look Younger?</h2>
                    <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                        Discover the power of advanced anti-aging treatments. Book your consultation today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contact">
                            <button className="px-10 py-4 bg-[#E91E63] text-white font-serif text-lg rounded-full hover:bg-[#C2185B] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                                Book Consultation
                            </button>
                        </Link>
                        <a href="tel:+917451910272">
                            <button className="px-10 py-4 bg-transparent border-2 border-white text-white font-serif text-lg rounded-full hover:bg-white hover:text-[#000000] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                                Call: +91 74519 10272
                            </button>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
