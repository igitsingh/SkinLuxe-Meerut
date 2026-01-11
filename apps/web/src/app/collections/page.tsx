import Link from 'next/link';
import { Crown, Sparkles, Heart, Star, ArrowRight } from 'lucide-react';

export const metadata = {
    title: 'Luxury Jewellery Collections | ZEVARAZ Jaipur',
    description: 'Explore ZEVARAZ luxury jewellery collections - Bridal Heritage, Fine Jewellery, Heritage Polki, and Everyday Luxury. Handcrafted in Jaipur.',
};

export default function CollectionsPage() {
    const collections = [
        {
            id: 'bridal',
            title: 'Bridal Heritage',
            subtitle: 'Kundan & Polki Masterpieces',
            description: 'Exquisite bridal sets handcrafted with traditional Kundan and Polki techniques. Each piece is a celebration of your special day, designed to become a cherished heirloom.',
            icon: Crown,
            features: ['Complete Bridal Sets', 'Maang Tikka', 'Necklace Sets', 'Bangles & Rings'],
            color: 'from-[#F4E4C1] to-[#E8D5C4]',
            href: '/collections/bridal'
        },
        {
            id: 'fine',
            title: 'Fine Jewellery',
            subtitle: 'Contemporary Elegance',
            description: 'Delicate gold pieces for the modern connoisseur. Minimalist designs that blend seamlessly with your everyday style while maintaining an air of sophistication.',
            icon: Sparkles,
            features: ['Gold Necklaces', 'Diamond Studs', 'Delicate Bangles', 'Stackable Rings'],
            color: 'from-[#E8D5C4] to-[#F4E4C1]',
            href: '/collections/fine'
        },
        {
            id: 'heritage',
            title: 'Heritage Collection',
            subtitle: 'Royal Legacy',
            description: 'Traditional Polki jewellery celebrating Jaipur\'s glorious craftsmanship heritage. Pieces that tell stories of royal elegance and timeless beauty.',
            icon: Crown,
            features: ['Polki Necklaces', 'Heritage Chokers', 'Traditional Sets', 'Vintage Designs'],
            color: 'from-[#F4E4C1] to-[#E8D5C4]',
            href: '/collections/heritage'
        },
        {
            id: 'everyday',
            title: 'Everyday Luxury',
            subtitle: 'Modern Essentials',
            description: 'Versatile pieces designed for daily wear. Elegant yet understated, these designs add a touch of luxury to your everyday moments.',
            icon: Heart,
            features: ['Pendants', 'Hoop Earrings', 'Thin Bangles', 'Simple Rings'],
            color: 'from-[#E8D5C4] to-[#F4E4C1]',
            href: '/collections/everyday'
        }
    ];

    return (
        <div>
            {/* Hero Section */}
            <section className="relative h-[60vh] bg-gradient-to-br from-[#F4E4C1] to-[#E8D5C4] flex items-center justify-center">
                <div className="container text-center">
                    <span className="text-sm tracking-[0.3em] uppercase text-[#D4AF37] font-serif block mb-4">
                        Curated Collections
                    </span>
                    <h1 className="font-serif text-[#1A1A1A] mb-6">
                        Discover Timeless Beauty
                    </h1>
                    <p className="text-xl text-[#1A1A1A]/70 max-w-2xl mx-auto leading-relaxed">
                        Each collection is a testament to Jaipur's rich jewellery heritage,
                        handcrafted with passion and precision
                    </p>
                </div>
            </section>

            {/* Collections Grid */}
            <section className="bg-white">
                <div className="container">
                    <div className="space-y-24">
                        {collections.map((collection, index) => {
                            const Icon = collection.icon;
                            const isEven = index % 2 === 0;

                            return (
                                <div
                                    key={collection.id}
                                    className={`grid lg:grid-cols-2 gap-12 items-center ${isEven ? '' : 'lg:grid-flow-dense'
                                        }`}
                                >
                                    {/* Image/Visual */}
                                    <div className={isEven ? '' : 'lg:col-start-2'}>
                                        <div className={`aspect-[4/5] bg-gradient-to-br ${collection.color} rounded-sm flex items-center justify-center img-overlay-gold`}>
                                            <div className="text-center">
                                                <Icon className="w-24 h-24 text-[#D4AF37] mx-auto mb-4" />
                                                <p className="text-[#1A1A1A]/40 font-serif text-lg">
                                                    {collection.title}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className={isEven ? '' : 'lg:col-start-1 lg:row-start-1'}>
                                        <div className="flex items-center gap-3 mb-4">
                                            <Icon className="w-6 h-6 text-[#D4AF37]" />
                                            <span className="text-sm tracking-[0.3em] uppercase text-[#D4AF37] font-serif">
                                                {collection.subtitle}
                                            </span>
                                        </div>

                                        <h2 className="font-serif text-[#1A1A1A] mb-6">
                                            {collection.title}
                                        </h2>

                                        <p className="text-lg text-[#1A1A1A]/70 leading-relaxed mb-8">
                                            {collection.description}
                                        </p>

                                        <div className="mb-8">
                                            <h3 className="font-serif text-lg text-[#1A1A1A] mb-4">
                                                Featured Items
                                            </h3>
                                            <ul className="grid grid-cols-2 gap-3">
                                                {collection.features.map((feature, i) => (
                                                    <li key={i} className="flex items-center gap-2 text-[#1A1A1A]/70">
                                                        <Star className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                                                        <span className="text-sm">{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <Link href={collection.href}>
                                            <button className="btn-luxury-filled group">
                                                Explore Collection
                                                <ArrowRight className="inline-block ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="bg-[#FDFBF7]">
                <div className="container">
                    <div className="text-center mb-12">
                        <span className="text-sm tracking-[0.3em] uppercase text-[#D4AF37] font-serif block mb-4">
                            Shop by Category
                        </span>
                        <h2 className="font-serif text-[#1A1A1A]">
                            Find Your Perfect Piece
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {['Necklaces', 'Earrings', 'Bangles', 'Rings'].map((category) => (
                            <Link
                                key={category}
                                href={`/collections?category=${category.toLowerCase()}`}
                                className="group card-luxury p-8 text-center"
                            >
                                <div className="w-16 h-16 bg-[#F4E4C1] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#D4AF37] transition-colors">
                                    <Sparkles className="w-8 h-8 text-[#D4AF37] group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="font-serif text-xl text-[#1A1A1A] mb-2">
                                    {category}
                                </h3>
                                <span className="text-sm text-[#D4AF37] group-hover:gap-2 flex items-center justify-center gap-1 transition-all">
                                    View All <ArrowRight className="w-4 h-4" />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Custom Design CTA */}
            <section className="bg-[#1A1A1A] text-white">
                <div className="container text-center">
                    <Crown className="w-12 h-12 text-[#D4AF37] mx-auto mb-6" />
                    <h2 className="font-serif text-white mb-6">
                        Create Your Custom Design
                    </h2>
                    <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Have a unique vision? Our master artisans can bring your dream jewellery to life.
                        Book a consultation to discuss your custom design.
                    </p>
                    <Link href="/contact">
                        <button className="btn-luxury-filled bg-[#D4AF37] border-[#D4AF37] hover:bg-white hover:text-[#1A1A1A]">
                            Book Consultation
                        </button>
                    </Link>
                </div>
            </section>

            {/* Visit Showroom CTA */}
            <section className="bg-gradient-to-br from-[#F4E4C1] to-[#E8D5C4]">
                <div className="container text-center">
                    <h2 className="font-serif text-[#1A1A1A] mb-6">
                        Experience ZEVARAZ in Person
                    </h2>
                    <p className="text-lg text-[#1A1A1A]/70 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Visit our showroom in Vidhyadhar Nagar, Jaipur to explore our complete collection
                        and receive personalized guidance from our expert consultants.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contact">
                            <button className="btn-luxury-filled">
                                Get Directions
                            </button>
                        </Link>
                        <Link href="/contact">
                            <button className="btn-luxury">
                                Book Appointment
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
