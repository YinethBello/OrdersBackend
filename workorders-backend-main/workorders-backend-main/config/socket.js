import { config } from "dotenv";
config();

let io;

export const initializeSocket = async (httpServer) => {
    const { Server } = await import('socket.io');
    io = new Server(httpServer, {
        cors: {
            origin: "*",
        }
    });

    console.log("Socket.IO inicializado");

    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        // Verificar JWT si es necesario
        next();
    });

    io.on('connection', (socket) => {
        console.log('Cliente conectado:', socket.id);

        socket.on('disconnect', () => {
            console.log('Cliente desconectado:', socket.id);
        });
    });
    

    return io;
};

export const getIO = () => {
    if (!io) {
        throw new Error('Socket.io no ha sido inicializado');
    }
    return io;
};

