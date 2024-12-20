// const { getIO } = require('../config/socket');
import { getIO } from "../config/socket.js";

export const notificationTypes = {
    WORK_ORDER_CREATED: 'WORK_ORDER_CREATED',
    WORK_ORDER_UPDATED: 'WORK_ORDER_UPDATED',
    CREATE_STATUS: 'CREATE_STATUS',
    UPDATE_STATUS: 'UPDATE_STATUS',
    DELETE_STATUS: 'DELETE_STATUS',
};

export const sendNotification = (userId = 'test', type, data) => {
    try {
        console.log('Intentando enviar notificación:', { userId, type, data });
        
        const io = getIO();
        console.log('Socket.IO instance obtained');
        
        // Enviar a todos los clientes conectados por ahora
        io.emit('notification', {
            type,
            data,
            timestamp: new Date()
        });
        
        console.log('Notificación enviada exitosamente');
    } catch (error) {
        console.error('Error al enviar notificación:', error);
        throw error;
    }
};