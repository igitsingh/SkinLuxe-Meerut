import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Award, Shield, Heart, CheckCircle, MapPin, Clock } from 'lucide-react';

export const metadata = {
    title: 'About SkinLuxe | Medical Aesthetic Clinic in Meerut',
    description: 'Meet Alka Yadav and the expert team at SkinLuxe. We combine medical science with luxury care to deliver safe, effective skin and hair treatments.',
};

export default function AboutPage() {
    return (
        <div className="bg-white">

            {/* -----------------------------------------------------------------------
          HERO SECTION: ARCHITECTURAL
          Intent: Establish the brand's premium positioning immediately.
      ----------------------------------------------------------------------- */}
            <section className="relative py-24 md:py-32 bg-[#1C1C1C] text-white overflow-hidden">

                {/* Abstract Background Elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#B4838D] opacity-10 blur-[120px] rounded-full pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#FFFFFF] opacity-5 blur-[80px] rounded-full pointer-events-none"></div>

                <div className="container relative z-10 text-center max-w-4xl mx-auto">
                    <span className="inline-block py-2 px-4 border border-[#B4838D] text-[#B4838D] text-xs font-serif tracking-[0.2em] uppercase mb-8">
                        Established 2019
                    </span>
                    <h1 className="font-serif text-4xl md:text-7xl leading-tight mb-8 text-white">
                        <span className="text-white">The Science of</span> <br />
                        <span className="text-white/80 italic">Refined Aesthetics</span>
                    </h1>
                    <p className="text-white/70 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-0">
                        SkinLuxe is Meerut's premier destination for advanced clinical dermatology.
                        We bridge the gap between medical rigour and luxury experience.
                    </p>
                </div>
            </section>

            {/* -----------------------------------------------------------------------
          THE FOUNDER: AUTHORITY & TRUST
          Intent: Humanize the brand with a credible expert.
      ----------------------------------------------------------------------- */}
            <section className="py-24 bg-[#F9F8F6]">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                        {/* Image Column */}
                        <div className="lg:col-span-5 relative">
                            <div className="relative aspect-[4/5] w-full bg-[#E6E2DD]">
                                {/* Founder Image Placeholder */}
                                <Image
                                    src="/founder-alka-yadav.png"
                                    alt="Alka Yadav - Founder & Cosmetologist"
                                    fill
                                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                />
                                {/* Decorative Frame */}
                                <div className="absolute -bottom-6 -right-6 w-full h-full border border-[#1C1C1C] -z-10 hidden md:block"></div>
                            </div>
                        </div>

                        {/* Text Column */}
                        <div className="lg:col-span-7 lg:pl-12 text-center md:text-left">
                            <h2 className="text-[#1C1C1C] mb-2">Alka Yadav</h2>
                            <p className="font-serif text-xl text-[#B4838D] mb-8">Chief Cosmetologist & Founder</p>

                            <div className="space-y-6 text-[#4A4A4A] font-light leading-relaxed text-lg">
                                <p>
                                    "I founded SkinLuxe with a singular vision: to bring world-class aesthetic protocols to Meerut.
                                    Too often, I saw treatments being sold as 'packages' without understanding the client's unique biology."
                                </p>
                                <p>
                                    "At SkinLuxe, we don't just treat skin; we educate our clients. Every procedure—whether it's Laser Hair Reduction
                                    or a Chemical Peel—is performed with the same medical precision you'd expect in a hospital, but in an environment
                                    that feels like a sanctuary."
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 pt-12 border-t border-[#E6E2DD]">
                                <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                                    <Award className="w-8 h-8 text-[#B4838D] flex-shrink-0" />
                                    <div>
                                        <h4 className="font-serif text-lg text-[#1C1C1C]">Certified Expert</h4>
                                        <p className="text-sm text-[#4A4A4A]">Trained in advanced laser & aesthetic medicine.</p>
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                                    <Shield className="w-8 h-8 text-[#B4838D] flex-shrink-0" />
                                    <div>
                                        <h4 className="font-serif text-lg text-[#1C1C1C]">Safety First</h4>
                                        <p className="text-sm text-[#4A4A4A]">Strict adherence to hygiene & safety protocols.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* -----------------------------------------------------------------------
          THE TEAM: TRUST & EXPERTISE
          Intent: Show the real people behind the care.
      ----------------------------------------------------------------------- */}
            <section className="py-24 bg-white border-t border-[#E6E2DD]">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                        {/* Text Column (Left) */}
                        <div className="lg:col-span-7 lg:pr-12 order-2 lg:order-1 text-center md:text-left">
                            <h2 className="text-[#1C1C1C] mb-4">Meet Your Care Team</h2>

                            <div className="space-y-6 text-[#4A4A4A] font-light leading-relaxed text-lg">
                                <p>
                                    A clinically trained team working under the supervision of SkinLuxe’s lead cosmetologist, following strict medical protocols for every procedure.
                                </p>
                                <p className="text-sm border-l-0 md:border-l-2 border-[#B4838D] pl-0 md:pl-4 italic opacity-80">
                                    Every treatment follows standardized safety guidelines and FDA-approved technologies.
                                </p>
                            </div>
                        </div>

                        {/* Image Column (Right) */}
                        <div className="lg:col-span-5 relative order-1 lg:order-2">
                            <div className="relative aspect-[4/3] w-full bg-[#E6E2DD] team-image-wrapper">
                                <div className="absolute inset-4 border border-[#B4838D]/20 z-10 pointer-events-none"></div>
                                <Image
                                    src="/team-centered.png"
                                    alt="SkinLuxe Medical Team"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* -----------------------------------------------------------------------
          OUR PHILOSOPHY: VALUES
          Intent: Differentiate from low-quality salons.
      ----------------------------------------------------------------------- */}
            <section className="py-24 bg-white">
                <div className="container max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-[#1C1C1C] mb-6">The SkinLuxe Standard</h2>
                        <p className="text-[#4A4A4A] text-lg font-light max-w-2xl mx-auto">
                            We believe in ethical aesthetics. We will never recommend a treatment you don't need.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#E6E2DD]">
                        {[
                            {
                                icon: <Shield className="w-8 h-8" />,
                                title: 'Medical Grade Technology',
                                desc: 'We invest in US-FDA approved lasers and equipment. No cheap knock-offs. Safety and results are non-negotiable.'
                            },
                            {
                                icon: <Heart className="w-8 h-8" />,
                                title: 'Patient-Centric Care',
                                desc: 'Your skin is unique. We customize every parameter of your treatment—from laser fluence to peel concentration.'
                            },
                            {
                                icon: <CheckCircle className="w-8 h-8" />,
                                title: 'Transparent Pricing',
                                desc: 'No hidden costs. No aggressive upselling. We provide a clear treatment plan and cost estimate upfront.'
                            }
                        ].map((item, i) => (
                            <div key={i} className={`p-10 text-center group hover:bg-[#F9F8F6] transition-colors duration-500 ${i !== 2 ? 'md:border-r border-[#E6E2DD]' : ''}`}>
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FAFAFA] text-[#1C1C1C] mb-6 group-hover:bg-[#1C1C1C] group-hover:text-white transition-all duration-500">
                                    {item.icon}
                                </div>
                                <h3 className="font-serif text-2xl text-[#1C1C1C] mb-4">{item.title}</h3>
                                <p className="text-[#4A4A4A] font-light leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section >

            {/* -----------------------------------------------------------------------
          LOCATION / VISIT US
          Intent: Local SEO and practical info.
      ----------------------------------------------------------------------- */}
            < section className="py-24 bg-[#1C1C1C] text-white" >
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                        <div className="space-y-8 text-center md:text-left">
                            <h2 className="text-white text-3xl font-serif">Visit Our Clinic</h2>
                            <p className="text-white/70 font-light text-lg leading-relaxed">
                                Located in the heart of Meerut, our clinic offers a private, serene environment
                                where you can relax while we take care of your skin.
                            </p>

                            <div className="space-y-6 pt-4">
                                <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                                    <MapPin className="w-6 h-6 text-[#B4838D] mt-1" />
                                    <div>
                                        <h4 className="font-serif text-lg text-white mb-1">Address</h4>
                                        <p className="text-white/60 font-light">
                                            FF, No. 38, New Market, Begum Bridge,<br />
                                            Near Titan Showroom, Sotiganj,<br />
                                            Meerut, Uttar Pradesh
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                                    <Clock className="w-6 h-6 text-[#B4838D] mt-1" />
                                    <div>
                                        <h4 className="font-serif text-lg text-white mb-1">Hours</h4>
                                        <p className="text-white/60 font-light">
                                            Mon, Tue, Thu, Fri, Sat, Sun: 10:00 AM - 7:30 PM<br />
                                            Wednesday: Closed
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 w-full">
                                <Link href="/book-appointment" className="w-full sm:w-auto block">
                                    <button className="btn-luxury-filled bg-[#B4838D] border-[#B4838D] hover:bg-white hover:text-[#1C1C1C] hover:border-white w-full sm:w-auto min-w-[200px] h-[54px] flex items-center justify-center mx-auto md:mx-0">
                                        Book a Consultation
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="w-full h-[400px] bg-[#2A2A2A] border border-white/10 relative">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3498.008821811907!2d78.0417945753696!3d29.05620497463123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390b229f00000001%3A0x1234567890abcdef!2sSkinLuxe%20Aesthetics%20%26%20Academy!5e0!3m2!1sen!2sin!4v1704988800000!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: 'grayscale(100%) invert(90%)' }}
                                allowFullScreen={false}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>

                    </div>
                </div>
            </section >

        </div >
    );
}
