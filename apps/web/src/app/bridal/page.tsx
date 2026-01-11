import Link from 'next/link';
import Image from 'next/image';
import { Crown, Sparkles, Heart, Star, ArrowRight, Calendar } from 'lucide-react';

export const metadata = {
    title: 'Bridal Jewellery Collection | ZEVARAZ Jaipur',
    description: 'Discover ZEVARAZ exquisite bridal jewellery collection. Handcrafted Kundan, Polki, and Meenakari sets for your special day. Premium bridal jewellery in Vidhyadhar Nagar, Jaipur.',
    keywords: [
        'Bridal Jewellery Jaipur',
        'Bridal Jewellery Vidhyadhar Nagar',
        'Kundan Bridal Set',
        'Polki Bridal Jewellery',
        'Wedding Jewellery Jaipur',
        'Meenakari Bridal Set'
    ]
};

export default function BridalPage() {
    const collections = [
        {
            title: 'Complete Bridal Sets',
            description: 'Comprehensive jewellery ensembles featuring necklace, earrings, maang tikka, bangles, and rings',
            items: ['Grand Necklace', 'Statement Earrings', 'Maang Tikka', 'Bangles Set', 'Cocktail Rings']
        },
        {
            title: 'Polki Masterpieces',
            description: 'Uncut diamond jewellery showcasing raw beauty and traditional craftsmanship',
            items: ['Polki Necklace', 'Polki Choker', 'Polki Earrings', 'Polki Bangles', 'Polki Rings']
        },
        {
            title: 'Kundan Elegance',
            description: 'Pure gold settings with precious stones, creating timeless bridal pieces',
            items: ['Kundan Haar', 'Kundan Jhumkas', 'Kundan Tikka', 'Kundan Kadas', 'Kundan Payal']
        },
        {
            title: 'Meenakari Artistry',
            description: 'Vibrant enamel work combined with precious stones for colorful elegance',
            items: ['Meenakari Necklace', 'Meenakari Earrings', 'Meenakari Bangles', 'Meenakari Tikka', 'Meenakari Rings']
        }
    ];

    const bridalExperience = [
        {
            icon: Crown,
            title: 'Personalized Consultation',
            description: 'One-on-one sessions with our bridal jewellery experts to understand your vision'
        },
        {
            icon: Sparkles,
            title: 'Custom Design',
            description: 'Bespoke pieces crafted exclusively for your special day'
        },
        {
            icon: Heart,
            title: 'Heritage Craftsmanship',
            description: 'Traditional Jaipur techniques passed down through generations'
        },
        {
            icon: Star,
            title: 'Lifetime Care',
            description: 'Complimentary cleaning and maintenance for your bridal treasures'
        }
    ];

    return (
        <div>
            {/* Hero Section */}
            <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/hero-bridal.jpg"
                        alt="Bridal Heritage Collection"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/60 via-[#1A1A1A]/40 to-transparent" />
                </div>

                <div className="container relative z-10 text-center">
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <Crown className="w-6 h-6 text-[#D4AF37]" />
                        <span className="text-sm tracking-[0.3em] uppercase text-[#D4AF37] font-serif">
                            Bridal Collection
                        </span>
                        <Crown className="w-6 h-6 text-[#D4AF37]" />
                    </div>

                    <h1 className="font-serif text-white mb-6 leading-[1.1] fade-in-up">
                        Your Forever Begins
                        <br />
                        <span className="text-[#D4AF37]">With Timeless Beauty</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
                        Exquisite bridal jewellery handcrafted in Jaipur, designed to make your special day
                        unforgettable and become cherished heirlooms for generations.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contact">
                            <button className="btn-luxury-filled group">
                                Book Bridal Consultation
                                <Calendar className="inline-block ml-2 w-4 h-4" />
                            </button>
                        </Link>
                        <button className="btn-luxury border-white text-white hover:bg-white hover:text-[#1A1A1A]">
                            View Collections
                        </button>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-[#D4AF37] rounded-full flex justify-center pt-2">
                        <div className="w-1 h-3 bg-[#D4AF37] rounded-full" />
                    </div>
                </div>
            </section>

            {/* Bridal Story */}
            <section className="bg-white">
                <div className="container">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-sm tracking-[0.3em] uppercase text-[#D4AF37] font-serif block mb-4">
                                The ZEVARAZ Bride
                            </span>
                            <h2 className="font-serif text-[#1A1A1A] mb-6">
                                A Celebration of
                                <br />
                                Jaipur's Bridal Heritage
                            </h2>
                            <div className="space-y-6 text-lg text-[#1A1A1A]/70 leading-relaxed">
                                <p>
                                    Every ZEVARAZ bride is a vision of timeless elegance. Our bridal collection
                                    celebrates the rich heritage of Jaipur's jewellery craftsmanship, where each
                                    piece tells a story of love, tradition, and artistry.
                                </p>
                                <p>
                                    From the intricate Kundan work to the lustrous Polki settings, every element
                                    is meticulously handcrafted by master artisans who have inherited their skills
                                    through generations. We believe your bridal jewellery should be as unique as
                                    your love story.
                                </p>
                                <p>
                                    Our bridal sets are designed not just for your wedding day, but to become
                                    treasured heirlooms that carry your story forward through generations.
                                </p>
                            </div>
                        </div>
                        <div className="aspect-[3/4] bg-gradient-to-br from-[#E8D5C4] to-[#F4E4C1] rounded-sm flex items-center justify-center img-overlay-gold">
                            <div className="text-center">
                                <Crown className="w-32 h-32 text-[#D4AF37] mx-auto mb-4" />
                                <p className="text-[#1A1A1A]/40 font-serif text-xl">Bridal Elegance</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Collections Grid */}
            <section className="bg-[#FDFBF7]">
                <div className="container">
                    <div className="text-center mb-16">
                        <span className="text-sm tracking-[0.3em] uppercase text-[#D4AF37] font-serif block mb-4">
                            Bridal Collections
                        </span>
                        <h2 className="font-serif text-[#1A1A1A] mb-6">
                            Curated for Your Special Day
                        </h2>
                        <p className="text-lg text-[#1A1A1A]/70 max-w-3xl mx-auto leading-relaxed">
                            Explore our carefully curated bridal collections, each piece designed to complement
                            your unique style and celebrate your journey.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {collections.map((collection, index) => (
                            <div key={index} className="card-luxury p-8">
                                <div className="aspect-[4/3] bg-gradient-to-br from-[#F4E4C1] to-[#E8D5C4] rounded-sm mb-6 flex items-center justify-center img-overlay-gold">
                                    <Crown className="w-20 h-20 text-[#D4AF37]" />
                                </div>

                                <h3 className="font-serif text-2xl text-[#1A1A1A] mb-4">
                                    {collection.title}
                                </h3>

                                <p className="text-[#1A1A1A]/70 mb-6 leading-relaxed">
                                    {collection.description}
                                </p>

                                <div className="space-y-2 mb-6">
                                    {collection.items.map((item, i) => (
                                        <div key={i} className="flex items-center gap-2 text-[#1A1A1A]/60">
                                            <Sparkles className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                                            <span className="text-sm">{item}</span>
                                        </div>
                                    ))}
                                </div>

                                <button className="btn-luxury w-full group">
                                    Explore Collection
                                    <ArrowRight className="inline-block ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Jaipur Bride Aesthetic */}
            <section className="bg-white">
                <div className="container">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="order-2 md:order-1 aspect-square bg-gradient-to-br from-[#F4E4C1] to-[#E8D5C4] rounded-sm flex items-center justify-center img-overlay-gold">
                            <div className="text-center">
                                <Heart className="w-32 h-32 text-[#D4AF37] mx-auto mb-4" />
                                <p className="text-[#1A1A1A]/40 font-serif text-xl">Jaipur Bride</p>
                            </div>
                        </div>

                        <div className="order-1 md:order-2">
                            <span className="text-sm tracking-[0.3em] uppercase text-[#D4AF37] font-serif block mb-4">
                                Aesthetic
                            </span>
                            <h2 className="font-serif text-[#1A1A1A] mb-6">
                                The Jaipur Bride
                                <br />
                                Aesthetic
                            </h2>
                            <div className="space-y-6 text-lg text-[#1A1A1A]/70 leading-relaxed">
                                <p>
                                    The Jaipur bride embodies a perfect blend of royal heritage and contemporary
                                    elegance. Our bridal jewellery captures this essence through intricate designs
                                    that honor tradition while embracing modern sensibilities.
                                </p>
                                <p>
                                    Drawing inspiration from the Pink City's majestic palaces and vibrant culture,
                                    each piece reflects the grandeur and grace that define a ZEVARAZ bride.
                                </p>
                                <p>
                                    From the delicate Meenakari work to the bold Polki statements, our collection
                                    offers versatility for every bridal moment – from the mehendi to the reception.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ZEVARAZ Bridal Experience */}
            <section className="bg-[#FDFBF7]">
                <div className="container">
                    <div className="text-center mb-16">
                        <span className="text-sm tracking-[0.3em] uppercase text-[#D4AF37] font-serif block mb-4">
                            Your Journey
                        </span>
                        <h2 className="font-serif text-[#1A1A1A] mb-6">
                            The ZEVARAZ Bridal Experience
                        </h2>
                        <p className="text-lg text-[#1A1A1A]/70 max-w-3xl mx-auto leading-relaxed">
                            We believe in creating more than just jewellery – we create experiences and memories
                            that last a lifetime.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {bridalExperience.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div key={index} className="text-center">
                                    <div className="w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Icon className="w-10 h-10 text-white" />
                                    </div>
                                    <h3 className="font-serif text-xl text-[#1A1A1A] mb-3">
                                        {item.title}
                                    </h3>
                                    <p className="text-[#1A1A1A]/60 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Appointment CTA */}
            <section className="bg-[#1A1A1A] text-white">
                <div className="container text-center">
                    <Crown className="w-16 h-16 text-[#D4AF37] mx-auto mb-6" />
                    <h2 className="font-serif text-white mb-6">
                        Begin Your Bridal Journey
                    </h2>
                    <p className="text-xl text-white/70 mb-10 max-w-3xl mx-auto leading-relaxed">
                        Book a personalized consultation with our bridal jewellery experts. We'll help you
                        create the perfect ensemble for your special day, whether you choose from our
                        collection or design something uniquely yours.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contact">
                            <button className="btn-luxury-filled bg-[#D4AF37] border-[#D4AF37] hover:bg-white hover:text-[#1A1A1A]">
                                Book Bridal Consultation
                            </button>
                        </Link>
                        <a href="tel:+911234567890">
                            <button className="btn-luxury border-white text-white hover:bg-white hover:text-[#1A1A1A]">
                                Call: +91 123 456 7890
                            </button>
                        </a>
                    </div>
                </div>
            </section>

            {/* Visit Showroom */}
            <section className="bg-gradient-to-br from-[#F4E4C1] to-[#E8D5C4]">
                <div className="container text-center">
                    <h2 className="font-serif text-[#1A1A1A] mb-6">
                        Visit Our Bridal Showroom
                    </h2>
                    <p className="text-lg text-[#1A1A1A]/70 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Experience our complete bridal collection in person at our exclusive showroom in
                        Vidhyadhar Nagar, Jaipur. Private appointments available.
                    </p>
                    <Link href="/contact">
                        <button className="btn-luxury-filled">
                            Get Directions
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
