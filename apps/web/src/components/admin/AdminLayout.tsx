'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    FileText,
    Image,
    Package,
    FolderOpen,
    Settings,
    Menu,
    X,
    LogOut,
    User,
    Calendar,
    Navigation,
    Star,
    Mail,
    BookOpen,
    ChevronDown,
    Users,
} from 'lucide-react';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const navigation = [
    {
        name: 'Dashboard',
        href: '/admin',
        icon: LayoutDashboard,
    },
    {
        name: 'Pages',
        href: '/admin/pages',
        icon: FileText,
    },
    {
        name: 'Treatments',
        href: '/admin/products',
        icon: Package,
    },
    {
        name: 'Service Categories',
        href: '/admin/collections',
        icon: FolderOpen,
    },
    {
        name: 'Appointments',
        href: '/admin/orders',
        icon: Calendar,
    },
    {
        name: 'Users',
        href: '/admin/users',
        icon: Users,
    },
    {
        name: 'Media Library',
        href: '/admin/media',
        icon: Image,
    },
    {
        name: 'Blog',
        href: '/admin/blog',
        icon: BookOpen,
    },
    {
        name: 'Testimonials',
        href: '/admin/testimonials',
        icon: Star,
    },
    {
        name: 'Inquiries',
        href: '/admin/inquiries',
        icon: Mail,
    },
    {
        name: 'Navigation',
        href: '/admin/navigation',
        icon: Navigation,
    },
    {
        name: 'Settings',
        href: '/admin/settings',
        icon: Settings,
    },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-[#1A1A1A] text-white
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
            >
                {/* Logo */}
                <div className="flex items-center justify-between h-16 px-6 border-b border-white/10">
                    <Link href="/admin" className="flex items-center gap-2">
                        <span className="text-xl font-serif text-[#E91E63]">SkinLuxe</span>
                        <span className="text-xs text-white/60">CMS</span>
                    </Link>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden text-white/60 hover:text-white"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
                  transition-colors duration-200
                  ${isActive
                                        ? 'bg-[#E91E63] text-white'
                                        : 'text-white/70 hover:text-white hover:bg-white/5'
                                    }
                `}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* User section */}
                <div className="border-t border-white/10 p-4">
                    <button
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-white/5 transition-colors"
                    >
                        <div className="w-8 h-8 rounded-full bg-[#E91E63] flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 text-left">
                            <p className="text-sm font-medium text-white">Dr. Alka Yadav</p>
                            <p className="text-xs text-white/60">admin@skinluxe-meerut.com</p>
                        </div>
                        <ChevronDown
                            className={`w-4 h-4 text-white/60 transition-transform ${userMenuOpen ? 'rotate-180' : ''
                                }`}
                        />
                    </button>

                    {userMenuOpen && (
                        <div className="mt-2 space-y-1">
                            <Link
                                href="/admin/profile"
                                className="flex items-center gap-3 px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg"
                            >
                                <User className="w-4 h-4" />
                                Profile
                            </Link>
                            <button
                                onClick={() => {/* Handle logout */ }}
                                className="flex items-center gap-3 w-full px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg"
                            >
                                <LogOut className="w-4 h-4" />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </aside>

            {/* Main content */}
            <div className="lg:pl-64">
                {/* Top bar */}
                <header className="sticky top-0 z-30 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden text-gray-600 hover:text-gray-900"
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    <div className="flex items-center gap-4 ml-auto">
                        <Link
                            href="/"
                            target="_blank"
                            className="text-sm text-[#E91E63] hover:text-[#C2185B] font-medium"
                        >
                            View Website →
                        </Link>
                    </div>
                </header>

                {/* Page content */}
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
