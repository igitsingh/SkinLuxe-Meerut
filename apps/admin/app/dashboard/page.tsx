"use client";

import { useEffect, useState } from "react";
import { Calendar, Users, Sparkles, TrendingUp, ArrowUpRight } from "lucide-react";
import Link from 'next/link';
import api from "@/lib/api";

interface DashboardStats {
    totalAppointments: number;
    totalInquiries: number;
    totalTreatments: number;
    totalFeaturedTreatments: number;
    totalRevenue: number;
    recentAppointments: {
        id: string;
        name?: string;
        phone?: string;
        date: string;
        status: string;
        treatment?: { name: string };
        user?: { firstName: string; lastName: string };
    }[];
    appointmentStatusCounts?: Record<string, number>;
    inquiryStatusCounts?: Record<string, number>;
}

export default function DashboardPage() {
    const [stats, setStats] = useState<DashboardStats>({
        totalAppointments: 0,
        totalInquiries: 0,
        totalTreatments: 0,
        totalFeaturedTreatments: 0,
        totalRevenue: 0,
        recentAppointments: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await api.get("/admin/analytics/dashboard");
            setStats({
                ...response.data.stats,
                recentAppointments: response.data.recentAppointments || []
            });
        } catch (error) {
            console.error("Failed to fetch stats:", error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        {
            title: "Appointments",
            value: stats.totalAppointments,
            icon: Calendar,
            color: "from-blue-500 to-blue-600",
            bgColor: "bg-blue-50",
            textColor: "text-blue-600",
            link: "/dashboard/appointments"
        },
        {
            title: "Total Inquiries",
            value: stats.totalInquiries,
            icon: Users,
            color: "from-green-500 to-green-600",
            bgColor: "bg-green-50",
            textColor: "text-green-600",
            link: "/dashboard/inquiries"
        },
        {
            title: "Active Treatments",
            value: stats.totalTreatments,
            icon: Sparkles,
            color: "from-purple-500 to-purple-600",
            bgColor: "bg-purple-50",
            textColor: "text-purple-600",
            link: "/dashboard/treatments"
        },
        {
            title: "Total Revenue",
            value: `₹${stats.totalRevenue.toLocaleString()}`,
            icon: TrendingUp,
            color: "from-primary to-primary/80",
            bgColor: "bg-pink-50",
            textColor: "text-primary",
            link: "/dashboard/appointments"
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'CONFIRMED': return 'bg-green-100 text-green-700';
            case 'PENDING': return 'bg-yellow-100 text-yellow-700';
            case 'CANCELLED': return 'bg-red-100 text-red-700';
            case 'COMPLETED': return 'bg-blue-100 text-blue-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <div>
            {/* Header */}
            <div className="mb-6 md:mb-10">
                <h1 className="text-3xl md:text-4xl font-serif text-dark mb-2 md:mb-3">Dashboard</h1>
                <p className="text-gray-600 text-base md:text-lg">Welcome back, Miss. Alka Yadav</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-10">
                {statCards.map((stat, index) => (
                    <Link href={stat.link} key={index}>
                        <div className="group bg-white rounded-xl md:rounded-2xl shadow-sm border border-secondary p-3 md:p-6 hover:shadow-lg hover:border-primary/20 transition-all cursor-pointer h-full">
                            <div className="flex items-start justify-between mb-3 md:mb-6">
                                <div className={`${stat.bgColor} p-2 md:p-3 rounded-lg md:rounded-xl`}>
                                    <stat.icon className={`w-4 h-4 md:w-6 md:h-6 ${stat.textColor}`} />
                                </div>
                                <ArrowUpRight className="w-3 h-3 md:w-5 md:h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <h3 className="text-xl md:text-3xl font-serif text-dark mb-1 md:mb-2">{stat.value}</h3>
                            <p className="text-[10px] md:text-sm text-gray-600 tracking-wide mb-2 md:mb-3">{stat.title}</p>

                            {/* Appointments Breakdown */}
                            {stat.title === "Appointments" && stats.appointmentStatusCounts && (
                                <div className="flex flex-wrap gap-1 md:gap-2 mt-1 md:mt-2 pt-2 md:pt-3 border-t border-gray-100">
                                    {(stats.appointmentStatusCounts['PENDING'] || 0) > 0 && (
                                        <span className="text-[8px] md:text-[10px] font-bold px-1.5 md:px-2 py-0.5 md:py-1 bg-yellow-100 text-yellow-700 rounded-full">
                                            {stats.appointmentStatusCounts['PENDING']} Pending
                                        </span>
                                    )}
                                    {(stats.appointmentStatusCounts['CONFIRMED'] || 0) > 0 && (
                                        <span className="text-[8px] md:text-[10px] font-bold px-1.5 md:px-2 py-0.5 md:py-1 bg-green-100 text-green-700 rounded-full">
                                            {stats.appointmentStatusCounts['CONFIRMED']} Confirmed
                                        </span>
                                    )}
                                    {(stats.appointmentStatusCounts['CANCELLED'] || 0) > 0 && (
                                        <span className="text-[8px] md:text-[10px] font-bold px-1.5 md:px-2 py-0.5 md:py-1 bg-red-100 text-red-700 rounded-full">
                                            {stats.appointmentStatusCounts['CANCELLED']} Cancelled
                                        </span>
                                    )}
                                    {(stats.appointmentStatusCounts['COMPLETED'] || 0) > 0 && (
                                        <span className="text-[8px] md:text-[10px] font-bold px-1.5 md:px-2 py-0.5 md:py-1 bg-blue-100 text-blue-700 rounded-full">
                                            {stats.appointmentStatusCounts['COMPLETED']} Completed
                                        </span>
                                    )}
                                </div>
                            )}

                            {/* Inquiries Breakdown */}
                            {stat.title === "Total Inquiries" && stats.inquiryStatusCounts && (
                                <div className="flex flex-wrap gap-1 md:gap-2 mt-1 md:mt-2 pt-2 md:pt-3 border-t border-gray-100">
                                    {(stats.inquiryStatusCounts['NEW'] || 0) > 0 && (
                                        <span className="text-[8px] md:text-[10px] font-bold px-1.5 md:px-2 py-0.5 md:py-1 bg-blue-100 text-blue-700 rounded-full">
                                            {stats.inquiryStatusCounts['NEW']} New
                                        </span>
                                    )}
                                    {(stats.inquiryStatusCounts['RESOLVED'] || 0) > 0 && (
                                        <span className="text-[8px] md:text-[10px] font-bold px-1.5 md:px-2 py-0.5 md:py-1 bg-green-100 text-green-700 rounded-full">
                                            {stats.inquiryStatusCounts['RESOLVED']} Resolved
                                        </span>
                                    )}
                                    {(stats.inquiryStatusCounts['ARCHIVED'] || 0) > 0 && (
                                        <span className="text-[8px] md:text-[10px] font-bold px-1.5 md:px-2 py-0.5 md:py-1 bg-gray-100 text-gray-700 rounded-full">
                                            {stats.inquiryStatusCounts['ARCHIVED']} Archived
                                        </span>
                                    )}
                                </div>
                            )}

                            {/* Treatments Breakdown */}
                            {stat.title === "Active Treatments" && (
                                <div className="flex flex-wrap gap-1 md:gap-2 mt-1 md:mt-2 pt-2 md:pt-3 border-t border-gray-100">
                                    <span className="text-[8px] md:text-[10px] font-bold px-1.5 md:px-2 py-0.5 md:py-1 bg-purple-100 text-purple-700 rounded-full">
                                        {stats.totalFeaturedTreatments} Featured
                                    </span>
                                </div>
                            )}
                        </div>
                    </Link>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-10">
                <div className="bg-gradient-to-br from-primary to-primary/80 rounded-xl md:rounded-2xl p-5 md:p-8 text-white shadow-lg shadow-primary/20">
                    <Calendar className="w-8 h-8 md:w-10 md:h-10 mb-3 md:mb-4 opacity-90" />
                    <h3 className="text-lg md:text-xl font-serif mb-1 md:mb-2">New Appointment</h3>
                    <p className="text-white/80 text-xs md:text-sm mb-4 md:mb-6">Schedule a client consultation</p>
                    <Link href="/dashboard/appointments" className="inline-block bg-white text-primary px-4 md:px-6 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium hover:bg-white/90 transition text-center">
                        Book Now
                    </Link>
                </div>

                <div className="bg-white rounded-xl md:rounded-2xl p-5 md:p-8 border border-secondary shadow-sm hover:shadow-md transition-shadow">
                    <Sparkles className="w-8 h-8 md:w-10 md:h-10 mb-3 md:mb-4 text-primary" />
                    <h3 className="text-lg md:text-xl font-serif text-dark mb-1 md:mb-2">Add Treatment</h3>
                    <p className="text-gray-600 text-xs md:text-sm mb-4 md:mb-6">Create a new service offering</p>
                    <Link href="/dashboard/treatments" className="inline-block bg-secondary text-dark px-4 md:px-6 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium hover:bg-secondary/80 transition text-center">
                        Add Service
                    </Link>
                </div>

                <div className="bg-white rounded-xl md:rounded-2xl p-5 md:p-8 border border-secondary shadow-sm hover:shadow-md transition-shadow">
                    <Users className="w-8 h-8 md:w-10 md:h-10 mb-3 md:mb-4 text-primary" />
                    <h3 className="text-lg md:text-xl font-serif text-dark mb-1 md:mb-2">Client Database</h3>
                    <p className="text-gray-600 text-xs md:text-sm mb-4 md:mb-6">View and manage clients</p>
                    <Link href="/dashboard/clients" className="inline-block bg-secondary text-dark px-4 md:px-6 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium hover:bg-secondary/80 transition text-center">
                        View All
                    </Link>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-secondary p-4 md:p-8">
                <h2 className="text-xl md:text-2xl font-serif text-dark mb-4 md:mb-6">Recent Activity (Appointments)</h2>
                {stats.recentAppointments.length === 0 ? (
                    <div className="text-center py-12 md:py-16 text-gray-500">
                        <Calendar className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 opacity-20" />
                        <h3 className="text-base md:text-lg font-medium text-gray-700 mb-1 md:mb-2">No recent activity</h3>
                        <p className="text-xs md:text-sm">Activity will appear here once you start managing appointments</p>
                    </div>
                ) : (
                    <>
                        {/* Desktop Table */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="border-b border-gray-100 bg-gray-50/50">
                                    <tr>
                                        <th className="p-4 font-serif text-gray-700">Client</th>
                                        <th className="p-4 font-serif text-gray-700">Service</th>
                                        <th className="p-4 font-serif text-gray-700">Date</th>
                                        <th className="p-4 font-serif text-gray-700">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {stats.recentAppointments.map((appt) => {
                                        const clientName = appt.name || (appt.user ? `${appt.user.firstName} ${appt.user.lastName}` : 'Unknown');
                                        const serviceName = appt.treatment?.name || 'General Consultation';
                                        return (
                                            <tr key={appt.id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="p-4 font-medium text-gray-900">{clientName}</td>
                                                <td className="p-4 text-gray-600">{serviceName}</td>
                                                <td className="p-4 text-gray-500 text-sm">{formatDate(appt.date)}</td>
                                                <td className="p-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(appt.status)}`}>
                                                        {appt.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Cards */}
                        <div className="md:hidden space-y-3">
                            {stats.recentAppointments.map((appt) => {
                                const clientName = appt.name || (appt.user ? `${appt.user.firstName} ${appt.user.lastName}` : 'Unknown');
                                const serviceName = appt.treatment?.name || 'General Consultation';
                                return (
                                    <div key={appt.id} className="border border-gray-100 rounded-lg p-3 bg-gray-50/30">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-medium text-gray-900 text-sm truncate">{clientName}</h4>
                                                <p className="text-xs text-gray-500">{appt.phone || 'No phone'}</p>
                                            </div>
                                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase flex-shrink-0 ml-2 ${getStatusColor(appt.status)}`}>
                                                {appt.status}
                                            </span>
                                        </div>
                                        <div className="text-xs text-gray-600 space-y-1">
                                            <div className="truncate">{serviceName}</div>
                                            <div className="text-gray-400">{formatDate(appt.date)}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
