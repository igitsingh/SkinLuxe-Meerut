'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, CheckCircle, Sun, Award, Shield, Star } from 'lucide-react';

export default function SkinBrighteningPage() {
    const benefits = [
        'Radiant, luminous skin',
        'Even skin tone',
        'Reduced dark spots',
        'Brighter complexion',
        'Youthful glow',
        'Improved skin texture',
        'Reduced dullness',
        'Long-lasting results',
    ];

    const treatments = [
        {
            title: 'Glutathione Therapy',
            description: 'Powerful antioxidant treatment for skin brightening and detoxification from within.',
            icon: Sparkles,
        },
        {
            title: 'Vitamin C Treatments',
            description: 'High-potency vitamin C serums and peels for radiant, glowing skin.',
            icon: Sun,
        },
        {
            title: 'Chemical Peels',
            description: 'Medical-grade peels to exfoliate and reveal brighter, fresher skin.',
            icon: Award,
        },
        {
            title: 'Laser Skin Brightening',
            description: 'Advanced laser technology to target pigmentation and enhance skin radiance.',
            icon: Star,
        },
        {
            title: 'Brightening Facials',
            description: 'Specialized facials with brightening actives for instant glow.',
            icon: Sparkles,
        },
        {
            title: 'Mesotherapy',
            description: 'Microinjections of brightening cocktails for deep skin nourishment.',
            icon: Shield,
        },
    ];

    const skinConcerns = [
        'Dull, tired skin',
        'Uneven skin tone',
        'Dark spots & patches',
        'Sun damage',
        'Post-inflammatory hyperpigmentation',
        'Lack of radiance',
    ];

    const faqs = [
        {
            question: 'How long does it take to see results?',
            answer: 'Most clients notice visible brightening within 2-4 weeks. Optimal results are typically achieved after 6-8 sessions, depending on your skin condition and treatment plan.',
        },
        {
            question: 'Is skin brightening safe?',
            answer: 'Yes! Our treatments use medical-grade, clinically-proven ingredients and technologies. We focus on safe, natural brightening without harmful bleaching agents.',
        },
        {
            question: 'Will the results be permanent?',
            answer: 'With proper maintenance and sun protection, results are long-lasting. We provide personalized aftercare plans and recommend periodic maintenance treatments.',
        },
        {
            question: 'Can I combine brightening with other treatments?',
            answer: 'Absolutely! Brightening treatments work well in combination with anti-aging, acne treatments, and other procedures. We\'ll create a comprehensive plan for you.',
        },
    ];

    return (
        <div className="bg-white">
            {/* Hero */}
            <section className="relative h-[70vh] overflow-hidden">
                <div className="absolute inset-0">
                    <Image src="/clinic-technology.jpg" alt="Skin Brightening" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#000000]/80 via-[#000000]/50 to-transparent" />
                </div>
                <div className="container relative z-10 h-full flex items-center">
                    <div className="max-w-2xl text-white">
                        <div className="flex items-center gap-2 mb-6">
                            <Sun className="w-6 h-6 text-[#E91E63]" />
                            <span className="text-sm tracking-[0.3em] uppercase text-[#E91E63] font-serif">Radiant Glow</span>
                        </div>
                        <h1 className="font-serif text-5xl lg:text-6xl mb-6">Skin Glow & Brightening</h1>
                        <p className="text-xl text-white/90 mb-8 leading-relaxed">
                            Achieve luminous, radiant skin with our advanced brightening treatments. Reveal your natural glow.
                        </p>
                        <Link href="/contact">
                            <button className="px-10 py-4 bg-[#E91E63] text-white font-serif text-lg rounded-full hover:bg-[#C2185B] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                                Start Glowing
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* What is Skin Brightening */}
            <section className="py-20 bg-gradient-to-b from-white to-[rgba(233,30,99,0.03)]">
                <div className="container">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="font-serif text-4xl lg:text-5xl text-[#000000] mb-6">What is Skin Brightening?</h2>
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                            Skin brightening is a comprehensive approach to achieving radiant, luminous skin by reducing
                            pigmentation, evening out skin tone, and enhancing your natural glow. Unlike harmful bleaching,
                            our treatments focus on safe, medical-grade solutions that work with your skin's natural processes.
                        </p>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            At SkinLuxe, we combine advanced technologies with powerful antioxidants and brightening actives
                            to give you that coveted healthy, radiant complexion.
                        </p>
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-20 bg-white">
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-4xl lg:text-5xl text-[#000000] mb-4">Benefits of Skin Brightening</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="flex items-start gap-4 bg-gradient-to-br from-white to-[rgba(233,30,99,0.03)] rounded-2xl p-6 border-2 border-[#E91E63]/20 hover:border-[#E91E63] transition-all duration-300 shadow-lg hover:shadow-xl">
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
            <section className="py-20 bg-gradient-to-b from-white to-[rgba(233,30,99,0.03)]">
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-4xl lg:text-5xl text-[#000000] mb-4">Our Brightening Treatments</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {treatments.map((treatment, index) => {
                            const Icon = treatment.icon;
                            return (
                                <div key={index} className="bg-white rounded-3xl p-8 border-2 border-[#E91E63]/20 hover:border-[#E91E63] transition-all duration-300 shadow-lg hover:shadow-xl">
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

            {/* Skin Concerns */}
            <section className="py-20 bg-white">
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-4xl lg:text-5xl text-[#000000] mb-4">Concerns We Address</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {skinConcerns.map((concern, index) => (
                            <div key={index} className="bg-gradient-to-br from-white to-[rgba(233,30,99,0.03)] rounded-2xl p-6 border-2 border-[#E91E63]/20 hover:border-[#E91E63] transition-all duration-300 shadow-lg hover:shadow-xl text-center">
                                <div className="w-14 h-14 rounded-full bg-[#E91E63]/10 flex items-center justify-center mx-auto mb-4">
                                    <Sun className="w-7 h-7 text-[#E91E63]" />
                                </div>
                                <h3 className="font-serif text-lg text-[#000000]">{concern}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section className="py-20 bg-gradient-to-b from-white to-[rgba(233,30,99,0.03)]">
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-4xl lg:text-5xl text-[#000000] mb-4">Frequently Asked Questions</h2>
                    </div>
                    <div className="max-w-4xl mx-auto space-y-6">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white rounded-2xl p-8 border-2 border-[#E91E63]/20 shadow-lg">
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
                    <Sun className="w-16 h-16 text-[#E91E63] mx-auto mb-6" />
                    <h2 className="font-serif text-4xl lg:text-5xl mb-6">Ready for Radiant Skin?</h2>
                    <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                        Discover your natural glow with our advanced brightening treatments.
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
