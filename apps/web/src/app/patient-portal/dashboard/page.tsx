'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, FileText, User, CreditCard, LogOut, Bell, Clock, CheckCircle } from 'lucide-react';

export default function PatientDashboard() {
    const [patient] = useState({
        name: 'Priya Sharma',
        email: 'priya.sharma@email.com',
        phone: '+91 98765 43210',
        memberSince: 'January 2024',
    });

    const upcomingAppointments = [
        {
            id: 1,
            treatment: 'HydraFacial',
            date: 'December 15, 2024',
            time: '2:00 PM',
            doctor: 'Dr. Alka Yadav',
            status: 'Confirmed',
        },
        {
            id: 2,
            treatment: 'Laser Hair Reduction - Session 3',
            date: 'December 22, 2024',
            time: '11:00 AM',
            doctor: 'Dr. Alka Yadav',
            status: 'Confirmed',
        },
    ];

    const recentTreatments = [
        {
            id: 1,
            treatment: 'Laser Hair Reduction - Session 2',
            date: 'November 28, 2024',
            status: 'Completed',
        },
        {
            id: 2,
            treatment: 'Skin Consultation',
            date: 'November 15, 2024',
            status: 'Completed',
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-[rgba(233,30,99,0.03)]">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/">
                            <img src="/skinluxe-logo-dark.png" alt="SkinLuxe" className="h-12" />
                        </Link>
                        <div className="flex items-center gap-4">
                            <button className="relative p-2 text-gray-600 hover:text-[#E91E63]">
                                <Bell className="w-6 h-6" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-[#E91E63] rounded-full"></span>
                            </button>
                            <Link href="/patient-portal/login">
                                <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-[#E91E63]">
                                    <LogOut className="w-5 h-5" />
                                    <span>Logout</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <aside className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg border-2 border-[#E91E63]/20 p-6">
                            <div className="text-center mb-6">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#E91E63] to-[#C2185B] flex items-center justify-center mx-auto mb-4">
                                    <User className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="font-serif text-xl text-[#000000] mb-1">{patient.name}</h3>
                                <p className="text-sm text-gray-600">{patient.email}</p>
                                <p className="text-xs text-gray-500 mt-2">Member since {patient.memberSince}</p>
                            </div>

                            <nav className="space-y-2">
                                <Link
                                    href="/patient-portal/dashboard"
                                    className="flex items-center gap-3 px-4 py-3 bg-[#E91E63]/10 text-[#E91E63] rounded-xl font-medium"
                                >
                                    <Calendar className="w-5 h-5" />
                                    Dashboard
                                </Link>
                                <Link
                                    href="/patient-portal/appointments"
                                    className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl"
                                >
                                    <Clock className="w-5 h-5" />
                                    Appointments
                                </Link>
                                <Link
                                    href="/patient-portal/records"
                                    className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl"
                                >
                                    <FileText className="w-5 h-5" />
                                    Medical Records
                                </Link>
                                <Link
                                    href="/patient-portal/payments"
                                    className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl"
                                >
                                    <CreditCard className="w-5 h-5" />
                                    Payments
                                </Link>
                                <Link
                                    href="/patient-portal/profile"
                                    className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl"
                                >
                                    <User className="w-5 h-5" />
                                    Profile
                                </Link>
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="lg:col-span-3 space-y-8">
                        {/* Welcome */}
                        <div className="bg-gradient-to-r from-[#E91E63] to-[#C2185B] rounded-2xl p-8 text-white">
                            <h1 className="font-serif text-3xl mb-2">Welcome back, {patient.name.split(' ')[0]}!</h1>
                            <p className="text-white/90">Here's your treatment journey at SkinLuxe</p>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-white rounded-2xl p-6 border-2 border-[#E91E63]/20 shadow-lg">
                                <div className="flex items-center justify-between mb-4">
                                    <Calendar className="w-8 h-8 text-[#E91E63]" />
                                    <span className="text-3xl font-bold text-[#000000]">2</span>
                                </div>
                                <p className="text-gray-600">Upcoming Appointments</p>
                            </div>
                            <div className="bg-white rounded-2xl p-6 border-2 border-[#E91E63]/20 shadow-lg">
                                <div className="flex items-center justify-between mb-4">
                                    <CheckCircle className="w-8 h-8 text-green-600" />
                                    <span className="text-3xl font-bold text-[#000000]">5</span>
                                </div>
                                <p className="text-gray-600">Completed Treatments</p>
                            </div>
                            <div className="bg-white rounded-2xl p-6 border-2 border-[#E91E63]/20 shadow-lg">
                                <div className="flex items-center justify-between mb-4">
                                    <FileText className="w-8 h-8 text-blue-600" />
                                    <span className="text-3xl font-bold text-[#000000]">3</span>
                                </div>
                                <p className="text-gray-600">Medical Records</p>
                            </div>
                        </div>

                        {/* Upcoming Appointments */}
                        <div className="bg-white rounded-2xl p-6 border-2 border-[#E91E63]/20 shadow-lg">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="font-serif text-2xl text-[#000000]">Upcoming Appointments</h2>
                                <Link href="/book-appointment" className="text-[#E91E63] hover:text-[#C2185B] font-medium">
                                    Book New →
                                </Link>
                            </div>
                            <div className="space-y-4">
                                {upcomingAppointments.map((apt) => (
                                    <div key={apt.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-[rgba(233,30,99,0.05)] to-white rounded-xl border border-[#E91E63]/20">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-[#E91E63]/10 flex items-center justify-center">
                                                <Calendar className="w-6 h-6 text-[#E91E63]" />
                                            </div>
                                            <div>
                                                <h3 className="font-serif text-lg text-[#000000]">{apt.treatment}</h3>
                                                <p className="text-sm text-gray-600">{apt.date} at {apt.time}</p>
                                                <p className="text-xs text-gray-500">with {apt.doctor}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                                                {apt.status}
                                            </span>
                                            <button className="px-4 py-2 text-[#E91E63] hover:bg-[#E91E63]/10 rounded-lg">
                                                Reschedule
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Treatments */}
                        <div className="bg-white rounded-2xl p-6 border-2 border-[#E91E63]/20 shadow-lg">
                            <h2 className="font-serif text-2xl text-[#000000] mb-6">Recent Treatments</h2>
                            <div className="space-y-3">
                                {recentTreatments.map((treatment) => (
                                    <div key={treatment.id} className="flex items-center justify-between p-4 border-b border-gray-100 last:border-0">
                                        <div>
                                            <h3 className="font-medium text-[#000000]">{treatment.treatment}</h3>
                                            <p className="text-sm text-gray-600">{treatment.date}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                                                {treatment.status}
                                            </span>
                                            <Link href={`/patient-portal/records/${treatment.id}`} className="text-[#E91E63] hover:text-[#C2185B] text-sm">
                                                View Details →
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <Link href="/book-appointment" className="block group">
                                <div className="bg-white rounded-2xl p-6 border-2 border-[#E91E63]/20 hover:border-[#E91E63] shadow-lg hover:shadow-xl transition-all">
                                    <Calendar className="w-10 h-10 text-[#E91E63] mb-4" />
                                    <h3 className="font-serif text-xl text-[#000000] mb-2">Book Appointment</h3>
                                    <p className="text-gray-600">Schedule your next treatment session</p>
                                </div>
                            </Link>
                            <Link href="/contact" className="block group">
                                <div className="bg-white rounded-2xl p-6 border-2 border-[#E91E63]/20 hover:border-[#E91E63] shadow-lg hover:shadow-xl transition-all">
                                    <FileText className="w-10 h-10 text-[#E91E63] mb-4" />
                                    <h3 className="font-serif text-xl text-[#000000] mb-2">Contact Clinic</h3>
                                    <p className="text-gray-600">Get in touch with our team</p>
                                </div>
                            </Link>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
