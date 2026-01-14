import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GraduationCap, BookOpen, UserCheck, Award, CheckCircle, ArrowRight } from 'lucide-react';

export const metadata = {
    title: 'Academy | SkinLuxe Aesthetics Meerut',
    description: 'Join India\'s premier aesthetic academy. Hand-on training in clinical dermatology, lasers, and cosmetology by Dr. Alka Yadav.',
};

export default function AcademyPage() {
    const courses = [
        {
            title: 'Advanced Dermatology',
            duration: '6 Months',
            desc: 'Comprehensive training in skin anatomy, common pathologies, and medical-grade treatment protocols.',
            modules: ['Skin Anatomy & Physiology', 'Acne & Pigmentation Mgmt', 'Chemical Peels (Basic to Advanced)', 'Medical Prescriptions']
        },
        {
            title: 'Aesthetic Medicine',
            duration: '4 Months',
            desc: 'Master the art of injectables and advanced non-surgical facial rejuvenation capabilities.',
            modules: ['Botox & Fillers (Basic)', 'Thread Lifts', 'Mesotherapy', 'PRP & Vampire Facials']
        },
        {
            title: 'Laser Technology',
            duration: '3 Months',
            desc: 'Technical mastery of light-based devices for hair reduction, tattoo removal, and skin toning.',
            modules: ['Laser Physics & Safety', 'Diode Laser Hair Reduction', 'Q-Switch Laser Toning', 'CO2 Fractional Laser']
        },
        {
            title: 'Clinical Cosmetology',
            duration: '5 Months',
            desc: 'A rigorous foundation for aspiring cosmetologists covering facials, machine knowledge, and client consults.',
            modules: ['Skin Analysis', 'HydraFacial Protocols', 'Microdermabrasion', 'Client Counseling']
        }
    ];

    return (
        <div className="bg-white">

            {/* -----------------------------------------------------------------------
          HERO SECTION: ACADEMIC AUTHORITY
          Intent: Position the academy as a serious educational institution.
      ----------------------------------------------------------------------- */}
            <section className="relative py-24 md:py-32 bg-[#1C1C1C] text-white overflow-hidden">
                {/* Abstract Background */}
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#B4838D] opacity-10 blur-[100px] rounded-full pointer-events-none"></div>

                <div className="container relative z-10 text-center max-w-4xl mx-auto">
                    <span className="inline-block py-2 px-4 border border-[#B4838D] text-[#B4838D] text-xs font-serif tracking-[0.2em] uppercase mb-8">
                        Est. 2019
                    </span>
                    <h1 className="font-serif text-5xl md:text-7xl leading-tight mb-8">
                        <span className="text-white">SkinLuxe</span> <span className="text-white/70 italic">Academy</span>
                    </h1>
                    <p className="text-white/60 text-lg font-light max-w-2xl mx-auto leading-relaxed mb-10">
                        Forging the next generation of aesthetic leaders. We provide rigorous,
                        hands-on training bridging the gap between medical theory and clinical practice.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center w-full sm:w-auto">
                        <Link href="/contact" className="w-full sm:w-auto">
                            <button className="btn-luxury-filled bg-[#B4838D] border-[#B4838D] hover:bg-white hover:text-[#1C1C1C] hover:border-white w-full sm:min-w-[200px] h-[54px] flex items-center justify-center">
                                Apply Now
                            </button>
                        </Link>
                        <Link href="#courses" className="w-full sm:w-auto">
                            <button className="btn-luxury-filled !bg-white !text-[#1C1C1C] !border-white hover:!bg-transparent hover:!text-white w-full sm:min-w-[200px] h-[54px] flex items-center justify-center">
                                View Curriculum
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* -----------------------------------------------------------------------
          ABOUT THE ACADEMY
          Intent: Use the founder's credibility to sell the courses.
      ----------------------------------------------------------------------- */}
            <section className="py-24 bg-[#F9F8F6]">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        {/* Image Placeholder */}
                        <div className="relative aspect-[4/3] bg-[#E6E2DD] border border-[#B4838D]/20">
                            <div className="absolute inset-0 flex items-center justify-center text-[#B4838D]/40">
                                <GraduationCap className="w-24 h-24" />
                            </div>
                            {/* Overlay Text */}
                            <div className="absolute bottom-6 left-6 bg-white p-6 shadow-lg max-w-xs">
                                <p className="font-serif text-2xl text-[#1C1C1C] mb-1">500+</p>
                                <p className="text-xs text-[#4A4A4A] uppercase tracking-widest">Graduates Certified</p>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="text-center md:text-left">
                            <h2 className="text-[#1C1C1C] mb-6">Master the Art of<br />Clinical Aesthetics</h2>
                            <p className="text-[#4A4A4A] font-light text-lg leading-relaxed mb-8">
                                Most aesthetic courses teach you 'how' to use a machine. At SkinLuxe Academy, we teach you 'why'.
                                Under the mentorship of Alka Yadav, you will gain deep insights into skin biology, complications management,
                                and the business side of running a successful clinic.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { icon: UserCheck, title: 'Mentorship', desc: 'Direct guidance from Alka Yadav.' },
                                    { icon: BookOpen, title: 'Hands-On', desc: '80% practical training on live models.' },
                                    { icon: Award, title: 'Certification', desc: 'Industry recognized diploma upon completion.' },
                                    { icon: CheckCircle, title: 'Placement', desc: 'Job assistance in top clinics.' },
                                ].map((item, i) => (
                                    <div key={i} className="flex flex-col md:flex-row gap-4 items-center md:items-start text-center md:text-left">
                                        <item.icon className="w-6 h-6 text-[#B4838D] mt-1 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-serif text-[#1C1C1C] text-lg">{item.title}</h4>
                                            <p className="text-sm text-[#4A4A4A]">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* -----------------------------------------------------------------------
          COURSE GRID
          Intent: Clean, detailed list of offerings.
      ----------------------------------------------------------------------- */}
            <section id="courses" className="py-24 bg-white">
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="text-[#1C1C1C] mb-4">Our Curriculum</h2>
                        <p className="text-[#4A4A4A] font-light max-w-2xl mx-auto">
                            From beginner foundations to advanced masterclasses. Choose the path that fits your career goals.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {courses.map((course, idx) => (
                            <div key={idx} className="group border border-[#E6E2DD] p-8 hover:border-[#B4838D] transition-all duration-300 bg-white hover:shadow-xl">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="px-3 py-1 bg-[#F9F8F6] text-[#1C1C1C] text-xs font-serif uppercase tracking-widest">
                                        {course.duration}
                                    </div>
                                    <Award className="w-6 h-6 text-[#E6E2DD] group-hover:text-[#B4838D] transition-colors" />
                                </div>

                                <h3 className="font-serif text-3xl text-[#1C1C1C] mb-4 group-hover:text-[#B4838D] transition-colors">
                                    {course.title}
                                </h3>
                                <p className="text-[#4A4A4A] font-light leading-relaxed mb-8 border-b border-[#E6E2DD] pb-8">
                                    {course.desc}
                                </p>

                                <div>
                                    <span className="block text-xs font-bold text-[#1C1C1C] uppercase tracking-widest mb-4">
                                        Key Modules
                                    </span>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2">
                                        {course.modules.map((m, mIdx) => (
                                            <li key={mIdx} className="flex items-center gap-2 text-sm text-[#4A4A4A]">
                                                <span className="w-1.5 h-1.5 bg-[#B4838D] rounded-full"></span>
                                                {m}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mt-8 pt-6">
                                    <Link href="/contact" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#1C1C1C] font-bold group-hover:text-[#B4838D] transition-colors">
                                        Download Brochure <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* -----------------------------------------------------------------------
          CTA SECTION
          Intent: Final push for enrollment.
      ----------------------------------------------------------------------- */}
            <section className="py-24 bg-[#1C1C1C] text-white">
                <div className="container max-w-4xl text-center">
                    <h2 className="font-serif text-4xl text-white mb-6">Admissions Open for {new Date().getFullYear()}</h2>
                    <p className="text-white/60 text-lg font-light mb-10">
                        Seats are limited to ensure personalized attention. Batch size is restricted to 5 students per intake.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center w-full sm:w-auto">
                        <Link href="/contact" className="w-full sm:w-auto">
                            <button className="btn-luxury-filled bg-[#B4838D] border-[#B4838D] text-white hover:bg-white hover:text-[#1C1C1C] hover:border-white w-full sm:w-auto min-w-[200px] h-[54px] flex items-center justify-center font-serif tracking-widest text-xs uppercase">
                                Apply for Admission
                            </button>
                        </Link>
                        <a href="tel:+917451910272" className="w-full sm:w-auto">
                            <button className="btn-luxury-filled bg-transparent border border-white text-white hover:bg-white hover:text-[#1C1C1C] w-full sm:w-auto min-w-[200px] h-[54px] flex items-center justify-center font-serif tracking-widest text-xs uppercase">
                                Talk to Counselor
                            </button>
                        </a>
                    </div>
                </div>
            </section>

        </div>
    );
}
