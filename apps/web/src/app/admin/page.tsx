import AdminLayout from '@/components/admin/AdminLayout';
import {
    FileText,
    Package,
    FolderOpen,
    Image,
    TrendingUp,
    Users,
    Mail,
    Star,
    Calendar,
} from 'lucide-react';

export const metadata = {
    title: 'Dashboard | SkinLuxe CMS',
    description: 'Manage your SkinLuxe clinic website and appointments',
};

const stats = [
    {
        name: 'Total Treatments',
        value: '9',
        icon: Package,
        change: '+2',
        changeType: 'positive',
    },
    {
        name: 'Appointments',
        value: '48',
        icon: Calendar,
        change: '+12',
        changeType: 'positive',
    },
    {
        name: 'Service Categories',
        value: '6',
        icon: FolderOpen,
        change: '0',
        changeType: 'neutral',
    },
    {
        name: 'Total Patients',
        value: '234',
        icon: Users,
        change: '+18',
        changeType: 'positive',
    },
];

const recentActivity = [
    {
        id: 1,
        action: 'Updated',
        item: 'Laser Hair Reduction Page',
        user: 'Dr. Alka Yadav',
        time: '2 hours ago',
    },
    {
        id: 2,
        action: 'New Appointment',
        item: 'HydraFacial - Priya Sharma',
        user: 'Reception',
        time: '5 hours ago',
    },
    {
        id: 3,
        action: 'Uploaded',
        item: '12 new treatment images',
        user: 'Admin',
        time: '1 day ago',
    },
    {
        id: 4,
        action: 'Published',
        item: 'Anti-Aging Treatment Page',
        user: 'Dr. Alka Yadav',
        time: '2 days ago',
    },
];

const quickActions = [
    {
        name: 'Create New Page',
        href: '/admin/pages/new',
        icon: FileText,
        description: 'Add a new page to your website',
    },
    {
        name: 'Add Treatment',
        href: '/admin/products/new',
        icon: Package,
        description: 'Add a new treatment service',
    },
    {
        name: 'Upload Media',
        href: '/admin/media',
        icon: Image,
        description: 'Upload treatment images',
    },
    {
        name: 'View Appointments',
        href: '/admin/orders',
        icon: Calendar,
        description: 'Manage patient appointments',
    },
];

export default function AdminDashboard() {
    return (
        <AdminLayout>
            <div className="space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-serif text-gray-900">Dashboard</h1>
                    <p className="mt-2 text-gray-600">
                        Welcome back! Here's what's happening at SkinLuxe today.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat) => (
                        <div
                            key={stat.name}
                            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">{stat.name}</p>
                                    <p className="mt-2 text-3xl font-semibold text-gray-900">
                                        {stat.value}
                                    </p>
                                </div>
                                <div className="p-3 bg-[#E91E63]/10 rounded-lg">
                                    <stat.icon className="w-6 h-6 text-[#E91E63]" />
                                </div>
                            </div>
                            {stat.change !== '0' && (
                                <div className="mt-4 flex items-center gap-1">
                                    <TrendingUp className="w-4 h-4 text-green-600" />
                                    <span className="text-sm text-green-600">{stat.change}</span>
                                    <span className="text-sm text-gray-600">this week</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        Quick Actions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {quickActions.map((action) => (
                            <a
                                key={action.name}
                                href={action.href}
                                className="group bg-white rounded-lg border border-gray-200 p-6 hover:border-[#E91E63] hover:shadow-lg transition-all"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 bg-[#E91E63]/10 rounded-lg group-hover:bg-[#E91E63] transition-colors">
                                        <action.icon className="w-5 h-5 text-[#E91E63] group-hover:text-white transition-colors" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900">{action.name}</h3>
                                </div>
                                <p className="text-sm text-gray-600">{action.description}</p>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Recent Activity & Pending Items */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Activity */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            Recent Activity
                        </h2>
                        <div className="space-y-4">
                            {recentActivity.map((activity) => (
                                <div
                                    key={activity.id}
                                    className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                                >
                                    <div className="w-2 h-2 mt-2 rounded-full bg-[#E91E63]" />
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-900">
                                            <span className="font-medium">{activity.action}</span>{' '}
                                            {activity.item}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {activity.user} • {activity.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <a
                            href="/admin/activity"
                            className="mt-4 text-sm text-[#E91E63] hover:text-[#C2185B] font-medium inline-block"
                        >
                            View all activity →
                        </a>
                    </div>

                    {/* Pending Items */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            Needs Attention
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-pink-50 rounded-lg border border-pink-200">
                                <div className="flex items-center gap-3">
                                    <Calendar className="w-5 h-5 text-[#E91E63]" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">
                                            Today's Appointments
                                        </p>
                                        <p className="text-xs text-gray-600">8 appointments scheduled</p>
                                    </div>
                                </div>
                                <a
                                    href="/admin/orders"
                                    className="text-sm text-[#E91E63] hover:text-[#C2185B] font-medium"
                                >
                                    View
                                </a>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <div className="flex items-center gap-3">
                                    <Star className="w-5 h-5 text-blue-600" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">
                                            Pending Testimonials
                                        </p>
                                        <p className="text-xs text-gray-600">2 awaiting approval</p>
                                    </div>
                                </div>
                                <a
                                    href="/admin/testimonials"
                                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    Review
                                </a>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                                <div className="flex items-center gap-3">
                                    <Mail className="w-5 h-5 text-yellow-600" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">
                                            New Inquiries
                                        </p>
                                        <p className="text-xs text-gray-600">5 unread messages</p>
                                    </div>
                                </div>
                                <a
                                    href="/admin/inquiries"
                                    className="text-sm text-yellow-600 hover:text-yellow-700 font-medium"
                                >
                                    View
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
