import { create } from 'zustand';
import { getSocket } from '@/lib/socket';
import { toast } from 'sonner';

interface SocketStore {
    newOrdersCount: number;
    isConnected: boolean;
    initializeSocket: () => void;
    resetNewOrdersCount: () => void;
}

export const useSocketStore = create<SocketStore>((set, get) => ({
    newOrdersCount: 0,
    isConnected: false,
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
            toast.success(`New Order Received! #${order.id.slice(-6)}`);

            // Play sound? Maybe later.
        });
    },
    resetNewOrdersCount: () => {
        set({ newOrdersCount: 0 });
    }
}));
