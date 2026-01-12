"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
    LayoutDashboard,
    Calendar,
    Users,
    Sparkles,
    MessageSquare,
    Settings,
    LogOut,
    FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/dashboard/appointments", icon: Calendar, label: "Appointments" },
    { href: "/dashboard/treatments", icon: Sparkles, label: "Treatments" },
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

    const handleLogout = () => {
        localStorage.removeItem("admin_token");
        router.push("/");
    };

    return (
        <div className="flex h-screen bg-light">
            {/* Sidebar */}
            <aside className="w-72 bg-white border-r border-secondary flex flex-col shadow-sm">
                {/* Logo */}
                <div className="p-8 border-b border-secondary">
                    <Link href="/dashboard" className="flex items-center gap-3 group">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/30 transition-shadow">
                            <Sparkles className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-serif text-dark">SkinLuxe</h1>
                            <p className="text-xs text-gray-500 tracking-widest uppercase">Admin</p>
                        </div>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
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
                    <div className="px-4 py-3 bg-light rounded-xl">
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Logged in as</p>
                        <p className="text-sm font-medium text-dark">Admin User</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 w-full transition-all group"
                    >
                        <LogOut className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                        <span className="font-medium text-sm">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <div className="p-10 max-w-7xl mx-auto">{children}</div>
            </main>
        </div>
    );
}
