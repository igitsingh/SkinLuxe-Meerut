'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { BookOpen } from 'lucide-react';

export default function BlogPage() {
    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-serif text-gray-900">Blog</h1>
                        <p className="mt-2 text-gray-600">
                            Manage blog posts and articles
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                    <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Blog Management
                    </h3>
                    <p className="text-gray-600 mb-6">
                        This feature will allow you to create and manage blog posts about skincare and treatments.
                    </p>
                    <p className="text-sm text-gray-500">
                        Coming soon - Blog system integration pending
                    </p>
                </div>
            </div>
        </AdminLayout>
    );
}
