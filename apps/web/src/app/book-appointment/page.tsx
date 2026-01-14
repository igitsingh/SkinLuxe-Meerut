'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Calendar, MessageCircle, CheckCircle, Clock, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

export default function BookAppointmentPage() {
    const [selectedTreatment, setSelectedTreatment] = useState('');
    const [selectedDateTime, setSelectedDateTime] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [notes, setNotes] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [activeMobileDate, setActiveMobileDate] = useState('');

    // Treatment options - Service Menu
    interface ServiceOption {
        id: string;
        name: string;
        icon: string;
        desc: string;
    }

    const [treatments, setTreatments] = useState<ServiceOption[]>([
        { id: 'consult', name: 'General Consultation', icon: '🩺', desc: 'Skin analysis' }
    ]);
    const [isLoadingTreatments, setIsLoadingTreatments] = useState(true);

    const getEmoji = (name: string, category: string = '') => {
        const text = (name + category).toLowerCase();
        if (text.includes('hair') && text.includes('removal')) return '✨';
        if (text.includes('hydra')) return '💧';
        if (text.includes('acne')) return '🛡️';
        if (text.includes('consult')) return '🩺';
        if (text.includes('inject') || text.includes('fillers') || text.includes('botox')) return '💉';
        if (text.includes('laser')) return '⚡';
        if (text.includes('facial') || text.includes('peel')) return '💆‍♀️';
        if (text.includes('glow') || text.includes('bright')) return '🌟';
        if (text.includes('hair') && text.includes('loss')) return '💇‍♂️';
        if (text.includes('makeup')) return '💄';
        return '✨';
    };

    useEffect(() => {
        const fetchTreatments = async () => {
            try {
                // Determine API URL - use env var or default to same logic as other pages
                const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
                const res = await fetch(`${API_URL}/treatments`);
                if (res.ok) {
                    const data = await res.json();
                    const mappedServices = data.map((t: any) => ({
                        id: t.slug,
                        name: t.name,
                        icon: getEmoji(t.name, t.category),
                        desc: t.category || 'Premium Service'
                    }));

                    // Add Consultation at the beginning
                    setTreatments([
                        { id: 'consult', name: 'General Consultation', icon: '🩺', desc: 'Skin analysis' },
                        ...mappedServices
                    ]);
                }
            } catch (error) {
                console.error('Failed to fetch treatments:', error);
            } finally {
                setIsLoadingTreatments(false);
            }
        };

        fetchTreatments();
    }, []);

    // Generate next 7 days
    const generateAvailableSlots = () => {
        const slots = [];
        const today = new Date();
        const timeOptions = [
            '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM',
            '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM'
        ];

        // Generate slots for next 14 days to ensure we have enough open days
        for (let i = 1; i <= 14; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);

            // Skip Wednesdays (Day 3)
            if (date.getDay() === 3) continue;

            const dateStr = date.toISOString().split('T')[0];
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            const dayNum = date.getDate();
            const monthName = date.toLocaleDateString('en-US', { month: 'short' });

            slots.push({
                date: dateStr,
                displayDay: dayName,
                displayDate: `${dayNum} ${monthName}`,
                times: timeOptions
            });

            // Limit to showing 6 available days
            if (slots.length >= 6) break;
        }
        return slots;
    };

    const availableSlots = generateAvailableSlots();

    // Generate WhatsApp booking link
    const generateWhatsAppLink = () => {
        const treatmentName = treatments.find(t => t.id === selectedTreatment)?.name || 'Consultation';

        const message = `Halo SkinLuxe,
I would like to request an appointment.

name: ${name || 'N/A'}
Service: ${treatmentName}
Preferred: ${selectedDateTime ? selectedDateTime.replace('|', ' at ') : 'Not selected'}
Phone: ${phone || 'N/A'}

Please verify availability.`;

        return `https://wa.me/919318452282?text=${encodeURIComponent(message)}`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let dateStr = new Date().toISOString();
        let timeSlot = 'Pending';

        if (selectedDateTime) {
            const parts = selectedDateTime.split('|');
            if (parts.length === 2) {
                dateStr = parts[0];
                timeSlot = parts[1];
            }
        }

        const treatmentName = treatments.find(t => t.id === selectedTreatment)?.name || 'General Consultation';
        const finalNotes = `Service Requested: ${treatmentName}`;

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
            const response = await fetch(`${API_URL}/appointments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    phone,
                    date: dateStr,
                    timeSlot,
                    notes: finalNotes
                })
            });

            if (response.ok) {
                setIsSubmitted(true);
            } else {
                alert('Something went wrong. Please try again via WhatsApp.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('Connection error. Please try WhatsApp.');
        }
    };

    // ------------------------------------------------------------------------
    // SUCCESS VIEW
    // ------------------------------------------------------------------------
    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center py-20 px-4">
                <div className="max-w-md w-full text-center space-y-8 animate-fadeIn">
                    <div className="w-24 h-24 bg-[#1C1C1C] text-white flex items-center justify-center mx-auto square-full">
                        <CheckCircle className="w-10 h-10" />
                    </div>

                    <div>
                        <h1 className="font-serif text-4xl text-[#1C1C1C] mb-4">Request Received</h1>
                        <p className="text-[#4A4A4A] font-light text-lg">
                            Thank you, {name}. We have received your request for <span className="text-[#B4838D] font-medium">{treatments.find(t => t.id === selectedTreatment)?.name}</span>.
                        </p>
                    </div>

                    <div className="bg-[#F9F8F6] p-8 border border-[#E6E2DD] text-left space-y-4">
                        <p className="text-sm uppercase tracking-widest text-[#B4838D]">Next Steps</p>
                        <p className="font-serif text-xl text-[#1C1C1C]">
                            Our clinic coordinator will confirm your exact slot via WhatsApp/Phone within 2 hours.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <a href={generateWhatsAppLink()} target="_blank" rel="noopener noreferrer"
                            className="btn-luxury-filled w-full flex items-center justify-center gap-3 py-4 bg-[#25D366] border-[#25D366] text-white hover:bg-[#128C7E] hover:border-[#128C7E]">
                            <MessageCircle className="w-5 h-5" />
                            Fast-Track via WhatsApp
                        </a>
                        <Link href="/" className="text-[#4A4A4A] hover:text-[#B4838D] text-sm underline underline-offset-4">
                            Return to Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // ------------------------------------------------------------------------
    // MAIN FORM VIEW
    // ------------------------------------------------------------------------
    return (
        <div className="min-h-screen bg-[#F9F8F6]">

            {/* Header / Hero */}
            {/* Header / Hero */}
            <section className="relative min-h-[50vh] flex items-center justify-center bg-[#1C1C1C] text-white pt-32 pb-20">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="container relative z-10 text-center max-w-4xl">
                    <span className="inline-block py-2 px-4 border border-[#B4838D] text-[#B4838D] text-xs font-serif tracking-[0.2em] uppercase mb-6">
                        Concierge Service
                    </span>
                    <h1 className="font-serif text-4xl md:text-7xl mb-6 leading-tight">
                        <span className="text-white">Request a</span> <span className="text-white/80 italic">Consultation</span>
                    </h1>
                    <p className="text-white/70 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
                        Select your preferred service and time. No payment required upfront.
                    </p>
                </div>
            </section>

            <div className="container max-w-4xl -mt-10 pb-20 relative z-10">
                <form onSubmit={handleSubmit} className="bg-white p-6 md:p-12 shadow-2xl border border-[#E6E2DD]">

                    {/* STEP 1: SERVICE */}
                    <div className="mb-12">
                        <h2 className="font-serif text-2xl text-[#1C1C1C] mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 flex items-center justify-center border border-[#1C1C1C] text-sm rounded-full">1</span>
                            Select Service
                        </h2>
                        {/* Mobile Dropdown */}
                        <div className="md:hidden relative">
                            <select
                                value={selectedTreatment}
                                onChange={(e) => setSelectedTreatment(e.target.value)}
                                className="w-full bg-white border border-[#E6E2DD] p-4 pr-10 text-[#1C1C1C] outline-none focus:border-[#B4838D] transition-all font-serif text-lg appearance-none rounded-none"
                            >
                                <option value="" disabled>Select a Treatment</option>
                                {treatments.map((t) => (
                                    <option key={t.id} value={t.id}>
                                        {t.icon} {t.name}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-[#1C1C1C]">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>

                        {/* Desktop Grid */}
                        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-4">
                            {treatments.map((t) => (
                                <button
                                    key={t.id}
                                    type="button"
                                    onClick={() => setSelectedTreatment(t.id)}
                                    className={`p-6 text-left border transition-all duration-300 group
                                        ${selectedTreatment === t.id
                                            ? 'bg-[#1C1C1C] border-[#1C1C1C] text-white'
                                            : 'bg-white border-[#E6E2DD] hover:border-[#B4838D] text-[#1C1C1C]'
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-2xl">{t.icon}</span>
                                        {selectedTreatment === t.id && <CheckCircle className="w-5 h-5 text-[#B4838D]" />}
                                    </div>
                                    <h3 className={`font-serif text-lg mb-1 ${selectedTreatment === t.id ? 'text-white' : 'text-[#1C1C1C]'}`}>
                                        {t.name}
                                    </h3>
                                    <p className={`text-sm ${selectedTreatment === t.id ? 'text-white/60' : 'text-[#4A4A4A]'}`}>
                                        {t.desc}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* STEP 2: PREFERENCE */}
                    <div className={`mb-12 transition-opacity duration-500 ${selectedTreatment ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
                        <h2 className="font-serif text-2xl text-[#1C1C1C] mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 flex items-center justify-center border border-[#1C1C1C] text-sm rounded-full">2</span>
                            Preferred Date
                        </h2>

                        {/* Desktop Grid (Original) */}
                        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2 mb-6">
                            {availableSlots.map((slot) => (
                                <div key={slot.date} className="flex flex-col gap-2">
                                    <div className="text-center text-xs text-[#4A4A4A] uppercase tracking-wider">{slot.displayDay}</div>
                                    {slot.times.map((time) => {
                                        const val = `${slot.date}|${time}`;
                                        const isDst = selectedDateTime === val;
                                        return (
                                            <button
                                                key={time}
                                                type="button"
                                                onClick={() => setSelectedDateTime(val)}
                                                className={`py-2 px-1 text-xs border transition-colors
                                                ${isDst
                                                        ? 'bg-[#B4838D] border-[#B4838D] text-white'
                                                        : 'border-[#E6E2DD] hover:border-[#B4838D] text-[#4A4A4A]'
                                                    }`}
                                            >
                                                {time.slice(0, 5)} {time.slice(-2)}
                                            </button>
                                        )
                                    })}
                                </div>
                            ))}
                        </div>

                        {/* Mobile Dynamic Date Picker */}
                        <div className="md:hidden mb-6">
                            {/* Horizontal Date Scroll */}
                            {/* Horizontal Date Grid (Fits 6) */}
                            <div className="grid grid-cols-6 gap-2 mb-6">
                                {availableSlots.map((slot) => {
                                    const isActive = (activeMobileDate || availableSlots[0]?.date) === slot.date;
                                    return (
                                        <button
                                            key={slot.date}
                                            type="button"
                                            onClick={() => setActiveMobileDate(slot.date)}
                                            className={`flex flex-col items-center justify-center py-2 h-14 border rounded-none transition-all duration-200
                                                ${isActive
                                                    ? 'bg-[#1C1C1C] border-[#1C1C1C] text-white shadow-md'
                                                    : 'bg-white border-[#E6E2DD] text-[#4A4A4A]'
                                                }`}
                                        >
                                            <span className="text-[9px] uppercase tracking-wider leading-none mb-1 opacity-70">
                                                {slot.displayDay[0]}
                                            </span>
                                            <span className="font-serif text-sm leading-none font-medium">
                                                {slot.displayDate.split(' ')[0]}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Time Slots for Selected Date */}
                            <div className="grid grid-cols-3 gap-3 animate-fadeIn">
                                {availableSlots.find(s => s.date === (activeMobileDate || availableSlots[0]?.date))?.times.map((time) => {
                                    const currentSlotDate = activeMobileDate || availableSlots[0]?.date;
                                    const val = `${currentSlotDate}|${time}`;
                                    const isDst = selectedDateTime === val;
                                    return (
                                        <button
                                            key={time}
                                            type="button"
                                            onClick={() => setSelectedDateTime(val)}
                                            className={`py-3 text-sm border transition-all duration-200
                                                ${isDst
                                                    ? 'bg-[#B4838D] border-[#B4838D] text-white shadow-md'
                                                    : 'bg-white border-[#E6E2DD] text-[#4A4A4A]'
                                                }`}
                                        >
                                            {time}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                        <p className="text-xs text-[#4A4A4A] italic text-right">* Actual availability will be confirmed by phone.</p>
                    </div>

                    {/* STEP 3: DETAILS */}
                    <div className={`transition-opacity duration-500 ${selectedDateTime ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
                        <h2 className="font-serif text-2xl text-[#1C1C1C] mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 flex items-center justify-center border border-[#1C1C1C] text-sm rounded-full">3</span>
                            Your Details
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-[#4A4A4A] mb-2">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-[#F9F8F6] border-b border-[#E6E2DD] p-3 outline-none focus:border-[#B4838D] transition-colors font-serif text-lg"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-[#4A4A4A] mb-2">Phone Number</label>
                                <input
                                    type="tel"
                                    required
                                    className="w-full bg-[#F9F8F6] border-b border-[#E6E2DD] p-3 outline-none focus:border-[#B4838D] transition-colors font-serif text-lg"
                                    placeholder="+91"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 items-center">
                            <button
                                type="submit"
                                disabled={!phone || !name}
                                className="btn-luxury-filled w-full md:w-auto bg-[#1C1C1C] border-[#1C1C1C] text-white px-12 hover:bg-[#B4838D] hover:text-white hover:border-[#B4838D] text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Submit Request
                            </button>
                            <p className="text-xs text-[#4A4A4A]">
                                By submitting, you agree to receive appointment reminders.
                            </p>
                        </div>
                    </div>

                </form>

                {/* Contact Info Footer */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left border-t border-[#E6E2DD] pt-8">
                    <div>
                        <h4 className="font-serif text-[#1C1C1C] mb-2 flex items-center justify-center md:justify-start gap-2">
                            <Phone className="w-4 h-4 text-[#B4838D]" /> Direct Line
                        </h4>
                        <p className="text-[#4A4A4A] font-light text-sm">+91 93184 52282</p>
                    </div>
                    <div>
                        <h4 className="font-serif text-[#1C1C1C] mb-2 flex items-center justify-center md:justify-start gap-2">
                            <MapPin className="w-4 h-4 text-[#B4838D]" /> Location
                        </h4>
                        <p className="text-[#4A4A4A] font-light text-sm">Begum Bridge, Meerut</p>
                    </div>
                    <div>
                        <h4 className="font-serif text-[#1C1C1C] mb-2 flex items-center justify-center md:justify-start gap-2">
                            <Clock className="w-4 h-4 text-[#B4838D]" /> Hours
                        </h4>
                        <p className="text-[#4A4A4A] font-light text-sm">10:00 AM - 7:30 PM (Wed Closed)</p>
                    </div>
                </div>
            </div>

        </div>
    );
}
