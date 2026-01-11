import Image from 'next/image';

interface LogoProps {
    className?: string;
    width?: number;
    height?: number;
}

export default function Logo({ className = "", width = 180, height = 60 }: LogoProps) {
    return (
        <div className={`flex items-center ${className}`}>
            <Image
                src="/MAIN ZEVARAZ LOGO.png"
                alt="ZEVARAZ"
                width={width}
                height={height}
                className="h-auto w-auto object-contain"
                priority
            />
        </div>
    );
}
