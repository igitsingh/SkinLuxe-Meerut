'use client';

import { useState } from 'react';
import { Sparkles, Calendar, MessageCircle, CheckCircle, Clock, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

export default function BookAppointmentPage() {
    const [selectedTreatment, setSelectedTreatment] = useState('');
    const [selectedDateTime, setSelectedDateTime] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [notes, setNotes] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Treatment options - Service Menu
    const treatments = [
        { id: 'laser', name: 'Laser Hair Reduction', icon: '✨', desc: 'Painless removal' },
        { id: 'hydra', name: 'HydraFacial MD', icon: '💧', desc: 'Instant glow' },
        { id: 'acne', name: 'Acne / Scars', icon: '🛡️', desc: 'Clinical protocol' },
        { id: 'consult', name: 'General Consultation', icon: '🩺', desc: 'Skin analysis' },
    ];

    // Generate next 7 days
    const generateAvailableSlots = () => {
        const slots = [];
        const today = new Date();
        const timeOptions = ['11:00 AM', '01:00 PM', '03:00 PM', '05:00 PM', '07:00 PM'];

        for (let i = 1; i <= 6; i++) { // Next 6 days excluding today for better planning
            const date = new Date(today);
            date.setDate(today.getDate() + i);
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
            const response = await fetch('/api/appointments', {
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
            <div className="bg-[#1C1C1C] text-white py-20">
                <div className="container text-center max-w-2xl mx-auto">
                    <span className="text-[#B4838D] text-xs uppercase tracking-[0.2em] mb-4 block">Concierge Service</span>
                    <h1 className="font-serif text-4xl md:text-5xl mb-6">Request a Consultation</h1>
                    <p className="text-white/60 font-light text-lg">
                        Select your preferred service and time. No payment required upfront.
                    </p>
                </div>
            </div>

            <div className="container max-w-4xl -mt-10 pb-20 relative z-10">
                <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 shadow-2xl border border-[#E6E2DD]">

                    {/* STEP 1: SERVICE */}
                    <div className="mb-12">
                        <h2 className="font-serif text-2xl text-[#1C1C1C] mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 flex items-center justify-center border border-[#1C1C1C] text-sm rounded-full">1</span>
                            Select Service
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
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
                        <p className="text-[#4A4A4A] font-light text-sm">11:00 AM - 7:00 PM (Sun Closed)</p>
                    </div>
                </div>
            </div>

        </div>
    );
}
