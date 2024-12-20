import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTasks = async (req, res) => {
    const tasks = await prisma.task.findMany({
        include: {
            technicians: true,
        }
    });
    res.json(tasks);
}

export const getTaskById = async (req, res) => {
    const { id } = req.params;
    const task = await prisma.task.findUnique({
        where: {
            id,
        },
        include: {
            technicians: true,
        }
    });
    res.json(task);
}

export const createTask = async (req, res) => {
    try {
        const { 
            name, 
            description, 
            workOrderId, 
            taskTypeId, 
            adminId,
            technicianIds  // Puede ser undefined o un array
        } = req.body;

        // Datos base de la tarea
        const taskData = {
            workOrderId,
            taskTypeId,
            name,
            description,
            adminId
        };

        // Si hay técnicos asignados, agregar la relación
        if (technicianIds && Array.isArray(technicianIds) && technicianIds.length > 0) {
            taskData.technicians = {
                connect: technicianIds.map(id => ({ id }))
            };
        }

        const task = await prisma.task.create({
            data: taskData,
            include: {
                technicians: true,
                taskType: true,
                workOrder: true
            }
        });

        res.json(task);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ 
            error: error.message,
            details: 'Error creating task. Please check the provided data.'
        });
    }
}



export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await prisma.task.update({
            where: { id },
            data: {
                active: false,
                dateInact: new Date(),
                technicians: {
                    // Desconectamos todos los técnicos al "eliminar" la tarea
                    set: []
                }
            },
            include: {
                technicians: true
            }
        });
        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }

}

export const restoreTask = async (req, res) => {
    const { id } = req.params;
    const task = await prisma.task.update({
        where: { id },
        data: {
            active: true,
            dateInact: null
        },
        include: {
            technicians: true
        }
    });
    res.json(task);
}

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            description,
            workOrderId,
            taskTypeId,
            technicianIds  // Array de IDs de técnicos
        } = req.body;

        // Primero obtenemos la tarea actual para manejar los técnicos
        const currentTask = await prisma.task.findUnique({
            where: { id },
            include: { technicians: true }
        });

        const task = await prisma.task.update({
            where: { id },
            data: {
                workOrderId,
                taskTypeId,
                name,
                description,
                technicians: {
                    // Desconectamos todos los técnicos actuales
                    disconnect: currentTask.technicians.map(tech => ({ id: tech.id })),
                    // Conectamos los nuevos técnicos
                    connect: technicianIds.map(id => ({ id }))
                }
            },
            include: {
                technicians: true
            }
        });
        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

export const assignTechnicians = async (req, res) => {
    try {
        const { id } = req.params;
        const { technicianIds } = req.body;

        const task = await prisma.task.update({
            where: { id },
            data: {
                technicians: {
                    set: technicianIds.map(id => ({ id }))
                }
            },
            include: {
                technicians: true
            }
        });
        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}