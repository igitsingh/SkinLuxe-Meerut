'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Menu, X } from 'lucide-react';
import { useSettings } from '@/contexts/SettingsContext';
import Image from 'next/image';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { settings } = useSettings();

    // Handle scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '/treatments', label: 'Treatments' },
        { href: '/academy', label: 'Academy' },
        { href: '/testimonials', label: 'Testimonials' },
        { href: '/blog', label: 'Blog' },
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E6E2DD]' : 'bg-white border-b border-transparent py-1 lg:py-2'}`}>
            <div className={`container transition-all duration-300 ${scrolled ? 'py-0' : 'py-0 lg:py-2'}`}>
                <div className="flex items-center justify-between h-14 lg:h-24">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0 relative z-50">
                        <Image
                            src="/skinluxe-logo-dark.png"
                            alt="SkinLuxe Aesthetics & Academy"
                            width={700}
                            height={234}
                            className={`w-auto object-contain transition-all duration-300 ${scrolled ? 'h-14 lg:h-16' : 'h-16 lg:h-24'}`}
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-xs tracking-[0.15em] uppercase text-[#1C1C1C] hover:text-[#B4838D] transition-colors font-serif relative group"
                            >
                                {link.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#B4838D] transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}
                    </div>

                    {/* Right Icons & CTA */}
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex items-center gap-4 border-r border-[#E6E2DD] pr-6">
                            <button className="text-[#1C1C1C] hover:text-[#B4838D] transition-colors">
                                <Search className="w-4 h-4" />
                            </button>

                        </div>

                        {/* CTA Button - CRO Focused */}
                        <Link href="/book-appointment" className="hidden lg:block">
                            <button className="bg-[#1C1C1C] text-white px-6 py-3 text-xs tracking-[0.2em] font-medium uppercase hover:bg-[#B4838D] transition-all duration-300">
                                Book Now
                            </button>
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 text-[#1C1C1C] hover:text-[#B4838D] transition-colors relative z-50"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-white z-40 transition-transform duration-500 ease-in-out lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col items-center justify-center h-full space-y-8 p-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-2xl font-serif text-[#1C1C1C] hover:text-[#B4838D] transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="w-12 h-px bg-[#E6E2DD] my-4"></div>
                    <Link
                        href="/book-appointment"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="w-full max-w-xs"
                    >
                        <button className="w-full bg-[#B4838D] text-white px-8 py-4 text-sm tracking-[0.2em] uppercase hover:bg-[#1C1C1C] transition-colors">
                            Book Appointment
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
