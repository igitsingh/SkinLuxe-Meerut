'use client';

import { useBooking } from '@/contexts/BookingContext';
import { useSettings } from '@/contexts/SettingsContext';
import { X, Trash2, MessageCircle, ShoppingBag } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function TreatmentBagSidebar() {
    const { bag, removeFromBag, clearBag, isBagOpen, toggleBag, subtotal } = useBooking();
    const { settings } = useSettings();
    const [mounted, setMounted] = useState(false);
    const [preferredDate, setPreferredDate] = useState('');

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const handleWhatsAppCheckout = () => {
        const whatsappNumber = settings.contactPhone?.split('/')[0]?.trim().replace(/\s/g, '') || '919318452282';

        let message = `Halo SkinLuxe,\n\nI am interested in the following treatments:\n\n`;
        bag.forEach((item, index) => {
            message += `${index + 1}. *${item.name}* ${item.price ? `(${item.price})` : ''}\n`;
        });

        if (preferredDate) {
            message += `\nPreferred Date: ${preferredDate}`;
        }

        message += `\nTotal Estimated: ₹${subtotal}\n\nPlease let me know the available slots.`;

        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <>
            {/* Backdrop */}
            {isBagOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998] transition-opacity"
                    onClick={toggleBag}
                />
            )}

            {/* Sidebar Drawer */}
            <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[9999] transform transition-transform duration-300 ease-in-out flex flex-col ${isBagOpen ? 'translate-x-0' : 'translate-x-full'}`}>

                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
                    <div className="flex items-center gap-3">
                        <ShoppingBag className="w-5 h-5 text-primary" />
                        <h2 className="text-xl font-serif text-dark">Your Selection</h2>
                        <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-medium">
                            {bag.length} items
                        </span>
                    </div>
                    <button onClick={toggleBag} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Empty State */}
                {bag.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-gray-500">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <ShoppingBag className="w-8 h-8 opacity-20" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Your bag is empty</h3>
                        <p className="text-sm max-w-[200px]">Browse our treatments and create your personalized package.</p>
                        <button
                            onClick={toggleBag}
                            className="mt-6 text-primary font-medium hover:underline"
                        >
                            Continue Browsing
                        </button>
                    </div>
                ) : (
                    <>
                        {/* List Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {bag.map((item) => (
                                <div key={item.id} className="flex gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/30 hover:bg-gray-50 transition-colors group">
                                    {/* Placeholder Image Box */}
                                    <div className="w-16 h-16 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                                        ✨
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="font-medium text-gray-900 truncate pr-2">{item.name}</h4>
                                            {item.price && (
                                                <span className="text-sm font-semibold text-gray-900">{item.price}</span>
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-500 mb-2">{item.category || 'Treatment'}</p>

                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-gray-400">{item.duration || 'Flexible time'}</span>
                                            <button
                                                onClick={() => removeFromBag(item.id)}
                                                className="text-xs text-red-500 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <Trash2 className="w-3 h-3" /> Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer / Checkout */}
                        <div className="p-6 border-t border-gray-100 bg-white space-y-4">
                            <div className="flex items-center justify-between text-lg font-medium text-gray-900">
                                <span>Estimated Total</span>
                                <span className="font-serif">₹{subtotal.toLocaleString()}</span>
                            </div>
                            <p className="text-xs text-gray-500 text-center">
                                Final pricing & availability will be confirmed via WhatsApp.
                            </p>

                            {/* Date Picker */}
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Preferred Date (Optional)</label>
                                <input
                                    type="date"
                                    value={preferredDate}
                                    onChange={(e) => setPreferredDate(e.target.value)}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary"
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                <button
                                    onClick={handleWhatsAppCheckout}
                                    className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-200"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    Book via WhatsApp
                                </button>

                                <button
                                    onClick={clearBag}
                                    className="text-gray-400 text-xs hover:text-gray-600 py-2"
                                >
                                    Clear all items
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
