'use client';

import Link from 'next/link';
import { Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#F9F8F6] border-t border-[#E6E2DD] text-[#1C1C1C]">
            <div className="container py-20">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-20">

                    {/* COLUMN 1: BRAND IDENTITY */}
                    <div className="space-y-8">
                        <Link href="/" className="block">
                            <img
                                src="/skinluxe-logo.png"
                                alt="SkinLuxe Aesthetics & Academy"
                                className="h-16 w-auto object-contain opacity-90"
                            />
                        </Link>

                        <div className="space-y-2">
                            <h5 className="font-serif text-xl text-[#1C1C1C]">Alka Yadav</h5>
                            <p className="text-sm tracking-widest uppercase text-[#B4838D] font-medium">Cosmetologist</p>
                        </div>

                        <p className="text-[#4A4A4A] leading-relaxed text-sm font-light max-w-xs">
                            Advanced medical aesthetics, laser treatments, and professional cosmetology training in Meerut.
                        </p>

                        {/* Socials - Architectural Style */}
                        <div className="flex gap-4 pt-2">
                            <a
                                href="https://instagram.com/skinluxe_clinic_meerut"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 border border-[#E6E2DD] hover:border-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-white transition-all duration-300"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a
                                href="mailto:skinluxemeerut@gmail.com"
                                className="p-3 border border-[#E6E2DD] hover:border-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-white transition-all duration-300"
                                aria-label="Email"
                            >
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* COLUMN 2: QUICK LINKS (TREATMENTS) */}
                    <div>
                        <h4 className="font-serif text-lg mb-8 text-[#1C1C1C] tracking-wide">Treatments</h4>
                        <ul className="space-y-4">
                            {[
                                { label: 'Laser Hair Reduction', href: '/laser-hair-reduction' },
                                { label: 'HydraFacial', href: '/hydrafacial' },
                                { label: 'Acne & Pigmentation', href: '/acne-treatment' },
                                { label: 'Skin Lightening', href: '/skin-lightening' },
                                { label: 'Anti-Aging Therapies', href: '/anti-aging' },
                                { label: 'Chemical Peels', href: '/chemical-peels' },
                                { label: 'Party / Bride Makeup', href: '/makeup' },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-[#4A4A4A] hover:text-[#B4838D] transition-colors text-sm font-light tracking-wide flex items-center gap-2 group"
                                    >
                                        <span className="w-1.5 h-px bg-[#B4838D] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* COLUMN 3: CONTACT INFORMATION */}
                    <div>
                        <h4 className="font-serif text-lg mb-8 text-[#1C1C1C] tracking-wide">Visit Us</h4>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4 group">
                                <MapPin className="w-5 h-5 text-[#B4838D] mt-1 group-hover:text-[#1C1C1C] transition-colors" />
                                <p className="text-[#4A4A4A] text-sm leading-relaxed font-light">
                                    FF, No. 38, New Market,<br />
                                    Begum Bridge,<br />
                                    Near Titan Showroom, Sotiganj,<br />
                                    Meerut, Uttar Pradesh
                                </p>
                            </div>

                            <div className="flex items-center gap-4 group">
                                <Phone className="w-5 h-5 text-[#B4838D] group-hover:text-[#1C1C1C] transition-colors" />
                                <div className="flex flex-col gap-1">
                                    <a href="tel:9318452282" className="text-[#4A4A4A] hover:text-[#B4838D] transition-colors text-sm font-light">
                                        +91 93184 52282
                                    </a>
                                    <a href="tel:7451910272" className="text-[#4A4A4A] hover:text-[#B4838D] transition-colors text-sm font-light">
                                        +91 74519 10272
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 group">
                                <Mail className="w-5 h-5 text-[#B4838D] group-hover:text-[#1C1C1C] transition-colors" />
                                <a href="mailto:skinluxemeerut@gmail.com" className="text-[#4A4A4A] hover:text-[#B4838D] transition-colors text-sm font-light">
                                    skinluxemeerut@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* COLUMN 4: MAP EMBED */}
                    <div className="h-full min-h-[250px] w-full bg-[#E6E2DD] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1544.6042973719266!2d77.7056636585191!3d29.013589332560384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390c65c697072c8d%3A0x67175e95085447!2sBegum%20Bridge%20Rd%2C%20Begumbagh%2C%20Meerut%2C%20Uttar%20Pradesh%20250001!5e0!3m2!1sen!2sin!4v1705863248387!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>

                </div>
            </div>

            {/* BOTTOM BAR - ARCHITECTURAL */}
            <div className="border-t border-[#E6E2DD]">
                <div className="container py-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[#4A4A4A]/60 text-xs tracking-wide">
                        © {new Date().getFullYear()} SkinLuxe Aesthetics & Academy. All rights reserved.
                    </p>

                    <div className="flex gap-8 text-xs tracking-wide font-medium text-[#4A4A4A]/80">
                        <Link href="/privacy" className="hover:text-[#1C1C1C] transition-colors uppercase">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-[#1C1C1C] transition-colors uppercase">Terms of Service</Link>
                    </div>
                </div>

                {/* CREDIT */}
                <div className="py-4 text-center border-t border-[#E6E2DD]/50 bg-[#F2F0EB]">
                    <p className="text-[#4A4A4A]/40 text-[10px] tracking-[0.2em] uppercase font-light">
                        <span className="text-[#B4838D] font-normal">House of Floyds</span> Creation
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
