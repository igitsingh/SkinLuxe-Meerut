import { create } from 'zustand';
import { getSocket } from '@/lib/socket';
import { toast } from 'sonner';
import api from '@/lib/api';

interface SocketStore {
    newOrdersCount: number;
    isConnected: boolean;
    totalOrders: number;
    initializeSocket: () => void;
    resetNewOrdersCount: () => void;
}

export const useSocketStore = create<SocketStore>((set, get) => ({
    newOrdersCount: 0,
    isConnected: false,
    totalOrders: 0,
    initializeSocket: () => {
        const socket = getSocket();

        if (socket.connected) {
            set({ isConnected: true });
        }

        socket.on('connect', () => {
            set({ isConnected: true });
        });

        socket.on('disconnect', () => {
            set({ isConnected: false });
        });

        socket.on('new_order', (order: any) => {
            set((state) => ({ newOrdersCount: state.newOrdersCount + 1 }));
            toast.success(`New Order Received! #${String(order.orderNumber).padStart(5, '0')}`);
        });

        // Polling Fallback for Vercel (Serverless doesn't support persistent sockets)
        const pollForOrders = async () => {
            try {
                const res = await api.get('/analytics/stats');
                const currentTotal = res.data.totalOrders;
                const state = get();

                if (state.totalOrders === 0) {
                    // First load, just sync
                    set({ totalOrders: currentTotal });
                } else if (currentTotal > state.totalOrders) {
                    // New orders detected
                    const diff = currentTotal - state.totalOrders;
                    set({
                        newOrdersCount: state.newOrdersCount + diff,
                        totalOrders: currentTotal
                    });
                    toast.success(`${diff} New Order(s) Received!`);

                    // Play sound
                    const audio = new Audio("/sounds/notification.mp3");
                    audio.play().catch(e => console.log("Audio play failed", e));
                }
            } catch (error) {
                console.error("Polling failed", error);
            }
        };

        // Poll every 5 seconds
        pollForOrders(); // Initial check
        setInterval(pollForOrders, 5000);
    },
    resetNewOrdersCount: () => {
        set({ newOrdersCount: 0 });
    }
}));
