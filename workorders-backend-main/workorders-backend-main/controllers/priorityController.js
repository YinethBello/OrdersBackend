import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getPriorities = async (req, res) => {
    const priorities = await prisma.priority.findMany();
    res.json(priorities);
}

export const getPriorityById = async (req, res) => {
    const { id } = req.params;
    const priority = await prisma.priority.findUnique({
        where: {
            id,
        }
    });
    res.json(priority);
}

export const createPriority = async (req, res) => {
    const { name } = req.body;
    const priority = await prisma.priority.create({
        data: {
            name,
        }
    });
    res.json(priority);
}

export const updatePriority = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const priority = await prisma.priority.update({
            where: {
                id,
            },
            data: {
                name,
            }
        });
        return res.json(priority);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error in the server" });
    }
}

export const deletePriority = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: "Priority id is required" });
        await prisma.priority.delete({
            where: {
                id,
            }
        });
        return res.status(200).json({ message: "Priority deleted" });
    } catch (error) {
        console.log(error);
        if (error.code === 'P2003') { // Prisma error code for foreign key constraint violation
            return res.status(400).json({ message: "You cannot delete this trade as it is related to some work orders" });
        }
        return res.status(500).json({ message: "Error in the server" });
    }
}