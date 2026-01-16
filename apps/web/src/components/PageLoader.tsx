'use client';

import LoadingSpinner from './LoadingSpinner';

export default function PageLoader() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F9F8F6]">
            <div className="text-center space-y-6">
                <LoadingSpinner size="lg" />
                <p className="text-[#4A4A4A] font-light text-sm tracking-wider uppercase">
                    Please wait...
                </p>
            </div>
        </div>
    );
}
