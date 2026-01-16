'use client';

import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [services, setServices] = useState<string[]>(['General Inquiry']);
    const [isLoadingServices, setIsLoadingServices] = useState(true);

    useEffect(() => {
        const fetchTreatments = async () => {
            try {
                const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://skinluxe-meerut-api.onrender.com/api';
                const res = await fetch(`${API_URL}/treatments`);
                if (res.ok) {
                    const data = await res.json();
                    const treatmentNames = data.map((t: any) => t.name);
                    setServices(['General Inquiry', ...treatmentNames]);
                }
            } catch (error) {
                console.error('Failed to fetch treatments:', error);
            } finally {
                setIsLoadingServices(false);
            }
        };
        fetchTreatments();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://skinluxe-meerut-api.onrender.com/api';
            const res = await fetch(`${API_URL}/inquiries`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setIsSubmitted(true);
                setFormData({ name: '', email: '', phone: '', service: '', message: '' });
                setTimeout(() => setIsSubmitted(false), 5000);
            } else {
                alert('Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error(error);
            alert('Error submitting inquiry. Please check your connection.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const contactInfo = [
        {
            icon: MapPin,
            title: 'Visit Us',
            description: (
                <div className="flex flex-col gap-1">
                    <span>First floor, Plot No 38, New Market</span>
                    <span>Lala Lajpat Raj market, Begum Bridge</span>
                    <span>Sotiganj, Meerut, Uttar Pradesh 250001</span>
                </div>
            ),
            link: "https://www.google.com/maps/place/SkinLuxe+Aesthetics+%26+Academy/@28.993371,77.7023805,17z/data=!3m1!4b1!4m6!3m5!1s0x390c65d6274281b3:0x1dfdaa095a1907a5!8m2!3d28.9933663!4d77.7049608!16s%2Fg%2F11yn1gjxqj?entry=ttu&g_ep=EgoyMDI2MDEwNy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
        },
        {
            icon: Phone,
            title: 'Call Us',
            details: ['9318452282 / 7451910272'],
            links: ['tel:+919318452282'],
        },
        {
            icon: Mail,
            title: 'Email Us',
            details: ['skinluxemeerut@gmail.com'],
            links: ['mailto:skinluxemeerut@gmail.com'],
        },
        {
            icon: Clock,
            title: 'Working Hours',
            details: ['Mon, Tue, Thu, Fri, Sat, Sun', '10:00 AM - 7:30 PM', 'Wednesday: Closed'],
        },
    ];



    return (
        <div className="bg-white">
            {/* -----------------------------------------------------------------------
          HERO SECTION
      ----------------------------------------------------------------------- */}
            <section className="relative min-h-[50vh] flex items-center justify-center bg-[#1C1C1C] text-white pt-32 pb-20">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="container relative z-10 text-center max-w-4xl">
                    <span className="inline-block py-2 px-4 border border-[#B4838D] text-[#B4838D] text-xs font-serif tracking-[0.2em] uppercase mb-6">
                        Get In Touch
                    </span>
                    <h1 className="font-serif text-4xl md:text-7xl mb-6 leading-tight">
                        <span className="text-white">Contact</span> <span className="text-white/80 italic">SkinLuxe</span>
                    </h1>
                    <p className="text-white/70 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
                        Ready to begin your skin transformation journey? We're here to help you achieve radiant, healthy skin.
                    </p>
                </div>
            </section>

            {/* -----------------------------------------------------------------------
          CONTACT INFO GRID
      ----------------------------------------------------------------------- */}
            <section className="py-24 bg-white border-b border-[#E6E2DD]">
                <div className="container">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0 border border-[#E6E2DD]">
                        {contactInfo.map((info, index) => {
                            const Icon = info.icon;
                            return (
                                <div
                                    key={index}
                                    className="p-10 border-b md:border-b-0 md:border-r border-[#E6E2DD] last:border-r-0 hover:bg-[#F9F8F6] transition-colors group text-center md:text-left flex flex-col items-center md:items-start"
                                >
                                    <Icon className="w-8 h-8 text-[#1C1C1C] mb-6 group-hover:text-[#B4838D] transition-colors" />
                                    <h3 className="font-serif text-xl text-[#1C1C1C] mb-4">{info.title}</h3>
                                    <div className="space-y-1">
                                        {info.link ? (
                                            <a
                                                href={info.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block text-[#4A4A4A] font-light text-sm hover:text-[#B4838D] transition-colors"
                                            >
                                                {info.description}
                                            </a>
                                        ) : (
                                            info.details && info.details.map((detail, idx) => (
                                                info.links && info.links[idx] ? (
                                                    <a
                                                        key={idx}
                                                        href={info.links[idx]}
                                                        className="block text-[#4A4A4A] font-light text-sm hover:text-[#B4838D] transition-colors"
                                                    >
                                                        {detail}
                                                    </a>
                                                ) : (
                                                    <p key={idx} className="text-[#4A4A4A] font-light text-sm">{detail}</p>
                                                )
                                            ))
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* -----------------------------------------------------------------------
          FORM & MAP SECTION
      ----------------------------------------------------------------------- */}
            <section className="py-24 bg-[#F9F8F6]">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* Contact Form */}
                        <div className="text-center md:text-left">
                            <h2 className="font-serif text-3xl md:text-4xl text-[#1C1C1C] mb-6">
                                Send us an Inquiry
                            </h2>
                            <p className="text-[#4A4A4A] mb-10 font-light">
                                Have a question? Fill out the form below and we'll get back to you shortly.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-6 text-left">
                                <div>
                                    <label htmlFor="name" className="block text-xs font-bold tracking-widest text-[#1C1C1C] uppercase mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-0 py-3 bg-transparent border-b border-[#999999] text-[#1C1C1C] focus:border-[#B4838D] focus:outline-none transition-colors placeholder-[#999999]/50"
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <label htmlFor="email" className="block text-xs font-bold tracking-widest text-[#1C1C1C] uppercase mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-0 py-3 bg-transparent border-b border-[#999999] text-[#1C1C1C] focus:border-[#B4838D] focus:outline-none transition-colors placeholder-[#999999]/50"
                                            placeholder="your@email.com"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-xs font-bold tracking-widest text-[#1C1C1C] uppercase mb-2">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-0 py-3 bg-transparent border-b border-[#999999] text-[#1C1C1C] focus:border-[#B4838D] focus:outline-none transition-colors placeholder-[#999999]/50"
                                            placeholder="+91 XXXXX XXXXX"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="service" className="block text-xs font-bold tracking-widest text-[#1C1C1C] uppercase mb-2">
                                        Subject / Service *
                                    </label>
                                    <select
                                        id="service"
                                        name="service"
                                        value={formData.service}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-0 py-3 bg-transparent border-b border-[#999999] text-[#1C1C1C] focus:border-[#B4838D] focus:outline-none transition-colors"
                                    >
                                        <option value="">Select a subject</option>
                                        {services.map((service) => (
                                            <option key={service} value={service}>
                                                {service}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-xs font-bold tracking-widest text-[#1C1C1C] uppercase mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full px-0 py-3 bg-transparent border-b border-[#999999] text-[#1C1C1C] focus:border-[#B4838D] focus:outline-none transition-colors resize-none placeholder-[#999999]/50"
                                        placeholder="Tell us about your inquiry..."
                                    />
                                </div>

                                <div className="flex justify-center md:justify-start w-full">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || isSubmitted}
                                        className="btn-luxury-filled bg-[#1C1C1C] border-[#1C1C1C] text-white hover:bg-[#B4838D] hover:border-[#B4838D] px-8 py-4 text-sm tracking-widest uppercase transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 w-full sm:min-w-[200px] sm:w-auto h-[54px]"
                                    >
                                        {isSubmitted ? (
                                            <>
                                                <CheckCircle className="w-4 h-4" />
                                                Inquiry Sent!
                                            </>
                                        ) : isSubmitting ? (
                                            'Sending...'
                                        ) : (
                                            <>
                                                Send Inquiry <Send className="w-4 h-4 ml-2" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Map */}
                        <div className="text-center md:text-left">
                            <h2 className="font-serif text-3xl md:text-4xl text-[#1C1C1C] mb-6">
                                Find Us
                            </h2>
                            <p className="text-[#4A4A4A] mb-10 font-light">
                                Located in the heart of Meerut, easily accessible from all parts of the city.
                            </p>

                            <div className="h-[400px] bg-[#E6E2DD] border border-[#E6E2DD] grayscale hover:grayscale-0 transition-all duration-700">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3490.875323869269!2d77.7023805!3d28.993371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390c65d6274281b3%3A0x1dfdaa095a1907a5!2sSkinLuxe%20Aesthetics%20%26%20Academy!5e0!3m2!1sen!2sin!4v1705863248387!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>

                            <div className="mt-8 bg-white p-8 border border-[#E6E2DD]">
                                <h3 className="font-serif text-xl text-[#1C1C1C] mb-4">Directions</h3>
                                <p className="text-[#4A4A4A] font-light text-sm mb-6">
                                    We're located at First floor, Plot Number 38, New Market, Lala Lajpat Raj market, Begum Bridge, Sotiganj, Meerut. Easily accessible by car, auto, or public transport.
                                </p>
                                <Link
                                    href="https://www.google.com/maps/place/SkinLuxe+Aesthetics+%26+Academy/@28.993371,77.7023805,17z/data=!3m1!4b1!4m6!3m5!1s0x390c65d6274281b3:0x1dfdaa095a1907a5!8m2!3d28.9933663!4d77.7049608!16s%2Fg%2F11yn1gjxqj?entry=ttu&g_ep=EgoyMDI2MDEwNy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D"
                                    target="_blank"
                                    className="text-[#1C1C1C] border-b border-[#1C1C1C] pb-1 hover:text-[#B4838D] hover:border-[#B4838D] transition-colors text-sm uppercase tracking-wider"
                                >
                                    Get Directions
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
