import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

let io: Server;

export const initSocket = (httpServer: HttpServer) => {
    const ALLOWED_ORIGINS = [
        // Production Frontends
        process.env.FRONTEND_URL,
        process.env.ADMIN_URL,
        'https://skinluxe-meerut.vercel.app',
        'https://admin-skinluxe-meerut.vercel.app',
        'https://skinluxe-meerut-admin-og.vercel.app',
        'https://skinluxe-meerut-web-og.vercel.app',
        // Local Development
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:3002'
    ].filter(Boolean).map(url => (url as string).replace(/\/$/, ''));

    io = new Server(httpServer, {
        cors: {
            origin: ALLOWED_ORIGINS,
            methods: ["GET", "POST"],
            credentials: true
        }
    });
    return io;
};

export const getIO = () => {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
};
