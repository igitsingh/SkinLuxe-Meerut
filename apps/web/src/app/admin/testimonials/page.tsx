'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { Star } from 'lucide-react';

export default function TestimonialsPage() {
    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-serif text-gray-900">Testimonials</h1>
                        <p className="mt-2 text-gray-600">
                            Manage patient testimonials and reviews
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                    <Star className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Testimonials Management
                    </h3>
                    <p className="text-gray-600 mb-6">
                        This feature will allow you to manage and display patient testimonials.
                    </p>
                    <p className="text-sm text-gray-500">
                        Coming soon - Testimonials system integration pending
                    </p>
                </div>
            </div>
        </AdminLayout>
    );
}
