import Link from 'next/link';
import { Crown, Palette, Gem, Users, ArrowRight, Star, Award } from 'lucide-react';

export const metadata = {
    title: 'Heritage Jewellery Collection | ZEVARAZ Jaipur',
    description: 'Discover ZEVARAZ heritage jewellery collection. Traditional Polki, Jadau, and Kundan pieces celebrating Jaipur\'s royal legacy. Handcrafted heritage jewellery in Vidhyadhar Nagar.',
    keywords: [
        'Jaipur Heritage Jewellery',
        'Handcrafted Jewellery Jaipur',
        'Polki Jewellery Jaipur',
        'Jadau Jewellery',
        'Kundan Heritage',
        'Traditional Jewellery Vidhyadhar Nagar'
    ]
};

export default function HeritagePage() {
    const heritageStyles = [
        {
            title: 'Polki',
            subtitle: 'Uncut Diamond Brilliance',
            description: 'Polki jewellery showcases uncut diamonds in their raw, natural beauty. This ancient technique celebrates the inherent character of each stone, creating pieces that are truly one-of-a-kind.',
            techniques: ['Raw Diamond Setting', 'Gold Foil Backing', 'Traditional Meenakari', 'Hand-Cut Stones'],
            icon: Gem
        },
        {
            title: 'Jadau',
            subtitle: 'Royal Embedding Art',
            description: 'Jadau is the art of embedding precious stones into gold without the use of any adhesive. This centuries-old technique requires exceptional skill and patience, passed down through generations.',
            techniques: ['Stone Embedding', 'Pure Gold Work', 'Intricate Patterns', 'Royal Designs'],
            icon: Crown
        },
        {
            title: 'Kundan',
            subtitle: 'Pure Gold Refinement',
            description: 'Kundan jewellery represents the pinnacle of gold craftsmanship. Highly refined pure gold is used to set precious stones, creating a seamless, lustrous finish that has adorned royalty for centuries.',
            techniques: ['Pure Gold Setting', 'Lac Work', 'Stone Arrangement', 'Meenakari Reverse'],
            icon: Palette
        }
    ];

    const craftTimeline = [
        {
            era: '16th Century',
            title: 'Royal Patronage',
            description: 'Mughal emperors establish Jaipur as the jewellery capital, bringing master artisans to the Pink City.'
        },
        {
            era: '18th Century',
            title: 'Maharaja\'s Legacy',
            description: 'Jaipur\'s royal family commissions elaborate pieces, perfecting traditional techniques.'
        },
        {
            era: '20th Century',
            title: 'Heritage Preservation',
            description: 'Master craftsmen preserve ancient techniques while adapting to contemporary aesthetics.'
        },
        {
            era: 'Today',
            title: 'ZEVARAZ Legacy',
            description: 'We honor this rich heritage, creating pieces that bridge tradition and modernity.'
        }
    ];

    const artisanStory = [
        {
            icon: Users,
            title: 'Generational Mastery',
            description: 'Our artisans have inherited their craft through family lineages spanning centuries'
        },
        {
            icon: Award,
            title: 'Traditional Techniques',
            description: 'Every piece is created using time-honored methods passed down through generations'
        },
        {
            icon: Star,
            title: 'Contemporary Vision',
            description: 'Ancient craftsmanship meets modern design sensibilities'
        }
    ];

    return (
        <div>
            {/* Hero Section */}
            <section className="relative h-[85vh] bg-gradient-to-br from-[#E8D5C4] via-[#F4E4C1] to-[#E8D5C4] flex items-center justify-center overflow-hidden">
                {/* Decorative Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle, #D4AF37 1px, transparent 1px)`,
                        backgroundSize: '30px 30px'
                    }}></div>
                </div>

                <div className="container relative z-10 text-center">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <Crown className="w-6 h-6 text-[#D4AF37]" />
                        <span className="text-sm tracking-[0.3em] uppercase text-[#D4AF37] font-serif">
                            Heritage Collection
                        </span>
                        <Crown className="w-6 h-6 text-[#D4AF37]" />
                    </div>

                    <h1 className="font-serif text-[#1A1A1A] mb-6 leading-[1.1] fade-in-up">
                        Celebrating Jaipur's
                        <br />
                        <span className="text-[#D4AF37]">Royal Legacy</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-[#1A1A1A]/70 mb-10 max-w-3xl mx-auto leading-relaxed">
                        Centuries of craftsmanship, tradition, and artistry. Our heritage collection honors
                        the timeless techniques that have made Jaipur the jewellery capital of India.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="btn-luxury-filled group">
                            Explore Heritage
                            <ArrowRight className="inline-block ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </button>
                        <Link href="/about">
                            <button className="btn-luxury">
                                Our Story
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-[#D4AF37] rounded-full flex justify-center pt-2">
                        <div className="w-1 h-3 bg-[#D4AF37] rounded-full" />
                    </div>
                </div>
            </section>

            {/* Jaipur Heritage Story */}
            <section className="bg-white">
                <div className="container">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="aspect-square bg-gradient-to-br from-[#F4E4C1] to-[#E8D5C4] rounded-sm flex items-center justify-center img-overlay-gold">
                            <div className="text-center">
                                <Crown className="w-32 h-32 text-[#D4AF37] mx-auto mb-4" />
                                <p className="text-[#1A1A1A]/40 font-serif text-xl">Jaipur Heritage</p>
                            </div>
                        </div>

                        <div>
                            <span className="text-sm tracking-[0.3em] uppercase text-[#D4AF37] font-serif block mb-4">
                                Our Heritage
                            </span>
                            <h2 className="font-serif text-[#1A1A1A] mb-6">
                                The Pink City's
                                <br />
                                Jewellery Legacy
                            </h2>
                            <div className="space-y-6 text-lg text-[#1A1A1A]/70 leading-relaxed">
                                <p>
                                    For over 400 years, Jaipur has been synonymous with exceptional jewellery
                                    craftsmanship. The city's rich royal heritage and skilled artisan community
                                    have created a legacy that continues to inspire the world.
                                </p>
                                <p>
                                    ZEVARAZ is proud to be part of this illustrious tradition. Our heritage
                                    collection celebrates the techniques, designs, and artistry that have been
                                    perfected over centuries in the workshops of the Pink City.
                                </p>
                                <p>
                                    Each piece in our heritage collection is a bridge between past and present –
                                    honoring traditional craftsmanship while embracing contemporary elegance.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Heritage Styles */}
            <section className="bg-[#FDFBF7]">
                <div className="container">
                    <div className="text-center mb-16">
                        <span className="text-sm tracking-[0.3em] uppercase text-[#D4AF37] font-serif block mb-4">
                            Traditional Techniques
                        </span>
                        <h2 className="font-serif text-[#1A1A1A] mb-6">
                            The Art of Heritage Jewellery
                        </h2>
                        <p className="text-lg text-[#1A1A1A]/70 max-w-3xl mx-auto leading-relaxed">
                            Three ancient techniques define Jaipur's jewellery heritage, each requiring years
                            of training and exceptional skill.
                        </p>
                    </div>

                    <div className="space-y-24">
                        {heritageStyles.map((style, index) => {
                            const Icon = style.icon;
                            const isEven = index % 2 === 0;

                            return (
                                <div
                                    key={index}
                                    className={`grid lg:grid-cols-2 gap-12 items-center ${isEven ? '' : 'lg:grid-flow-dense'
                                        }`}
                                >
                                    {/* Image */}
                                    <div className={isEven ? '' : 'lg:col-start-2'}>
                                        <div className="aspect-[4/5] bg-gradient-to-br from-[#F4E4C1] to-[#E8D5C4] rounded-sm flex flex-col items-center justify-center img-overlay-gold p-8">
                                            <Icon className="w-24 h-24 text-[#D4AF37] mb-6" />
                                            <h3 className="font-serif text-3xl text-[#1A1A1A]/40 mb-2">{style.title}</h3>
                                            <p className="text-[#1A1A1A]/30 font-serif text-sm">{style.subtitle}</p>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className={isEven ? '' : 'lg:col-start-1 lg:row-start-1'}>
                                        <div className="flex items-center gap-3 mb-4">
                                            <Icon className="w-6 h-6 text-[#D4AF37]" />
                                            <span className="text-sm tracking-[0.3em] uppercase text-[#D4AF37] font-serif">
                                                {style.subtitle}
                                            </span>
                                        </div>

                                        <h3 className="font-serif text-4xl text-[#1A1A1A] mb-6">
                                            {style.title}
                                        </h3>

                                        <p className="text-lg text-[#1A1A1A]/70 leading-relaxed mb-8">
                                            {style.description}
                                        </p>

                                        <div className="space-y-3 mb-8">
                                            <h4 className="font-serif text-lg text-[#1A1A1A] mb-3">Key Techniques:</h4>
                                            {style.techniques.map((technique, i) => (
                                                <div key={i} className="flex items-center gap-2 text-[#1A1A1A]/60">
                                                    <Star className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                                                    <span>{technique}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <button className="btn-luxury group">
                                            View {style.title} Collection
                                            <ArrowRight className="inline-block ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Craftsmanship Timeline */}
            <section className="bg-white">
                <div className="container">
                    <div className="text-center mb-16">
                        <span className="text-sm tracking-[0.3em] uppercase text-[#D4AF37] font-serif block mb-4">
                            Timeline
                        </span>
                        <h2 className="font-serif text-[#1A1A1A] mb-6">
                            Centuries of Excellence
                        </h2>
                        <p className="text-lg text-[#1A1A1A]/70 max-w-3xl mx-auto leading-relaxed">
                            The evolution of Jaipur's jewellery heritage through the ages
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="space-y-12">
                            {craftTimeline.map((period, index) => (
                                <div key={index} className="relative pl-12 border-l-2 border-[#D4AF37]/30">
                                    <div className="absolute -left-3 top-0 w-6 h-6 bg-[#D4AF37] rounded-full flex items-center justify-center">
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                    </div>

                                    <span className="text-sm tracking-wider uppercase text-[#D4AF37] font-serif block mb-2">
                                        {period.era}
                                    </span>
                                    <h3 className="font-serif text-2xl text-[#1A1A1A] mb-3">
                                        {period.title}
                                    </h3>
                                    <p className="text-lg text-[#1A1A1A]/70 leading-relaxed">
                                        {period.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Artisan Story */}
            <section className="bg-[#FDFBF7]">
                <div className="container">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-sm tracking-[0.3em] uppercase text-[#D4AF37] font-serif block mb-4">
                                Karigari
                            </span>
                            <h2 className="font-serif text-[#1A1A1A] mb-6">
                                The Jaipur
                                <br />
                                Artisan Story
                            </h2>
                            <div className="space-y-6 text-lg text-[#1A1A1A]/70 leading-relaxed mb-8">
                                <p>
                                    Behind every ZEVARAZ heritage piece is a master artisan whose family has
                                    practiced this craft for generations. These skilled karigars (craftsmen)
                                    are the guardians of techniques that have been refined over centuries.
                                </p>
                                <p>
                                    In the traditional workshops of Jaipur, knowledge is passed from father to
                                    son, from master to apprentice. Each artisan brings not just skill, but a
                                    deep understanding of the cultural significance and artistic heritage of
                                    their work.
                                </p>
                                <p>
                                    At ZEVARAZ, we honor this legacy by providing our artisans with the respect,
                                    resources, and creative freedom they deserve, ensuring that these precious
                                    techniques continue to thrive.
                                </p>
                            </div>

                            <div className="space-y-6">
                                {artisanStory.map((item, index) => {
                                    const Icon = item.icon;
                                    return (
                                        <div key={index} className="flex gap-4">
                                            <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center flex-shrink-0">
                                                <Icon className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h4 className="font-serif text-lg text-[#1A1A1A] mb-1">
                                                    {item.title}
                                                </h4>
                                                <p className="text-[#1A1A1A]/60">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="aspect-[3/4] bg-gradient-to-br from-[#E8D5C4] to-[#F4E4C1] rounded-sm flex items-center justify-center img-overlay-gold">
                            <div className="text-center">
                                <Users className="w-32 h-32 text-[#D4AF37] mx-auto mb-4" />
                                <p className="text-[#1A1A1A]/40 font-serif text-xl">Master Artisans</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Heritage Collection Grid */}
            <section className="bg-white">
                <div className="container">
                    <div className="text-center mb-16">
                        <span className="text-sm tracking-[0.3em] uppercase text-[#D4AF37] font-serif block mb-4">
                            Collections
                        </span>
                        <h2 className="font-serif text-[#1A1A1A]">
                            Heritage Inspired Pieces
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {['Royal Necklaces', 'Heritage Earrings', 'Traditional Bangles', 'Vintage Rings', 'Maang Tikka', 'Choker Sets'].map((item, index) => (
                            <div key={index} className="card-luxury overflow-hidden group">
                                <div className="aspect-square bg-gradient-to-br from-[#F4E4C1] to-[#E8D5C4] flex items-center justify-center img-overlay-gold">
                                    <Crown className="w-16 h-16 text-[#D4AF37]" />
                                </div>
                                <div className="p-6">
                                    <h3 className="font-serif text-xl text-[#1A1A1A] mb-2">
                                        {item}
                                    </h3>
                                    <span className="text-sm text-[#D4AF37] group-hover:gap-2 flex items-center gap-1 transition-all">
                                        Explore <ArrowRight className="w-4 h-4" />
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-[#1A1A1A] text-white">
                <div className="container text-center">
                    <Crown className="w-16 h-16 text-[#D4AF37] mx-auto mb-6" />
                    <h2 className="font-serif text-white mb-6">
                        Experience Heritage Craftsmanship
                    </h2>
                    <p className="text-xl text-white/70 mb-10 max-w-3xl mx-auto leading-relaxed">
                        Visit our showroom to witness the artistry of our heritage collection.
                        Each piece carries centuries of tradition and the promise of timeless beauty.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contact">
                            <button className="btn-luxury-filled bg-[#D4AF37] border-[#D4AF37] hover:bg-white hover:text-[#1A1A1A]">
                                Book Appointment
                            </button>
                        </Link>
                        <Link href="/about">
                            <button className="btn-luxury border-white text-white hover:bg-white hover:text-[#1A1A1A]">
                                Learn More
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Cultural Inspiration */}
            <section className="bg-gradient-to-br from-[#F4E4C1] to-[#E8D5C4]">
                <div className="container text-center">
                    <h2 className="font-serif text-[#1A1A1A] mb-6">
                        Preserving Cultural Heritage
                    </h2>
                    <p className="text-lg text-[#1A1A1A]/70 mb-8 max-w-3xl mx-auto leading-relaxed">
                        At ZEVARAZ, we are committed to preserving and celebrating Jaipur's rich jewellery
                        heritage. Every heritage piece we create honors the past while embracing the future,
                        ensuring these precious traditions continue to inspire for generations to come.
                    </p>
                    <Link href="/collections">
                        <button className="btn-luxury-filled">
                            Explore All Collections
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
