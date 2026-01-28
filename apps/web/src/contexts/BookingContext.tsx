'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface BagItem {
    id: string;
    name: string;
    category?: string;
    price?: string;
    duration?: string;
}

interface BookingContextType {
    bag: BagItem[];
    addToBag: (item: BagItem) => void;
    removeFromBag: (id: string) => void;
    clearBag: () => void;
    isBagOpen: boolean;
    toggleBag: () => void;
    subtotal: number; // Placeholder for now if we don't have real prices
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
    const [bag, setBag] = useState<BagItem[]>([]);
    const [isBagOpen, setIsBagOpen] = useState(false);

    // Persist to LocalStorage
    useEffect(() => {
        const savedBag = localStorage.getItem('skinluxe_bag');
        if (savedBag) {
            try {
                setBag(JSON.parse(savedBag));
            } catch (e) {
                console.error("Failed to parse bag from storage", e);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('skinluxe_bag', JSON.stringify(bag));
    }, [bag]);

    const addToBag = (item: BagItem) => {
        setBag((prev) => {
            // Prevent duplicates
            if (prev.some(i => i.id === item.id)) return prev;
            return [...prev, item];
        });
        setIsBagOpen(true); // Auto-open bag on add
    };

    const removeFromBag = (id: string) => {
        setBag((prev) => prev.filter(item => item.id !== id));
    };

    const clearBag = () => {
        setBag([]);
        localStorage.removeItem('skinluxe_bag');
    };

    const toggleBag = () => setIsBagOpen((prev) => !prev);

    // Calculate subtotal (stripping non-numeric chars from price strings e.g. "₹ 5000" -> 5000)
    const subtotal = bag.reduce((acc, item) => {
        if (!item.price) return acc;
        const num = parseInt(item.price.replace(/[^0-9]/g, ''), 10);
        return isNaN(num) ? acc : acc + num;
    }, 0);

    return (
        <BookingContext.Provider value={{
            bag,
            addToBag,
            removeFromBag,
            clearBag,
            isBagOpen,
            toggleBag,
            subtotal
        }}>
            {children}
        </BookingContext.Provider>
    );
}

export function useBooking() {
    const context = useContext(BookingContext);
    if (context === undefined) {
        throw new Error('useBooking must be used within a BookingProvider');
    }
    return context;
}
