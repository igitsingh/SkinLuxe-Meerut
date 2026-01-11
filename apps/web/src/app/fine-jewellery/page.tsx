import Link from 'next/link';
import { Sparkles, Circle, Square, Triangle, ArrowRight, Star } from 'lucide-react';

export const metadata = {
    title: 'Fine Jewellery Collection | ZEVARAZ Jaipur',
    description: 'Discover ZEVARAZ fine jewellery collection. Contemporary luxury pieces in gold and diamonds. Everyday elegance handcrafted in Jaipur. Premium fine jewellery in Vidhyadhar Nagar.',
    keywords: [
        'Fine Jewellery Jaipur',
        'Luxury Jewellery Jaipur',
        'Gold Jewellery Vidhyadhar Nagar',
        'Diamond Jewellery Jaipur',
        'Contemporary Jewellery',
        'Everyday Luxury Jewellery'
    ]
};

export default function FineJewelleryPage() {
    const categories = [
        {
            title: 'Necklaces & Pendants',
            subtitle: 'Delicate Elegance',
            description: 'Minimalist gold necklaces and diamond pendants that add a touch of luxury to your everyday style',
            pieces: ['Layered Chains', 'Solitaire Pendants', 'Bar Necklaces', 'Choker Styles'],
            icon: Circle
        },
        {
            title: 'Earrings',
            subtitle: 'Timeless Sophistication',
            description: 'From classic studs to contemporary hoops, each pair is crafted to perfection',
            pieces: ['Diamond Studs', 'Gold Hoops', 'Drop Earrings', 'Ear Cuffs'],
            icon: Circle
        },
        {
            title: 'Rings',
            subtitle: 'Stackable Luxury',
            description: 'Delicate bands and statement rings designed for modern elegance',
            pieces: ['Stackable Bands', 'Solitaire Rings', 'Cocktail Rings', 'Midi Rings'],
            icon: Circle
        },
        {
            title: 'Bracelets & Bangles',
            subtitle: 'Wrist Artistry',
            description: 'Refined pieces that move gracefully with you throughout your day',
            pieces: ['Tennis Bracelets', 'Thin Bangles', 'Chain Bracelets', 'Cuff Styles'],
            icon: Circle
        }
    ];

    const craftsmanshipPoints = [
        {
            title: 'Pure Materials',
            description: '18K and 22K gold, ethically sourced diamonds, and precious gemstones'
        },
        {
            title: 'Minimal Design',
            description: 'Clean lines and contemporary aesthetics that transcend trends'
        },
        {
            title: 'Handcrafted Detail',
            description: 'Every piece meticulously crafted by skilled Jaipur artisans'
        },
        {
            title: 'Versatile Wear',
            description: 'Designed to complement both casual and formal occasions'
        }
    ];

    return (
        <div>
            {/* Hero Section */}
            <section className="relative h-[80vh] bg-white flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white via-[#FDFBF7] to-[#F4E4C1] opacity-60"></div>

                <div className="container relative z-10">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-2 mb-6">
                            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                            <span className="text-sm tracking-[0.3em] uppercase text-[#D4AF37] font-serif">
                                Fine Jewellery
                            </span>
                        </div>

                        <h1 className="font-serif text-[#1A1A1A] mb-6 leading-[1.1] fade-in-up">
                            Everyday Luxury,
                            <br />
                            <span className="text-[#D4AF37]">Timeless Elegance</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-[#1A1A1A]/70 mb-10 max-w-2xl leading-relaxed">
                            Contemporary fine jewellery that seamlessly blends into your lifestyle.
                            Minimalist designs crafted with exceptional attention to detail.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="btn-luxury-filled group">
                                Explore Collection
                                <ArrowRight className="inline-block ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </button>
                            <Link href="/contact">
                                <button className="btn-luxury">
                                    Book Appointment
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-20 right-20 w-32 h-32 border border-[#D4AF37]/20 rounded-full hidden lg:block"></div>
                <div className="absolute bottom-20 right-40 w-20 h-20 border border-[#D4AF37]/20 rounded-full hidden lg:block"></div>
            </section>

            {/* Philosophy */}
            <section className="bg-[#FDFBF7]">
                <div className="container">
                    <div className="max-w-4xl mx-auto text-center">
                        <span className="text-sm tracking-[0.3em] uppercase text-[#D4AF37] font-serif block mb-4">
                            Our Philosophy
                        </span>
                        <h2 className="font-serif text-[#1A1A1A] mb-6">
                            Contemporary Luxury for Modern Life
                        </h2>
                        <p className="text-xl text-[#1A1A1A]/70 leading-relaxed mb-8">
                            ZEVARAZ fine jewellery celebrates the beauty of simplicity. Each piece is designed
                            to be a constant companion – subtle enough for everyday wear, yet distinctive enough
                            to make a statement. We believe luxury should be accessible, wearable, and timeless.
                        </p>
                        <div className="divider-luxury"></div>
                    </div>
                </div>
            </section>

            {/* Categories Grid */}
            <section className="bg-white">
                <div className="container">
                    <div className="text-center mb-16">
                        <span className="text-sm tracking-[0.3em] uppercase text-[#D4AF37] font-serif block mb-4">
                            Collections
                        </span>
                        <h2 className="font-serif text-[#1A1A1A]">
                            Discover Your Perfect Piece
                        </h2>
                    </div>

                    <div className="space-y-24">
                        {categories.map((category, index) => {
                            const Icon = category.icon;
                            const isEven = index % 2 === 0;

                            return (
                                <div
                                    key={index}
                                    className={`grid lg:grid-cols-2 gap-12 items-center ${isEven ? '' : 'lg:grid-flow-dense'
                                        }`}
                                >
                                    {/* Image */}
                                    <div className={isEven ? '' : 'lg:col-start-2'}>
                                        <div className="aspect-square bg-gradient-to-br from-[#FDFBF7] to-[#F4E4C1] rounded-sm flex items-center justify-center img-overlay-gold">
                                            <div className="text-center">
                                                <Icon className="w-24 h-24 text-[#D4AF37] mx-auto mb-4 stroke-1" />
                                                <p className="text-[#1A1A1A]/30 font-serif text-lg">{category.title}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className={isEven ? '' : 'lg:col-start-1 lg:row-start-1'}>
                                        <span className="text-sm tracking-[0.3em] uppercase text-[#D4AF37] font-serif block mb-3">
                                            {category.subtitle}
                                        </span>

                                        <h3 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] mb-6">
                                            {category.title}
                                        </h3>

                                        <p className="text-lg text-[#1A1A1A]/70 leading-relaxed mb-8">
                                            {category.description}
                                        </p>

                                        <div className="grid grid-cols-2 gap-3 mb-8">
                                            {category.pieces.map((piece, i) => (
                                                <div key={i} className="flex items-center gap-2 text-[#1A1A1A]/60">
                                                    <Star className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                                                    <span className="text-sm">{piece}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <button className="btn-luxury group">
                                            View Collection
                                            <ArrowRight className="inline-block ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Craftsmanship */}
            <section className="bg-[#FDFBF7]">
                <div className="container">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-sm tracking-[0.3em] uppercase text-[#D4AF37] font-serif block mb-4">
                                Craftsmanship
                            </span>
                            <h2 className="font-serif text-[#1A1A1A] mb-6">
                                Precision Meets
                                <br />
                                Artistry
                            </h2>
                            <div className="space-y-6 text-lg text-[#1A1A1A]/70 leading-relaxed mb-8">
                                <p>
                                    Our fine jewellery collection represents the pinnacle of contemporary design
                                    and traditional craftsmanship. Each piece begins with a vision of modern
                                    elegance and is brought to life by master artisans in Jaipur.
                                </p>
                                <p>
                                    We use only the finest materials – 18K and 22K gold, ethically sourced
                                    diamonds, and carefully selected gemstones. Every detail, from the initial
                                    sketch to the final polish, is executed with meticulous precision.
                                </p>
                            </div>

                            <div className="space-y-4">
                                {craftsmanshipPoints.map((point, index) => (
                                    <div key={index} className="border-l-2 border-[#D4AF37] pl-4">
                                        <h4 className="font-serif text-lg text-[#1A1A1A] mb-1">
                                            {point.title}
                                        </h4>
                                        <p className="text-[#1A1A1A]/60 text-sm">
                                            {point.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="aspect-[3/4] bg-gradient-to-br from-[#F4E4C1] to-[#E8D5C4] rounded-sm flex items-center justify-center img-overlay-gold">
                            <div className="text-center">
                                <Sparkles className="w-32 h-32 text-[#D4AF37] mx-auto mb-4" />
                                <p className="text-[#1A1A1A]/40 font-serif text-xl">Fine Craftsmanship</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Material Purity */}
            <section className="bg-white">
                <div className="container">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-8">
                            <div className="w-16 h-16 bg-[#F4E4C1] rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-2xl font-serif text-[#D4AF37]">18K</span>
                            </div>
                            <h3 className="font-serif text-xl text-[#1A1A1A] mb-3">
                                Premium Gold
                            </h3>
                            <p className="text-[#1A1A1A]/60 leading-relaxed">
                                75% pure gold alloy, perfect balance of durability and luxury
                            </p>
                        </div>

                        <div className="text-center p-8">
                            <div className="w-16 h-16 bg-[#F4E4C1] rounded-full flex items-center justify-center mx-auto mb-6">
                                <Sparkles className="w-8 h-8 text-[#D4AF37]" />
                            </div>
                            <h3 className="font-serif text-xl text-[#1A1A1A] mb-3">
                                Certified Diamonds
                            </h3>
                            <p className="text-[#1A1A1A]/60 leading-relaxed">
                                Ethically sourced, certified for quality and brilliance
                            </p>
                        </div>

                        <div className="text-center p-8">
                            <div className="w-16 h-16 bg-[#F4E4C1] rounded-full flex items-center justify-center mx-auto mb-6">
                                <Star className="w-8 h-8 text-[#D4AF37]" />
                            </div>
                            <h3 className="font-serif text-xl text-[#1A1A1A] mb-3">
                                Precious Stones
                            </h3>
                            <p className="text-[#1A1A1A]/60 leading-relaxed">
                                Carefully selected gemstones for color and clarity
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Styling Guide */}
            <section className="bg-[#FDFBF7]">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center">
                        <span className="text-sm tracking-[0.3em] uppercase text-[#D4AF37] font-serif block mb-4">
                            Styling
                        </span>
                        <h2 className="font-serif text-[#1A1A1A] mb-6">
                            Versatile Elegance
                        </h2>
                        <p className="text-lg text-[#1A1A1A]/70 leading-relaxed mb-8">
                            Our fine jewellery is designed to transition seamlessly from day to night,
                            from boardroom to dinner. Layer delicate necklaces, stack rings, or let a
                            single statement piece shine. The choice is yours.
                        </p>
                        <button className="btn-luxury-filled">
                            View Full Line
                        </button>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-[#1A1A1A] text-white">
                <div className="container text-center">
                    <Sparkles className="w-12 h-12 text-[#D4AF37] mx-auto mb-6" />
                    <h2 className="font-serif text-white mb-6">
                        Discover Your Signature Piece
                    </h2>
                    <p className="text-xl text-white/70 mb-10 max-w-3xl mx-auto leading-relaxed">
                        Visit our showroom to explore the complete fine jewellery collection.
                        Our experts will help you find pieces that perfectly complement your style.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contact">
                            <button className="btn-luxury-filled bg-[#D4AF37] border-[#D4AF37] hover:bg-white hover:text-[#1A1A1A]">
                                Book Private Viewing
                            </button>
                        </Link>
                        <Link href="/collections">
                            <button className="btn-luxury border-white text-white hover:bg-white hover:text-[#1A1A1A]">
                                Browse All Collections
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
