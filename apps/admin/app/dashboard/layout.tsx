"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
    LayoutDashboard,
    Calendar,
    Users,
    MessageSquare,
    Settings,
    LogOut,
    FileText,
    Heart,
    Menu,
    X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/dashboard/appointments", icon: Calendar, label: "Appointments" },
    { href: "/dashboard/treatments", icon: Heart, label: "Treatments" },
    { href: "/dashboard/clients", icon: Users, label: "Clients" },
    { href: "/dashboard/inquiries", icon: MessageSquare, label: "Inquiries" },
    { href: "/dashboard/blog", icon: FileText, label: "Blog" },
    { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("admin_token");
        router.push("/");
    };

    return (
        <div className="flex h-screen bg-light">
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-secondary z-40 flex items-center justify-between px-4">
                <Link href="/dashboard" className="flex items-center gap-2">
                    <img src="/skinluxe-logo-dark.png" alt="Logo" className="h-8 w-auto" />
                    <span className="text-[10px] uppercase tracking-widest text-gray-500">Admin Panel</span>
                </Link>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-dark">
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Sidebar (Desktop & Mobile) */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-secondary flex flex-col shadow-sm transition-transform duration-300 md:relative md:translate-x-0",
                isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                {/* Logo (Desktop only usually, but we keep structure) */}
                <div className="p-6 border-b border-secondary hidden md:block">
                    <Link href="/dashboard" className="flex flex-col items-start group pl-3">
                        <img
                            src="/skinluxe-logo-dark.png"
                            alt="SkinLuxe Aesthetics & Academy"
                            className="h-20 w-auto transition-transform group-hover:scale-105"
                        />
                        <div className="text-left -mt-5 ml-1">
                            <p className="text-[10px] text-gray-500 tracking-[0.3em] uppercase font-medium">Admin Panel</p>
                        </div>
                    </Link>
                </div>

                {/* Mobile Menu Header for Logo */}
                <div className="md:hidden h-16 px-6 border-b border-secondary flex justify-between items-center">
                    <span className="font-serif text-lg font-bold">Menu</span>
                    <button onClick={() => setIsMobileMenuOpen(false)}>
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={cn(
                                    "flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all group",
                                    isActive
                                        ? "bg-primary text-white shadow-md shadow-primary/20"
                                        : "text-gray-600 hover:bg-secondary/50 hover:text-dark"
                                )}
                            >
                                <item.icon className={cn(
                                    "w-5 h-5 transition-transform group-hover:scale-110",
                                    isActive ? "text-white" : "text-gray-400"
                                )} />
                                <span className="font-medium text-sm">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* User Info & Logout */}
                <div className="p-6 border-t border-secondary space-y-4">
                    <div className="px-4 py-3 bg-light rounded-xl flex items-center gap-3">
                        <img
                            src="/alka-yadav-profile.png"
                            alt="Alka Yadav"
                            className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                        />
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">Logged in as</p>
                            <p className="text-sm font-medium text-dark">Miss. Alka Yadav</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 w-full transition-all group"
                    >
                        <LogOut className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                        <span className="font-medium text-sm">Logout</span>
                    </button>
                </div>

                {/* Credit */}
                <div className="py-4 text-center border-t border-[#E6E2DD]/50 bg-[#F2F0EB]">
                    <p className="text-[#4A4A4A]/40 text-[9px] tracking-[0.2em] uppercase font-light">
                        <span className="text-[#B4838D] font-normal">House of Floyds</span> Creation
                    </p>
                </div>
            </aside >

            {/* Main Content */}
            <main className="flex-1 overflow-auto pt-16 md:pt-0">
                <div className="p-4 md:p-10 max-w-7xl mx-auto">{children}</div>
            </main >

            {/* Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </div >
    );
}
