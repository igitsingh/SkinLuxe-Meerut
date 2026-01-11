import React from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, User, Search } from 'lucide-react';

export const metadata = {
    title: 'The SkinLuxe Journal | Expert Skincare Advice & News',
    description: 'Expert insights on medical aesthetics, skincare trends, and dermatological treatments from Dr. Alka and the SkinLuxe team.',
};

export default function BlogPage() {
    const featuredPost = {
        id: 1,
        title: "The Truth About Preventative Botox",
        excerpt: "Starting anti-aging treatments in your 20s might sound premature, but here's why dermatologists are recommending 'baby botox' to stop wrinkles before they start.",
        category: "Injectables",
        date: "Oct 12, 2023",
        author: "Dr. Alka",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2070",
        slug: "truth-about-preventative-botox"
    };

    const posts = [
        {
            id: 2,
            title: "Laser Hair Reduction: Myths vs. Facts",
            excerpt: "Does it hurt? Is it permanent? We debunk the most common myths surrounding laser hair removal and explain the science behind our Soprano Titanium technology.",
            category: "Laser Treatments",
            date: "Sep 28, 2023",
            author: "SkinLuxe Team",
            image: "https://images.unsplash.com/photo-1631214500115-598fc2cb8d2d?auto=format&fit=crop&q=80&w=800",
            slug: "laser-hair-reduction-myths-facts"
        },
        {
            id: 3,
            title: "Winter Skincare Guide: Hydration is Key",
            excerpt: "As the temperature drops, your skin barrier needs extra support. Discover the essential ingredients and treatments to keep your glow through the cold months.",
            category: "Skincare",
            date: "Nov 05, 2023",
            author: "Dr. Alka",
            image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=800",
            slug: "winter-skincare-guide"
        },
        {
            id: 4,
            title: "Why Medical Facials Outperform Salon Facials",
            excerpt: "Stop wasting money on superficial treatments. Learn how medical-grade mediated facials penetrate deeper to treat acne, pigmentation, and aging at the source.",
            category: "Medi-Facials",
            date: "Aug 15, 2023",
            author: "SkinLuxe Team",
            image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800",
            slug: "medical-vs-salon-facials"
        },
        {
            id: 5,
            title: "Understanding Acne Scars & How to Treat Them",
            excerpt: "Not all scars are created equal. From ice-pick to rolling scars, we break down the different types and the specific combination therapies needed to smooth them out.",
            category: "Acne Treatment",
            date: "Jul 22, 2023",
            author: "Dr. Alka",
            image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=800",
            slug: "understanding-acne-scars"
        },
        {
            id: 6,
            title: "The 'Glass Skin' Protocol Explained",
            excerpt: "Everyone is talking about glass skin. Here is our clinic's specific protocol—combining Profhilo, Carbon Peels, and home care—to achieve that translucent, reflective finish.",
            category: "Trends",
            date: "Jun 10, 2023",
            author: "Dr. Alka",
            image: "https://images.unsplash.com/photo-1588661706680-305f810141d6?auto=format&fit=crop&q=80&w=800",
            slug: "glass-skin-protocol"
        }
    ];

    const categories = ["All", "Injectables", "Laser Treatments", "Skincare", "Medi-Facials", "Trends"];

    return (
        <div className="bg-white">
            {/* -----------------------------------------------------------------------
          HERO SECTION
      ----------------------------------------------------------------------- */}
            <section className="relative min-h-[50vh] flex items-center justify-center bg-[#1C1C1C] text-white pt-32 pb-20">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

                <div className="container relative z-10 text-center max-w-4xl">
                    <span className="inline-block py-2 px-4 border border-[#B4838D] text-[#B4838D] text-xs font-serif tracking-[0.2em] uppercase mb-6">
                        The Journal
                    </span>
                    <h1 className="font-serif text-4xl md:text-7xl mb-6 leading-tight">
                        Expert <span className="text-white/80 italic">Insights</span>
                    </h1>
                    <p className="text-white/70 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
                        Deep dives into modern aesthetics, skincare science, and clinic news.
                        Curated by Dr. Alka and the SkinLuxe medical team.
                    </p>
                </div>
            </section>

            {/* -----------------------------------------------------------------------
          NAVIGATION & SEARCH
      ----------------------------------------------------------------------- */}
            <div className="border-b border-[#E6E2DD] bg-white sticky top-0 z-20">
                <div className="container py-4 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex gap-6 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
                        {categories.map((cat, i) => (
                            <button key={i} className={`whitespace-nowrap text-sm tracking-wide ${i === 0 ? 'text-[#1C1C1C] font-semibold border-b-2 border-[#1C1C1C]' : 'text-[#999999] hover:text-[#1C1C1C] transition-colors'} pb-1`}>
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full md:w-64">
                        <input
                            type="text"
                            placeholder="Search articles..."
                            className="w-full bg-[#F9F8F6] border border-[#E6E2DD] px-4 py-2 text-sm focus:outline-none focus:border-[#B4838D]"
                        />
                        <Search className="w-4 h-4 text-[#999999] absolute right-3 top-1/2 transform -translate-y-1/2" />
                    </div>
                </div>
            </div>

            {/* -----------------------------------------------------------------------
          FEATURED POST
      ----------------------------------------------------------------------- */}
            <section className="py-16 md:py-20 bg-[#F9F8F6]">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="order-2 lg:order-1">
                            <div className="flex items-center gap-4 text-xs tracking-widest uppercase text-[#B4838D] font-semibold mb-4">
                                <span>{featuredPost.category}</span>
                                <span className="w-1 h-1 bg-[#1C1C1C] rounded-full"></span>
                                <span className="text-[#999999]">{featuredPost.date}</span>
                            </div>
                            <h2 className="font-serif text-4xl text-[#1C1C1C] mb-6 leading-tight">
                                {featuredPost.title}
                            </h2>
                            <p className="text-[#4A4A4A] text-lg font-light leading-relaxed mb-8">
                                {featuredPost.excerpt}
                            </p>
                            <Link href={`/blog/${featuredPost.slug}`} className="inline-flex items-center gap-2 text-[#1C1C1C] font-medium border-b border-[#1C1C1C] pb-1 hover:text-[#B4838D] hover:border-[#B4838D] transition-all">
                                Read Full Article <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <div className="order-1 lg:order-2 relative aspect-[4/3] w-full overflow-hidden">
                            <div className="absolute inset-0 bg-[#1C1C1C]/10 mix-blend-multiply z-10 transition-opacity hover:opacity-0"></div>
                            <img
                                src={featuredPost.image}
                                alt={featuredPost.title}
                                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* -----------------------------------------------------------------------
          POST GRID
      ----------------------------------------------------------------------- */}
            <section className="py-24 bg-white">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                        {posts.map((post) => (
                            <article key={post.id} className="group flex flex-col h-full cursor-pointer">
                                <div className="relative aspect-[3/2] overflow-hidden mb-6 bg-[#F9F8F6]">
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs tracking-widest z-20">
                                        {post.category}
                                    </div>
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                    />
                                </div>
                                <div className="flex items-center gap-4 text-xs text-[#999999] mb-3">
                                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                                    <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
                                </div>
                                <h3 className="font-serif text-2xl text-[#1C1C1C] mb-3 group-hover:text-[#B4838D] transition-colors leading-snug">
                                    {post.title}
                                </h3>
                                <p className="text-[#4A4A4A] font-light text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
                                    {post.excerpt}
                                </p>
                                <div className="mt-auto">
                                    <span className="text-xs font-semibold uppercase tracking-widest text-[#1C1C1C] group-hover:border-b group-hover:border-[#1C1C1C] pb-0.5 transition-all">
                                        Read Article
                                    </span>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* Pagination Placeholder */}
                    <div className="mt-20 flex justify-center gap-2">
                        <button className="w-10 h-10 flex items-center justify-center border border-[#1C1C1C] bg-[#1C1C1C] text-white text-sm font-medium">1</button>
                        <button className="w-10 h-10 flex items-center justify-center border border-[#E6E2DD] text-[#4A4A4A] hover:bg-[#F9F8F6] text-sm font-medium">2</button>
                        <button className="w-10 h-10 flex items-center justify-center border border-[#E6E2DD] text-[#4A4A4A] hover:bg-[#F9F8F6] text-sm font-medium">3</button>
                        <span className="items-end flex px-2 text-[#999999]">...</span>
                        <button className="w-10 h-10 flex items-center justify-center border border-[#E6E2DD] text-[#4A4A4A] hover:bg-[#F9F8F6] text-sm font-medium"><ArrowRight className="w-4 h-4" /></button>
                    </div>
                </div>
            </section>

            {/* -----------------------------------------------------------------------
          NEWSLETTER CTA
      ----------------------------------------------------------------------- */}
            <section className="py-24 bg-[#1C1C1C] text-white">
                <div className="container max-w-4xl text-center">
                    <h2 className="font-serif text-3xl md:text-5xl mb-6">Stay Radiant</h2>
                    <p className="text-white/60 text-lg font-light mb-10">
                        Join our newsletter for exclusive skincare tips, treatment offers, and the latest news from SkinLuxe.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="flex-grow bg-white/10 border border-white/20 px-6 py-4 text-white placeholder-white/40 focus:outline-none focus:border-[#B4838D] focus:bg-white/5 transition-all"
                        />
                        <button className="bg-[#B4838D] text-white px-8 py-4 font-semibold tracking-widest hover:bg-white hover:text-[#1C1C1C] transition-colors uppercase text-sm">
                            Subscribe
                        </button>
                    </div>
                    <p className="text-xs text-white/30 mt-6">We respect your privacy. No spam, ever.</p>
                </div>
            </section>
        </div>
    );
}
