'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { Navigation as NavigationIcon } from 'lucide-react';

export default function NavigationPage() {
    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-serif text-gray-900">Navigation</h1>
                        <p className="mt-2 text-gray-600">
                            Manage website navigation menus
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                    <NavigationIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Navigation Management
                    </h3>
                    <p className="text-gray-600 mb-6">
                        This feature will allow you to customize the website navigation menus.
                    </p>
                    <p className="text-sm text-gray-500">
                        Coming soon - Menu builder integration pending
                    </p>
                </div>
            </div>
        </AdminLayout>
    );
}
