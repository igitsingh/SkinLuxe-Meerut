'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Award, CheckCircle, Zap, Shield, Star, Heart } from 'lucide-react';

export default function HairTreatmentsPage() {
    const benefits = [
        'Reduced hair fall',
        'Thicker, stronger hair',
        'Improved hair growth',
        'Healthy scalp',
        'Increased hair density',
        'Restored hair vitality',
        'Reduced dandruff',
        'Natural-looking results',
    ];

    const treatments = [
        {
            title: 'PRP Hair Therapy',
            description: 'Platelet-rich plasma injections to stimulate hair follicles and promote natural hair growth.',
            icon: Star,
        },
        {
            title: 'Hair Mesotherapy',
            description: 'Microinjections of vitamins, minerals, and growth factors directly into the scalp.',
            icon: Zap,
        },
        {
            title: 'Low-Level Laser Therapy',
            description: 'FDA-approved laser treatment to stimulate hair follicles and improve hair density.',
            icon: Award,
        },
        {
            title: 'Scalp Treatments',
            description: 'Deep cleansing and nourishing treatments for dandruff, oiliness, and scalp conditions.',
            icon: Heart,
        },
        {
            title: 'Hair Growth Serums',
            description: 'Medical-grade topical treatments with proven ingredients for hair regrowth.',
            icon: Shield,
        },
        {
            title: 'Nutritional Therapy',
            description: 'Personalized supplements and dietary guidance for optimal hair health.',
            icon: Star,
        },
    ];

    const hairConcerns = [
        'Hair loss & thinning',
        'Male/Female pattern baldness',
        'Alopecia',
        'Weak, brittle hair',
        'Dandruff & scalp issues',
        'Slow hair growth',
        'Post-pregnancy hair loss',
        'Stress-related hair fall',
    ];

    const faqs = [
        {
            question: 'How effective is PRP for hair loss?',
            answer: 'PRP therapy has shown excellent results with 60-80% of patients experiencing significant hair regrowth. Results vary based on the extent of hair loss and individual response. Most clients see visible improvement after 3-4 sessions.',
        },
        {
            question: 'How many sessions will I need?',
            answer: 'Typically, we recommend 6-8 sessions initially, spaced 2-4 weeks apart, followed by maintenance sessions every 3-6 months. Your personalized plan will be created during consultation.',
        },
        {
            question: 'Is hair treatment painful?',
            answer: 'Most treatments involve minimal discomfort. We use numbing creams for injection-based treatments like PRP and mesotherapy to ensure your comfort.',
        },
        {
            question: 'When will I see results?',
            answer: 'Initial improvements like reduced hair fall are noticed within 4-6 weeks. Visible hair regrowth typically begins after 3-4 months of consistent treatment.',
        },
    ];

    return (
        <div className="bg-white">
            {/* Hero */}
            <section className="relative h-[70vh] overflow-hidden">
                <div className="absolute inset-0">
                    <Image src="/hero-clinic.jpg" alt="Hair Treatments" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#000000]/80 via-[#000000]/50 to-transparent" />
                </div>
                <div className="container relative z-10 h-full flex items-center">
                    <div className="max-w-2xl text-white">
                        <div className="flex items-center gap-2 mb-6">
                            <Award className="w-6 h-6 text-[#E91E63]" />
                            <span className="text-sm tracking-[0.3em] uppercase text-[#E91E63] font-serif">Hair Restoration</span>
                        </div>
                        <h1 className="font-serif text-5xl lg:text-6xl mb-6">Hair & Scalp Treatments</h1>
                        <p className="text-xl text-white/90 mb-8 leading-relaxed">
                            Restore thick, healthy hair with our advanced hair loss treatments. Science-backed solutions for lasting results.
                        </p>
                        <Link href="/contact">
                            <button className="px-10 py-4 bg-[#E91E63] text-white font-serif text-lg rounded-full hover:bg-[#C2185B] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                                Restore Your Hair
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Understanding Hair Loss */}
            <section className="py-20 bg-gradient-to-b from-white to-[rgba(233,30,99,0.03)]">
                <div className="container">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="font-serif text-4xl lg:text-5xl text-[#000000] mb-6">Understanding Hair Loss</h2>
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                            Hair loss affects millions of people and can significantly impact confidence and self-esteem.
                            Whether it's genetic, hormonal, stress-related, or due to nutritional deficiencies, there are
                            effective solutions available.
                        </p>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            At SkinLuxe, we use advanced diagnostic techniques to identify the root cause of your hair loss
                            and create a personalized treatment plan that addresses your specific needs.
                        </p>
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-20 bg-white">
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-4xl lg:text-5xl text-[#000000] mb-4">Benefits of Hair Treatments</h2>
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
                        <h2 className="font-serif text-4xl lg:text-5xl text-[#000000] mb-4">Our Hair Restoration Treatments</h2>
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

            {/* Hair Concerns */}
            <section className="py-20 bg-white">
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-4xl lg:text-5xl text-[#000000] mb-4">Hair Concerns We Treat</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {hairConcerns.map((concern, index) => (
                            <div key={index} className="bg-gradient-to-br from-white to-[rgba(233,30,99,0.03)] rounded-2xl p-6 border-2 border-[#E91E63]/20 hover:border-[#E91E63] transition-all duration-300 shadow-lg hover:shadow-xl text-center">
                                <div className="w-14 h-14 rounded-full bg-[#E91E63]/10 flex items-center justify-center mx-auto mb-4">
                                    <Award className="w-7 h-7 text-[#E91E63]" />
                                </div>
                                <h3 className="font-serif text-base text-[#000000]">{concern}</h3>
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
                    <Award className="w-16 h-16 text-[#E91E63] mx-auto mb-6" />
                    <h2 className="font-serif text-4xl lg:text-5xl mb-6">Ready to Restore Your Hair?</h2>
                    <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                        Take the first step towards thicker, healthier hair. Book your consultation today.
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
