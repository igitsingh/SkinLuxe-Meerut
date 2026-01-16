"use client";

import { useEffect, useState } from "react";
import { Sparkles, Plus, Edit2, Trash2, Clock, X, Save } from "lucide-react";
import api from "@/lib/api";

interface Treatment {
    id: string;
    name: string;
    slug?: string;
    description: string;
    category: string;
    price: string;
    duration: string;
    isFeatured: boolean;
}

export default function TreatmentsPage() {
    const [treatments, setTreatments] = useState<Treatment[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTreatment, setEditingTreatment] = useState<Treatment | null>(null);

    const [formData, setFormData] = useState<Partial<Treatment>>({
        name: '',
        category: 'Signature',
        price: '',
        duration: '',
        description: '',
        isFeatured: false
    });

    useEffect(() => {
        fetchTreatments();
    }, []);

    const fetchTreatments = async () => {
        try {
            const res = await api.get('/admin/treatments');
            setTreatments(res.data);
        } catch (error) {
            console.error("Failed to fetch treatments", error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenAdd = () => {
        setEditingTreatment(null);
        setFormData({
            name: '',
            category: 'Signature',
            price: '',
            duration: '',
            description: '',
            isFeatured: false
        });
        setIsModalOpen(true);
    };

    const handleEdit = (treatment: Treatment) => {
        setEditingTreatment(treatment);
        setFormData(treatment);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this treatment?")) return;
        try {
            await api.delete(`/admin/treatments/${id}`);
            fetchTreatments();
        } catch (error) {
            console.error("Failed to delete", error);
            alert("Failed to delete treatment");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                // Simple slug generation
                slug: formData.slug || formData.name?.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
            };

            if (editingTreatment) {
                await api.put(`/admin/treatments/${editingTreatment.id}`, payload);
            } else {
                await api.post('/admin/treatments', payload);
            }

            setIsModalOpen(false);
            fetchTreatments();
        } catch (error) {
            console.error("Failed to save", error);
            alert("Failed to save treatment.");
        }
    };

    if (loading) {
        return <div className="p-12 text-center text-gray-500">Loading treatments...</div>;
    }

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-serif text-dark mb-2">Treatments</h1>
                    <p className="text-gray-600">Manage services and treatment packages</p>
                </div>
                <button
                    onClick={handleOpenAdd}
                    className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg transition shadow-md text-sm md:text-base"
                >
                    <Plus className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="hidden sm:inline">Add Treatment</span>
                    <span className="sm:hidden">Add</span>
                </button>
            </div>

            {/* List */}
            {treatments.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border border-secondary p-12">
                    <div className="text-center text-gray-500">
                        <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-30" />
                        <h3 className="text-lg font-medium text-gray-700 mb-2">No Treatments Added</h3>
                        <button onClick={handleOpenAdd} className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg transition">
                            Add First Treatment
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    {/* Desktop Table */}
                    <div className="hidden md:block bg-white rounded-lg shadow-sm border border-secondary overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="p-4 font-serif text-gray-700">Name</th>
                                    <th className="p-4 font-serif text-gray-700">Category</th>
                                    <th className="p-4 font-serif text-gray-700">Duration</th>
                                    <th className="p-4 font-serif text-gray-700">Price</th>
                                    <th className="p-4 font-serif text-gray-700 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {treatments.map((t) => (
                                    <tr key={t.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="p-4 font-medium text-gray-900">
                                            {t.name}
                                            {t.isFeatured && (
                                                <span className="ml-2 text-[10px] bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full uppercase tracking-wider">Featured</span>
                                            )}
                                        </td>
                                        <td className="p-4 text-gray-600">
                                            <span className="bg-gray-100/50 border border-gray-200 text-gray-600 text-xs px-2 py-1 rounded-md">
                                                {t.category}
                                            </span>
                                        </td>
                                        <td className="p-4 text-gray-600 flex items-center gap-1">
                                            <Clock className="w-3 h-3 opacity-50" /> {t.duration}
                                        </td>
                                        <td className="p-4 text-gray-600 font-medium">{t.price}</td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => handleEdit(t)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full">
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleDelete(t.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="md:hidden space-y-3">
                        {treatments.map((t) => (
                            <div key={t.id} className="bg-white rounded-lg border border-secondary p-4 shadow-sm">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium text-gray-900 text-sm truncate">{t.name}</h3>
                                        <p className="text-xs text-gray-500">{t.category}</p>
                                    </div>
                                    {t.isFeatured && (
                                        <span className="text-[9px] bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full uppercase font-bold ml-2 flex-shrink-0">★</span>
                                    )}
                                </div>

                                <div className="space-y-2 mb-3">
                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                        <Clock className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                                        <span>{t.duration}</span>
                                    </div>
                                    <div className="text-sm font-medium text-gray-900">{t.price}</div>
                                </div>

                                <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                                    <button
                                        onClick={() => handleEdit(t)}
                                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-xs text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
                                    >
                                        <Edit2 className="w-3 h-3" /> Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(t.id)}
                                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-xs text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition"
                                    >
                                        <Trash2 className="w-3 h-3" /> Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <form onSubmit={handleSubmit}>
                            <div className="flex items-center justify-between p-6 border-b border-gray-100">
                                <h2 className="text-xl font-serif text-dark">
                                    {editingTreatment ? 'Edit Treatment' : 'Add New Treatment'}
                                </h2>
                                <button type="button" onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="p-6 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Treatment Name</label>
                                        <input required className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary/20 outline-none"
                                            value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="HydraFacial" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                        <select className="w-full border border-gray-300 rounded-lg p-2 bg-white outline-none"
                                            value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                                            <option value="Signature">Signature Therapy</option>
                                            <option value="Anti-Aging">Anti-Aging</option>
                                            <option value="Glow">Glow & Pigmentation</option>
                                            <option value="Acne">Acne & Scars</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                                        <input className="w-full border border-gray-300 rounded-lg p-2 outline-none"
                                            value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} placeholder="₹5000" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                                        <input className="w-full border border-gray-300 rounded-lg p-2 outline-none"
                                            value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} placeholder="45 mins" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea required rows={3} className="w-full border border-gray-300 rounded-lg p-2 outline-none"
                                        value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Description..." />
                                </div>
                                <div className="flex items-center gap-2 pt-2">
                                    <input type="checkbox" id="isFeatured" className="w-4 h-4 text-primary rounded"
                                        checked={formData.isFeatured} onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })} />
                                    <label htmlFor="isFeatured" className="text-sm text-gray-700">Mark as Featured</label>
                                </div>
                            </div>

                            <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                                <button type="submit" className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg flex items-center gap-2">
                                    <Save className="w-4 h-4" /> Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
