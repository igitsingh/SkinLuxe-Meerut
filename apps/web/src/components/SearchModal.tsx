
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { X, Search, ChevronRight, Loader2 } from 'lucide-react';
import api from '@/lib/api';
import LoadingSpinner from './LoadingSpinner';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface SearchResult {
    type: 'Treatment' | 'Page' | 'Blog';
    title: string;
    href: string;
    description?: string;
}

const STATIC_PAGES: SearchResult[] = [
    { type: 'Page', title: 'Home', href: '/', description: 'Welcome to SkinLuxe' },
    { type: 'Page', title: 'About Us', href: '/about', description: 'Learn about our clinic and founder' },
    { type: 'Page', title: 'Contact', href: '/contact', description: 'Get in touch or visit us' },
    { type: 'Page', title: 'Academy', href: '/academy', description: 'Professional Cosmetology Training' },
    { type: 'Page', title: 'Testimonials', href: '/testimonials', description: 'Client Success Stories' },
    { type: 'Page', title: 'Blog', href: '/blog', description: 'Skin Care Tips & News' },
];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [treatments, setTreatments] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(true);
    const inputRef = useRef<HTMLInputElement>(null);

    // Fetch treatments on mount (so they are ready when valid search happens)
    useEffect(() => {
        const fetchTreatments = async () => {
            try {
                const res = await api.get('/treatments');
                const mapped = res.data.map((t: any) => ({
                    type: 'Treatment',
                    title: t.name,
                    href: `/treatments/${t.slug}`,
                    description: t.description
                }));
                setTreatments(mapped);
            } catch (e) {
                console.error("Search fetch failed", e);
            } finally {
                setLoading(false);
            }
        };
        fetchTreatments();
    }, []);

    // Auto-focus input when opened
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            setQuery('');
        }
    }, [isOpen]);

    // Filter Logic
    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        const lowerQ = query.toLowerCase();

        // Combine all searchable items
        const allItems = [...STATIC_PAGES, ...treatments];

        const filtered = allItems.filter(item =>
            item.title.toLowerCase().includes(lowerQ) ||
            item.description?.toLowerCase().includes(lowerQ)
        ).slice(0, 8); // Limit to 8 results

        setResults(filtered);
    }, [query, treatments]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-white/98 backdrop-blur-xl animate-fadeIn">
            {/* Header */}
            <div className="container py-8 flex justify-end">
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors group"
                >
                    <X className="w-8 h-8 text-[#1C1C1C] group-hover:text-[#B4838D] transition-colors" />
                </button>
            </div>

            {/* Content */}
            <div className="container max-w-4xl pt-10">
                <div className="relative border-b-2 border-[#1C1C1C] mb-12">
                    <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 text-[#1C1C1C]/50" />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search treatments, pages..."
                        className="w-full bg-transparent py-4 pl-14 pr-4 text-3xl md:text-5xl font-serif text-[#1C1C1C] placeholder:text-[#1C1C1C]/20 focus:outline-none"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>

                {/* Results Area */}
                <div className="space-y-2">
                    {loading && (
                        <div className="flex justify-center py-8">
                            <LoadingSpinner size="md" />
                        </div>
                    )}

                    {!loading && query && results.length === 0 && (
                        <p className="text-[#4A4A4A] text-lg font-light">No results found for "{query}"</p>
                    )}

                    {results.map((result, idx) => (
                        <Link
                            key={idx}
                            href={result.href}
                            onClick={onClose}
                            className="group flex items-center justify-between p-6 border-b border-[#E6E2DD] hover:bg-[#F9F8F6] hover:border-[#B4838D] transition-all duration-300"
                        >
                            <div>
                                <span className={`text-[10px] tracking-widest uppercase mb-1 block font-medium ${result.type === 'Treatment' ? 'text-[#B4838D]' : 'text-gray-400'
                                    }`}>
                                    {result.type}
                                </span>
                                <h4 className="text-xl md:text-2xl font-serif text-[#1C1C1C] group-hover:text-[#B4838D] transition-colors">
                                    {result.title}
                                </h4>
                                {result.description && (
                                    <p className="text-sm text-[#4A4A4A] font-light mt-1 max-w-xl truncate">
                                        {result.description}
                                    </p>
                                )}
                            </div>
                            <ChevronRight className="w-6 h-6 text-[#E6E2DD] group-hover:text-[#B4838D] transition-colors -translate-x-4 group-hover:translate-x-0 duration-300 opacity-0 group-hover:opacity-100" />
                        </Link>
                    ))}
                </div>

                {/* Suggestions if empty */}
                {!query && !loading && (
                    <div className="mt-12">
                        <h5 className="text-xs uppercase tracking-widest text-gray-400 mb-6">Popular Searches</h5>
                        <div className="flex flex-wrap gap-4">
                            {['HydraFacial', 'Laser Hair Reduction', 'Contact', 'Academy', 'Peels'].map(term => (
                                <button
                                    key={term}
                                    onClick={() => setQuery(term)}
                                    className="px-6 py-2 border border-[#E6E2DD] rounded-full text-sm text-[#4A4A4A] hover:border-[#B4838D] hover:text-[#B4838D] transition-colors"
                                >
                                    {term}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
