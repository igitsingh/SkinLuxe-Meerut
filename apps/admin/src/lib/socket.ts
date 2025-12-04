import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const getSocket = () => {
    if (!socket) {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
        // Extract base URL (remove /api/admin or /api)
        // If url is https://api.example.com/api, socket is https://api.example.com
        const baseUrl = apiUrl.replace(/\/api(\/admin)?\/?$/, '');

        socket = io(`${baseUrl}/orders`, {
            withCredentials: true,
            transports: ['websocket', 'polling'],
        });

        socket.on('connect', () => {
            console.log('Connected to socket server');
        });

        socket.on('connect_error', (err) => {
            console.error('Socket connection error:', err);
        });
    }
    return socket;
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};
