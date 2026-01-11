import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ArrowRight, Shield, CheckCircle, Clock, MapPin, Phone } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-[#FFFFFF]">

      {/* -----------------------------------------------------------------------
          HERO SECTION: THE STATEMENT PIECE
          Intent: Establish authority and luxury immediately.
      ----------------------------------------------------------------------- */}
      <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">

        {/* Background Image - Desktop */}
        <div className="absolute inset-0 hidden lg:block">
          <Image
            src="/hero-desktop-v2.png"
            alt="SkinLuxe Clinic Interior"
            fill
            className="object-cover object-center"
            priority
            quality={100}
          />
        </div>

        {/* Background Image - Mobile */}
        <div className="absolute inset-0 lg:hidden">
          <Image
            src="/hero-mobile-v2.png"
            alt="SkinLuxe Clinic Interior"
            fill
            className="object-cover object-center"
            priority
            quality={100}
          />
        </div>

        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1C1C1C]/90 via-[#1C1C1C]/60 to-transparent z-10"></div>

        <div className="container relative z-20 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <span className="inline-block py-2 px-4 border border-white/30 text-white/80 text-xs font-serif tracking-[0.2em] uppercase mb-8 backdrop-blur-sm">
              Meerut's Premier Aesthetic Clinic
            </span>
            <h1 className="font-serif text-5xl md:text-7xl leading-[1.1] mb-8">
              Medical Precision <br />
              <span className="italic font-light text-[#E6E2DD]">Meets</span> Luxury.
            </h1>
            <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed mb-12 max-w-lg">
              Advanced dermatology and cosmetology treatments curated for Indian skin. Experience the perfect balance of science and art.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="/book-appointment">
                <button className="btn-luxury-filled bg-white text-[#1C1C1C] border-white hover:bg-transparent hover:text-white min-w-[200px]">
                  Book Consultation
                </button>
              </Link>
              <Link href="/treatments">
                <button className="btn-luxury text-white border-white hover:bg-white hover:text-[#1C1C1C] min-w-[200px]">
                  Explore Treatments
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* -----------------------------------------------------------------------
          PHILOSOPHY: THE FOUNDER
          Intent: Build trust with a human face (Alka Yadav).
      ----------------------------------------------------------------------- */}
      <section className="py-24 bg-[#F9F8F6]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image Placeholder - To be replaced by Founder Image later */}
            <div className="relative aspect-[4/5] bg-[#E6E2DD]">
              <div className="absolute inset-4 border border-[#B4838D]/20 z-10"></div>
              <Image
                src="/founder-alka-yadav.png"
                alt="Alka Yadav - Cosmetologist"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>

            <div className="space-y-8">
              <h2 className="text-[#1C1C1C]">Expertise You Can Trust.</h2>
              <h4 className="font-serif text-xl text-[#B4838D]">Alka Yadav — Chief Cosmetologist</h4>
              <p className="text-[#4A4A4A] text-lg font-light leading-relaxed">
                "At SkinLuxe, we believe that true beauty lies in skin health. We don't just treat symptoms; we analyze your unique biology to create lasting changes. Every procedure is performed using US-FDA approved technology with strict safety protocols."
              </p>

              <div className="grid grid-cols-2 gap-8 pt-4">
                <div>
                  <h5 className="font-serif text-3xl text-[#1C1C1C] mb-1">5k+</h5>
                  <p className="text-xs tracking-widest uppercase text-[#4A4A4A]">Happy Clients</p>
                </div>
                <div>
                  <h5 className="font-serif text-3xl text-[#1C1C1C] mb-1">7+</h5>
                  <p className="text-xs tracking-widest uppercase text-[#4A4A4A]">Years Experience</p>
                </div>
              </div>

              <div className="pt-8">
                <Link href="/about" className="inline-flex items-center gap-2 text-[#1C1C1C] border-b border-[#1C1C1C] pb-1 hover:text-[#B4838D] hover:border-[#B4838D] transition-all uppercase tracking-widest text-xs font-medium">
                  Read Full Bio <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -----------------------------------------------------------------------
          FEATURED TREATMENTS
          Intent: Direct traffic to high-value pages.
      ----------------------------------------------------------------------- */}
      <section className="py-32 bg-white">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <span className="text-[#B4838D] text-xs font-serif tracking-widest uppercase mb-4 block">Medical Grade Care</span>
              <h2 className="text-[#1C1C1C]">Signature Treatments</h2>
            </div>
            <Link href="/treatments">
              <button className="btn-luxury border-[#1C1C1C] text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-white">
                View All Services
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-[#E6E2DD]">

            {/* Card 1: Laser */}
            <div className="group p-10 border-r border-b border-[#E6E2DD] hover:bg-[#F9F8F6] transition-colors duration-500">
              <span className="text-[#B4838D] text-xs font-bold tracking-widest uppercase mb-4 block opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                Painless Technology
              </span>
              <h3 className="font-serif text-3xl text-[#1C1C1C] mb-6">Laser Hair Reduction</h3>
              <p className="text-[#4A4A4A] font-light mb-8 leading-relaxed line-clamp-3">
                Experience freedom from specialized shaving and waxing. Our triple-wavelength diode laser offers permanent reduction suitable for all Indian skin types.
              </p>
              <Link href="/laser-hair-reduction" className="inline-flex items-center gap-2 text-[#1C1C1C] group-hover:gap-4 transition-all uppercase tracking-widest text-xs font-medium">
                Check Pricing <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 2: HydraFacial */}
            <div className="group p-10 border-r border-b border-[#E6E2DD] hover:bg-[#F9F8F6] transition-colors duration-500">
              <span className="text-[#B4838D] text-xs font-bold tracking-widest uppercase mb-4 block opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                Instant Glow
              </span>
              <h3 className="font-serif text-3xl text-[#1C1C1C] mb-6">HydraFacial MD®</h3>
              <p className="text-[#4A4A4A] font-light mb-8 leading-relaxed line-clamp-3">
                The original 3-step treatment: Cleanse, Extract, and Hydrate. Get glass-like skin in just 30 minutes with zero downtime.
              </p>
              <Link href="/hydrafacial" className="inline-flex items-center gap-2 text-[#1C1C1C] group-hover:gap-4 transition-all uppercase tracking-widest text-xs font-medium">
                See Steps <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 3: Acne */}
            <div className="group p-10 border-r border-b border-[#E6E2DD] hover:bg-[#F9F8F6] transition-colors duration-500">
              <span className="text-[#B4838D] text-xs font-bold tracking-widest uppercase mb-4 block opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                Clinical Defense
              </span>
              <h3 className="font-serif text-3xl text-[#1C1C1C] mb-6">Acne & Scars</h3>
              <p className="text-[#4A4A4A] font-light mb-8 leading-relaxed line-clamp-3">
                A medical protocol to control active acne and remodel deep scars using Chemical Peels, MNRF, and CO2 Laser technology.
              </p>
              <Link href="/acne-treatment" className="inline-flex items-center gap-2 text-[#1C1C1C] group-hover:gap-4 transition-all uppercase tracking-widest text-xs font-medium">
                View Protocol <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* -----------------------------------------------------------------------
          WHY US / VALUES
          Intent: Reiterate safety and premium nature.
      ----------------------------------------------------------------------- */}
      <section className="py-24 bg-[#1C1C1C] text-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 border-t border-white/10 pt-12">
            {[
              { title: 'Medical Grade', desc: 'All treatments are supervised by certified cosmetologists.', icon: <Shield className="w-8 h-8 text-[#B4838D] mb-4" /> },
              { title: 'FDA Approved', desc: 'We only use US-FDA approved lasers and equipment.', icon: <CheckCircle className="w-8 h-8 text-[#B4838D] mb-4" /> },
              { title: 'Zero Downtime', desc: 'Protocols designed for immediate return to social life.', icon: <Clock className="w-8 h-8 text-[#B4838D] mb-4" /> },
              { title: 'Prime Location', desc: 'Located in the heart of Meerut at Begum Bridge.', icon: <MapPin className="w-8 h-8 text-[#B4838D] mb-4" /> },
            ].map((item, i) => (
              <div key={i} className="group">
                {item.icon}
                <h4 className="font-serif text-xl mb-3">{item.title}</h4>
                <p className="text-white/60 font-light text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -----------------------------------------------------------------------
          FINAL CTA
      ----------------------------------------------------------------------- */}
      <section className="relative py-32 bg-[#F9F8F6] text-center overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-64 h-64 border-r border-b border-[#E6E2DD]"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 border-l border-t border-[#E6E2DD]"></div>

        <div className="container relative z-10 max-w-3xl">
          <h2 className="text-[#1C1C1C] mb-8">Begin Your Transformation</h2>
          <p className="text-[#4A4A4A] text-xl font-light mb-12">
            Don't guess with your skin. Visit SkinLuxe for a professional assessment and tailored treatment plan.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/book-appointment">
              <button className="btn-luxury-filled bg-[#1C1C1C] border-[#1C1C1C] text-white hover:bg-transparent hover:text-[#1C1C1C] min-w-[200px]">
                Book Appointment
              </button>
            </Link>
            <a href="tel:9318452282">
              <button className="btn-luxury border-[#1C1C1C] text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-white min-w-[200px] flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" /> Call Clinic
              </button>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
