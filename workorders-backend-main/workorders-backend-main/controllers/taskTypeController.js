import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getTaskTypes = async (req, res) => {
    const taskTypes = await prisma.taskType.findMany();
    res.json(taskTypes);
}

export const getTaskTypeById = async (req, res) => {
    const { id } = req.params;
    const taskType = await prisma.taskType.findUnique({
        where: {
            id,
        }
    });
    res.json(taskType);
}

export const createTaskType = async (req, res) => {
    try {
        const { name } = req.body;
        const taskType = await prisma.taskType.create({
            data: {
                name,
            }
        });
        res.json(taskType);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export const deleteTaskType = async (req, res) => {
    try {
        const { id } = req.params;
        const taskType = await prisma.taskType.delete({
            where: {
                id,
            }
        });
        res.json(taskType);
    } catch (error) {
        if (error.code === 'P2003') { // Prisma error code for foreign key constraint violation
            return res.status(400).json({ message: "You cannot delete this trade as it is related to some work orders" });
        }
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}
export const updateTaskType = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const taskType = await prisma.taskType.update({
            where: {
                id,
            },
            data: {
                name,
            }
        });
        res.json(taskType);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}