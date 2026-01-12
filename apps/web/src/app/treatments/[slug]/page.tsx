import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, IndianRupee, ArrowLeft, CheckCircle, Zap, Shield, Sparkles, AlertCircle, HelpCircle } from 'lucide-react';
import prisma from '@/lib/prisma';
import { treatmentContentMap, TreatmentContent } from '@/lib/treatment-content';

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

// SEO: Generate Dynamic Metadata with "Meerut" localization
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;

    const treatment = await prisma.treatment.findFirst({
        where: { slug }
    });

    if (!treatment) {
        return {
            title: 'Treatment Not Found | SkinLuxe Meerut',
        };
    }

    const smartContent = treatmentContentMap[slug];

    return {
        title: smartContent?.seoTitle || `${treatment.name} in Meerut | Best Skin Clinic | SkinLuxe Aesthetics`,
        description: smartContent?.seoDescription || `Looking for best ${treatment.name} in Meerut? SkinLuxe offers FDA-approved ${treatment.name} at affordable prices. Book a consultation with certified dermatologists in Meerut, Uttar Pradesh.`,
        keywords: [treatment.name, `${treatment.name} Meerut`, `Best Skin Clinic Meerut`, 'Dermatologist Meerut', 'Skin Care Uttar Pradesh', treatment.category || 'Skin Treatment'],
    };
}

