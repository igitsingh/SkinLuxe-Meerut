"use client";

import { useEffect, useState } from "react";
import { FileText, Plus, Search, Edit2, Trash2, Globe, Eye } from "lucide-react";
import api from "@/lib/api";
import LoadingSpinner from "@/lib/LoadingSpinner";

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    published: boolean;
    createdAt: string;
    user: {
        firstName: string;
        lastName: string;
    };
}

export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        excerpt: ""
    });

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await api.get("/admin/blog");
            setPosts(res.data);
        } catch (error) {
            console.error("Failed to fetch posts", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post("/admin/blog", formData);
            setIsModalOpen(false);
            fetchPosts();
            setFormData({ title: "", content: "", excerpt: "" });
        } catch (error) {
            console.error("Failed to create post", error);
            alert("Failed to create post.");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        try {
            await api.delete(`/admin/blog/${id}`);
            fetchPosts();
        } catch (error) {
            alert("Failed to delete post");
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-serif text-dark mb-2">Blog</h1>
                    <p className="text-gray-600">Manage articles and news</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition shadow-md"
                >
                    <Plus className="w-5 h-5" />
                    New Post
                </button>
            </div>

            {/* Content */}
            {loading ? (
                <LoadingSpinner className="py-12" />
            ) : posts.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border border-secondary p-12">
                    <div className="text-center text-gray-500">
                        <FileText className="w-16 h-16 mx-auto mb-4 opacity-30" />
                        <h3 className="text-lg font-medium text-gray-700 mb-2">No Blog Posts</h3>
                        <p className="mb-6">Start writing your first article</p>
                        <button onClick={() => setIsModalOpen(true)} className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg transition">
                            Create First Post
                        </button>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-white rounded-xl shadow-sm border border-secondary overflow-hidden hover:shadow-md transition">
                            <div className="h-40 bg-gray-100 flex items-center justify-center text-gray-400">
                                <FileText className="w-10 h-10 opacity-50" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-serif text-dark mb-2 line-clamp-1">{post.title}</h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <span className={`text-xs px-2 py-1 rounded-full ${post.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                        {post.published ? 'Published' : 'Draft'}
                                    </span>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleDelete(post.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-full"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Create Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl">
                        <form onSubmit={handleCreate}>
                            <div className="flex items-center justify-between p-6 border-b border-gray-100">
                                <h2 className="text-xl font-serif text-dark">New Article</h2>
                                <button type="button" onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">×</button>
                            </div>

                            <div className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                    <input required className="w-full border border-gray-300 rounded-lg p-2"
                                        value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Article Title" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Short Excerpt</label>
                                    <textarea className="w-full border border-gray-300 rounded-lg p-2" rows={2}
                                        value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} placeholder="Brief summary..." />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                                    <textarea required className="w-full border border-gray-300 rounded-lg p-2 font-mono text-sm" rows={8}
                                        value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} placeholder="Write your article content..." />
                                </div>
                            </div>

                            <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                                <button type="submit" className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">Publish</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
