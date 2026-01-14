"use client";

import React, { useEffect, useState } from 'react';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
import Link from 'next/link';
import api from '@/lib/api'; // Using web api client

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    coverImage: string | null;
    createdAt: string;
    published: boolean;
    user: {
        firstName: string;
        lastName: string;
    }
}

// Static posts locally created (not in DB yet)
const STATIC_POSTS: BlogPost[] = [
    {
        id: 'acne-treatment-meerut-static',
        title: 'Acne Treatment in Meerut: Why It Returns & What Works',
        slug: '/blogs/acne-treatment-meerut', // Full path for static page
        excerpt: 'A dermatological breakdown of persistent acne, hormonal triggers, and safe medical solutions designed for Indian skin.',
        coverImage: null,
        createdAt: new Date().toISOString(),
        published: true,
        user: {
            firstName: 'Alka Yadav, Cosmetologist',
            lastName: ''
        }
    }
];

export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await api.get('/blog'); // Endpoint /api/blog
                // Filter only published if needed, or sort
                const publishedPosts = res.data.filter((p: BlogPost) => p.published);

                // Combine static and dynamic posts
                setPosts([...STATIC_POSTS, ...publishedPosts]);
            } catch (error) {
                console.error("Failed to fetch blog posts", error);
                // Fallback to static posts if API fails
                setPosts(STATIC_POSTS);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'long', day: 'numeric', year: 'numeric'
        });
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Header */}
            {/* Header */}
            <section className="relative min-h-[50vh] flex items-center justify-center bg-[#1C1C1C] text-white pt-32 pb-20">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="container relative z-10 text-center max-w-4xl">
                    <span className="inline-block py-2 px-4 border border-[#B4838D] text-[#B4838D] text-xs font-serif tracking-[0.2em] uppercase mb-6">
                        Insights & News
                    </span>
                    <h1 className="font-serif text-4xl md:text-7xl mb-6 leading-tight">
                        <span className="text-white">SkinLuxe</span> <span className="text-white/80 italic">Journal</span>
                    </h1>
                    <p className="text-white/70 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
                        Expert advice on skincare, treatment guides, and the latest from our clinic.
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    {loading ? (
                        <div className="text-center py-20 text-gray-400">Loading articles...</div>
                    ) : posts.length === 0 ? (
                        <div className="text-center py-20">
                            <h3 className="text-xl font-serif text-[#1C1C1C] mb-2">No Articles Yet</h3>
                            <p className="text-[#4A4A4A] font-light">Check back soon for our latest updates.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
                            {posts.map((post) => (
                                <Link
                                    key={post.id}
                                    href={post.slug.startsWith('/') ? post.slug : `/blog/${post.slug}`}
                                    className="group cursor-pointer flex flex-col h-full block"
                                >
                                    <article className="flex flex-col h-full">
                                        <div className="h-64 bg-gray-100 overflow-hidden mb-6 relative">
                                            {/* Image placeholder or real image */}
                                            {post.coverImage ? (
                                                <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                            ) : (
                                                <div className="w-full h-full bg-[#1C1C1C] flex items-center justify-center text-white/10 group-hover:bg-[#B4838D] transition-colors duration-500">
                                                    <span className="font-serif italic text-4xl">SL</span>
                                                </div>
                                            )}
                                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-serif uppercase tracking-wider text-[#1C1C1C]">
                                                Skin Health & Education
                                            </div>
                                        </div>

                                        <div className="flex items-center flex-wrap gap-3 text-[10px] text-[#8A8A8A] mb-3 uppercase tracking-wide px-1">
                                            <span className="flex items-center gap-1 whitespace-nowrap">
                                                <Calendar className="w-3 h-3" /> {formatDate(post.createdAt)}
                                            </span>
                                            <span className="w-px h-3 bg-gray-300"></span>
                                            <span className="flex items-center gap-1 whitespace-nowrap">
                                                <User className="w-3 h-3" /> {post.user?.firstName} {post.user?.lastName}
                                            </span>
                                        </div>

                                        <h2 className="font-serif text-2xl text-[#1C1C1C] mb-3 leading-tight group-hover:text-[#B4838D] transition-colors px-1">
                                            {post.title}
                                        </h2>

                                        <p className="text-[#4A4A4A] font-light text-sm leading-relaxed mb-6 line-clamp-3 px-1">
                                            {post.excerpt}
                                        </p>

                                        <div className="mt-auto pt-4 border-t border-[#E6E2DD] mx-1">
                                            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#B4838D] font-medium group-hover:gap-3 transition-all">
                                                Read Article <ArrowRight className="w-3 h-3" />
                                            </span>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