export default async function TreatmentPage({ params }: PageProps) {
    const { slug } = await params;

    // 1. Fetch DB Data (Source of Truth for Name, Price, Image)
    const treatment = await prisma.treatment.findFirst({
        where: { slug }
    });

    if (!treatment) {
        notFound();
    }

    // 2. Fetch Smart CRO Content (Source of Truth for specific copy)
    const smartContent: TreatmentContent | undefined = treatmentContentMap[slug];

    return (
        <div className="bg-[#FFFFFF]">
            {/* -----------------------------------------------------------------------
          HERO SECTION: ARCHITECTURAL & PREMIUM (Restored Original Design)
      ----------------------------------------------------------------------- */}
            <section className="relative min-h-[60vh] lg:min-h-[70vh] flex items-center justify-center bg-[#1C1C1C] text-white pt-32 pb-20 overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#B4838D] opacity-10 blur-[120px] rounded-full pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FFFFFF] opacity-5 blur-[100px] rounded-full pointer-events-none"></div>

                <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="text-left animate-fadeIn">
                        <span className="inline-block py-2 px-4 border border-[#B4838D] text-[#B4838D] text-xs font-serif tracking-[0.2em] uppercase mb-6">
                            {treatment.category || 'Clinical Aesthetics'}
                        </span>
                        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-6 leading-[1.1] text-white">
                            {smartContent?.heroTitle || treatment.name}
                            {!smartContent?.heroTitle && <span className="block text-2xl lg:text-3xl font-light text-[#B4838D] mt-2 tracking-wide">in Meerut</span>}
                        </h1>
                        <p className="text-white/70 text-lg font-light max-w-xl leading-relaxed mb-10">
                            {smartContent?.heroSubtitle || `Experience world-class dermatological care with our advanced ${treatment.name} protocols right here in Meerut. Safe, effective, and personalized for your skin goals.`}
                        </p>
                        <Link href="/book-appointment">
                            <button className="btn-luxury-filled bg-[#B4838D] border-[#B4838D] text-white px-8 py-3 hover:bg-white hover:text-[#1C1C1C] hover:border-white min-w-[200px] transition-all uppercase tracking-widest text-xs font-medium">
                                Book Consultation
                            </button>
                        </Link>
                    </div>

                    <div className="hidden lg:flex justify-end relative animate-fadeIn delay-100">
                        <div className="relative w-[400px] h-[500px] border border-white/10 p-4">
                            {treatment.image_url ? (
                                <img src={treatment.image_url} alt={`${treatment.name} Treatment Meerut`} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                            ) : (
                                <div className="w-full h-full bg-[#2A2A2A] flex flex-col items-center justify-center text-center p-8 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]">
                                    <Clock className="w-16 h-16 text-[#B4838D] mb-4 opacity-80" />
                                    <h3 className="font-serif text-2xl text-white mb-2">Premium {treatment.name}</h3>
                                    <p className="text-white/50 text-sm">Best Technology in Meerut.</p>
                                </div>
                            )}
                            <div className="absolute -top-6 -right-6 w-24 h-24 border-t border-r border-[#B4838D] opacity-50"></div>
                            <div className="absolute -bottom-6 -left-6 w-24 h-24 border-b border-l border-[#B4838D] opacity-50"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* -----------------------------------------------------------------------
          MAIN CONTENT & DETAILS SIDEBAR
      ----------------------------------------------------------------------- */}
            <div className="container py-20 max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    <div className="lg:col-span-2">
                        <h2 className="font-serif text-3xl text-[#1C1C1C] mb-8 border-b border-[#E6E2DD] pb-4">About the Treatment</h2>
                        <div className="prose prose-lg text-[#4A4A4A] font-light leading-relaxed whitespace-pre-line">
                            {treatment.description}
                        </div>
                    </div>

                    <div>
                        <div className="sticky top-32 bg-white border border-[#E6E2DD] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] p-8">
                            <h3 className="font-serif text-xl text-[#1C1C1C] mb-6 border-b border-[#E6E2DD] pb-4">Treatment Summary</h3>
                            <div className="space-y-8 mb-8">
                                <div className="flex items-start gap-4">
                                    <Clock className="w-6 h-6 text-[#B4838D] mt-1" />
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Duration</p>
                                        <p className="text-[#1C1C1C] font-medium text-lg">{treatment.duration ? `${treatment.duration} mins` : 'Variable'}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <IndianRupee className="w-6 h-6 text-[#B4838D] mt-1" />
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Starting Price</p>
                                        <p className="text-[#1C1C1C] font-medium text-xl">Starting @ ₹{treatment.price?.toString() || 'Consultation'}</p>
                                    </div>
                                </div>
                            </div>
                            <Link href="/book-appointment">
                                <button className="w-full bg-[#1C1C1C] text-white py-4 border border-[#1C1C1C] hover:bg-white hover:text-[#1C1C1C] transition-all duration-300 uppercase tracking-widest text-xs font-bold mb-4">
                                    Book Now
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* -----------------------------------------------------------------------
          WHY CHOOSE US / BENEFITS (Smart Content or Generic)
      ----------------------------------------------------------------------- */}
            <section className="bg-[#F9F8F6] py-24 border-t border-[#E6E2DD]">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h2 className="text-[#1C1C1C] mb-6 font-serif text-3xl">Why Choose Clinical Aesthetics?</h2>
                        <p className="text-[#4A4A4A] text-lg font-light">
                            We use medical-grade, FDA-approved technology. Unlike salon treatments, our protocols penetrate deeper.
                        </p>
                    </div>
                    {smartContent?.benefits ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {smartContent.benefits.map((feature, i) => (
                                <div key={i} className="bg-white p-10 border border-[#E6E2DD] hover:border-[#B4838D] transition-all duration-500 group">
                                    <div className="mb-6 opacity-80 group-hover:scale-110 transition-transform duration-500">
                                        <CheckCircle className="w-8 h-8 text-[#B4838D]" />
                                    </div>
                                    <h4 className="font-serif text-xl mb-3 text-[#1C1C1C]">{feature.title}</h4>
                                    <p className="text-[#4A4A4A] font-light text-sm">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: 'Medically Safe', desc: 'Procedures performed by certified experts using sterile protocols.', icon: <CheckCircle className="w-8 h-8 text-[#B4838D]" /> },
                                { title: 'Personalized Care', desc: 'Customized settings for your specific skin type.', icon: <Clock className="w-8 h-8 text-[#B4838D]" /> },
                                { title: 'Lasting Results', desc: 'Aiming for long-term correction rather than temporary fixes.', icon: <IndianRupee className="w-8 h-8 text-[#B4838D]" /> }
                            ].map((feature, i) => (
                                <div key={i} className="bg-white p-10 border border-[#E6E2DD] hover:border-[#B4838D] transition-all duration-500 group">
                                    <div className="mb-6 opacity-80 group-hover:scale-110 transition-transform duration-500">{feature.icon}</div>
                                    <h4 className="font-serif text-xl mb-3 text-[#1C1C1C]">{feature.title}</h4>
                                    <p className="text-[#4A4A4A] font-light text-sm">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* -----------------------------------------------------------------------
          PRICING GRID (Specific Injection if available)
      ----------------------------------------------------------------------- */}
            {smartContent?.pricingDetails && (
                <section className="bg-white py-24 border-t border-[#E6E2DD]">
                    <div className="container">
                        <div className="mb-16">
                            <h2 className="text-[#1C1C1C] mb-4 font-serif text-3xl">Popular Packages</h2>
                            <p className="text-[#4A4A4A] font-light">Consistent sessions are key. Here are our most requested areas.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-[#E6E2DD]">
                            {smartContent.pricingDetails.map((item, i) => (
                                <div key={i} className="p-10 border-r border-b border-[#E6E2DD] hover:bg-[#F9F8F6] transition-colors duration-300 flex flex-col justify-between h-full">
                                    <div>
                                        <h3 className="font-serif text-xl mb-3 text-[#1C1C1C]">{item.area}</h3>
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
            )}

            {/* -----------------------------------------------------------------------
          COMPARISON (Smart or Generic)
      ----------------------------------------------------------------------- */}
            <section className="bg-[#1C1C1C] text-white py-24">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-white mb-6 font-serif text-3xl">{smartContent?.painPoints ? "Stop the Endless Cycle." : "Stop the Guesswork."}</h2>
                            <p className="text-white/70 text-lg font-light mb-8">
                                {smartContent?.heroSubtitle ? "Invest in your skin's future." : "Clinical treatments are an investment in deep cellular regeneration."}
                            </p>
                            <ul className="space-y-4">
                                {smartContent?.painPoints ? smartContent.painPoints.map((point, i) => (
                                    <li key={i} className="flex items-center gap-4"><CheckCircle className="w-5 h-5 text-[#B4838D]" /> <span className="text-white/90 font-light">{point.description}</span></li>
                                )) : (
                                    ['Deeper penetration.', 'Zero risk of infection/burns.', 'Medical-grade ingredients.', 'Long-term effectiveness.'].map((point, i) => (
                                        <li key={i} className="flex items-center gap-4"><CheckCircle className="w-5 h-5 text-[#B4838D]" /> <span className="text-white/90 font-light">{point}</span></li>
                                    ))
                                )}
                            </ul>
                        </div>
                        <div className="bg-[#2A2A2A] p-8 border border-white/10">
                            <h4 className="font-serif text-xl border-b border-white/10 pb-4 mb-6">{smartContent?.comparison?.title || "Effectiveness Comparison"}</h4>

                            {smartContent?.comparison ? (
                                <div className="space-y-6">
                                    <div>
                                        <div className="flex justify-between text-sm mb-2 text-white/80"><span>{smartContent.comparison.leftLabel}</span><span>{smartContent.comparison.leftValue}</span></div>
                                        <div className="h-3 w-full bg-white/10 rounded-full"><div className="h-full bg-[#B4838D]" style={{ width: `${smartContent.comparison.leftPercent}%` }}></div></div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-2 text-white/80"><span>{smartContent.comparison.rightLabel}</span><span>{smartContent.comparison.rightValue}</span></div>
                                        <div className="h-3 w-full bg-white/10 rounded-full"><div className="h-full bg-white" style={{ width: `${smartContent.comparison.rightPercent}%` }}></div></div>
                                    </div>
                                    <div className="mt-8 pt-6 border-t border-white/10 text-center">
                                        <p className="text-white font-serif text-lg">{smartContent.comparison.summary}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div>
                                        <div className="flex justify-between text-sm mb-2 text-white/80"><span>Salon / Home Care</span><span>Surface</span></div>
                                        <div className="h-3 w-full bg-white/10 rounded-full"><div className="h-full bg-[#B4838D] w-[30%]"></div></div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-2 text-white/80"><span>SkinLuxe Clinical Care</span><span>Cellular Deep</span></div>
                                        <div className="h-3 w-full bg-white/10 rounded-full"><div className="h-full bg-white w-[95%]"></div></div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </section>

            {/* -----------------------------------------------------------------------
          FAQ
      ----------------------------------------------------------------------- */}
            <section className="bg-[#F9F8F6] py-24">
                <div className="container max-w-3xl">
                    <h2 className="text-center mb-16 text-[#1C1C1C] font-serif text-3xl">Common Questions</h2>
                    <div className="space-y-4">
                        {(smartContent?.faqs || [
                            { question: 'Is there any downtime?', answer: 'Most treatments are lunch-time procedures with zero downtime.' },
                            { question: 'How many sessions?', answer: 'Varies by concern. Corrective treatments typically require 4-6 sessions.' },
                            { question: 'Is it painful?', answer: 'We prioritize comfort. Most treatments are painless or feel like mild tingling.' },
                        ]).map((faq, i) => (
                            <div key={i} className="bg-white p-8 border border-[#E6E2DD] hover:border-[#B4838D] transition-colors"><h5 className="font-serif text-xl mb-3 flex gap-2"><HelpCircle className="w-5 h-5 text-[#B4838D] shrink-0 mt-1" />{faq.question}</h5><p className="text-[#4A4A4A] font-light pl-7">{faq.answer}</p></div>
                        ))}
                    </div>
                </div>
            </section>

            {/* -----------------------------------------------------------------------
          CTA
      ----------------------------------------------------------------------- */}
            <section className="py-32 bg-white text-center border-t border-[#E6E2DD]">
                <div className="container max-w-2xl">
                    <h2 className="mb-8 text-[#1C1C1C] font-serif text-4xl">Start your journey.</h2>
                    <Link href="/book-appointment"><button className="btn-luxury-filled bg-[#1C1C1C] border-[#1C1C1C] text-white px-10 py-4 hover:bg-transparent hover:text-[#1C1C1C] transition-all uppercase tracking-widest text-xs font-bold">Book Consultation</button></Link>
                </div>
            </section>
        </div>
    );
}
