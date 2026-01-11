import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from 'sonner';
import { SettingsProvider } from "@/contexts/SettingsContext";
import DynamicFavicon from "@/components/DynamicFavicon";
import DynamicSchema from "@/components/DynamicSchema";
import DynamicColors from "@/components/DynamicColors";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-serif" });
const lato = Lato({ subsets: ["latin"], weight: ["100", "300", "400", "700"], variable: "--font-sans" });

// Generate dynamic metadata from settings
export async function generateMetadata(): Promise<Metadata> {
  try {
    // Fetch settings from API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/settings`, {
      cache: 'no-store'
    });
    const data = await response.json();
    const settings = data.success ? data.data : null;

    return {
      title: settings?.seoTitle || "SkinLuxe Aesthetics & Academy | Laser, Skin & Aesthetic Clinic, Begum Bridge Meerut",
      description: settings?.seoDescription || "SkinLuxe Meerut – Advanced Laser Hair Reduction, Skin Treatments, Acne & Pigmentation Cure, HydraFacial, Anti-Aging, and Aesthetic Services. Located at Begum Bridge Road, Meerut.",
      icons: {
        icon: settings?.favicon || '/skinluxe-logo.png',
        apple: settings?.favicon || '/skinluxe-logo.png',
      },
      openGraph: {
        title: settings?.seoTitle || "SkinLuxe Aesthetics & Academy | Premium Skin & Laser Clinic Meerut",
        description: settings?.seoDescription || "Advanced skin treatments, laser hair reduction, and aesthetic procedures in Meerut. Expert dermatology care.",
        url: "https://skinluxe-meerut.com",
        type: "website",
        siteName: settings?.siteName || "SkinLuxe Aesthetics & Academy",
        locale: "en_IN",
      },
      keywords: [
        "Skin Clinic Meerut",
        "Laser Hair Removal Meerut",
        "Acne Treatment Meerut",
        "HydraFacial Meerut",
        "SkinLuxe Aesthetics & Academy",
        "Dermatology Meerut",
        "Pigmentation Treatment Meerut",
        "Anti-Aging Clinic Meerut",
        "Aesthetic Clinic Begum Bridge"
      ],
      authors: [{ name: settings?.siteName || "SkinLuxe Aesthetics & Academy" }],
      robots: {
        index: true,
        follow: true,
      },
    };
  } catch (error) {
    // Fallback to default metadata if fetch fails
    return {
      title: "SkinLuxe Aesthetics & Academy | Laser, Skin & Aesthetic Clinic, Begum Bridge Meerut",
      description: "SkinLuxe Meerut – Advanced Laser Hair Reduction, Skin Treatments, Acne & Pigmentation Cure, HydraFacial, Anti-Aging, and Aesthetic Services. Located at Begum Bridge Road, Meerut.",
      icons: {
        icon: '/skinluxe-logo.png',
        apple: '/skinluxe-logo.png',
      },
      openGraph: {
        title: "SkinLuxe Aesthetics & Academy | Premium Skin & Laser Clinic Meerut",
        description: "Advanced skin treatments, laser hair reduction, and aesthetic procedures in Meerut. Expert dermatology care.",
        url: "https://skinluxe-meerut.com",
        type: "website",
        siteName: "SkinLuxe Aesthetics & Academy",
        locale: "en_IN",
      },
      keywords: [
        "Skin Clinic Meerut",
        "Laser Hair Removal Meerut",
        "Acne Treatment Meerut",
        "HydraFacial Meerut",
        "SkinLuxe Aesthetics & Academy",
        "Dermatology Meerut",
        "Pigmentation Treatment Meerut",
        "Anti-Aging Clinic Meerut",
        "Aesthetic Clinic Begum Bridge"
      ],
      authors: [{ name: "SkinLuxe Aesthetics & Academy" }],
      robots: {
        index: true,
        follow: true,
      },
    };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const brandSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "SkinLuxe Aesthetics & Academy",
    "description": "Advanced laser hair reduction, skin treatments, aesthetic procedures, and dermatology academy in Meerut.",
    "url": "https://skinluxe-meerut.com",
    "telephone": ["+91-74519-10272", "+91-93184-52282"],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Begum Bridge Road, Near Kalyan Jewellers",
      "addressLocality": "Meerut",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "250002",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 29.0156,
      "longitude": 77.7045
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "10:00",
      "closes": "20:00"
    },
    "priceRange": "₹₹₹"
  };

  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable}`}>
      <body className="font-sans antialiased bg-[#FFFFFF] text-[#000000]">
        <script
          type="application/ld+json"
          data-schema="brand"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(brandSchema) }}
        />
        <SettingsProvider>
          <DynamicFavicon />
          <DynamicSchema />
          <DynamicColors />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster position="top-center" toastOptions={{
            style: {
              background: '#FFFFFF',
              color: '#000000',
              border: '1px solid #E91E63',
              fontFamily: 'var(--font-serif)'
            }
          }} />
        </SettingsProvider>
      </body>
    </html>
  );
}
