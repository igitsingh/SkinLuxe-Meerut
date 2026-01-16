'use client';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export default function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: 'w-12 h-12',
        md: 'w-20 h-20',
        lg: 'w-32 h-32'
    };

    return (
        <div className={`flex items-center justify-center ${className}`}>
            <div className="relative">
                {/* Spinning outer ring */}
                <div className={`${sizeClasses[size]} rounded-full border-2 border-gray-200 border-t-primary animate-spin`}></div>

                {/* Logo in center */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <img
                        src="/skinluxe-logo-dark.png"
                        alt="SkinLuxe"
                        className={`${size === 'sm' ? 'w-8' : size === 'md' ? 'w-14' : 'w-24'} h-auto object-contain animate-pulse`}
                    />
                </div>
            </div>
        </div>
    );
}
