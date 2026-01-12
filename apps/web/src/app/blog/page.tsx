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

export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await api.get('/blog'); // Endpoint /api/blog
                // Filter only published if needed, or sort
                const publishedPosts = res.data.filter((p: BlogPost) => p.published);
                setPosts(publishedPosts);
            } catch (error) {
                console.error("Failed to fetch blog posts", error);
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
            <section className="py-20 bg-[#F9F8F6] border-b border-[#E6E2DD]">
                <div className="container mx-auto px-4 text-center">
                    <span className="text-[#B4838D] text-xs font-serif tracking-[0.2em] uppercase mb-4 block">
                        Insights & News
                    </span>
                    <h1 className="font-serif text-4xl md:text-5xl text-[#1C1C1C] mb-6">
                        SkinLuxe Journal
                    </h1>
                    <p className="text-[#4A4A4A] font-light max-w-2xl mx-auto">
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
                                <article key={post.id} className="group cursor-pointer flex flex-col h-full">
                                    <div className="h-64 bg-gray-100 overflow-hidden mb-6 relative">
                                        {/* Image placeholder or real image */}
                                        {post.coverImage ? (
                                            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                        ) : (
                                            <div className="w-full h-full bg-[#F0EFEC] flex items-center justify-center text-[#B4838D]/20">
                                                <span className="font-serif italic text-4xl">SL</span>
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-serif uppercase tracking-wider text-[#1C1C1C]">
                                            Article
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 text-xs text-[#8A8A8A] mb-3 uppercase tracking-wider">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" /> {formatDate(post.createdAt)}
                                        </span>
                                        <span className="w-px h-3 bg-gray-300"></span>
                                        <span className="flex items-center gap-1">
                                            <User className="w-3 h-3" /> {post.user?.firstName || 'Admin'}
                                        </span>
                                    </div>

                                    <h2 className="font-serif text-2xl text-[#1C1C1C] mb-3 leading-tight group-hover:text-[#B4838D] transition-colors">
                                        {post.title}
                                    </h2>

                                    <p className="text-[#4A4A4A] font-light text-sm leading-relaxed mb-6 line-clamp-3">
                                        {post.excerpt}
                                    </p>

                                    <div className="mt-auto pt-4 border-t border-[#E6E2DD]">
                                        <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#B4838D] font-medium group-hover:gap-3 transition-all">
                                            Read Article <ArrowRight className="w-3 h-3" />
                                        </span>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
