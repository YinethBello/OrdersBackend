import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getWoOrigins = async (req, res) => {
    const woOrigins = await prisma.woOrigin.findMany();
    res.json(woOrigins);
}

export const getWoOriginById = async (req, res) => {
    const { id } = req.params;
    const woOrigin = await prisma.woOrigin.findUnique({
        where: {
            id,
        }
    });
    res.json(woOrigin);
}

export const createWoOrigin = async (req, res) => {
    const { name } = req.body;
    const woOrigin = await prisma.woOrigin.create({
        data: {
            name
        }
    });
    res.json(woOrigin);
}

export const updateWoOrigin = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const woOrigin = await prisma.woOrigin.update({
            where: {
                id,
            },
            data: {
                name,
            }
        });
        return res.json(woOrigin);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error in the server" });
    }
}

export const deleteWoOrigin = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: "Work Order Origin id is required" });
        await prisma.woOrigin.delete({
            where: {
                id,
            }
        });
        return res.status(200).json({ message: "Work Order Origin deleted" });
    } catch (error) {
        console.log(error);
        if (error.code === 'P2003') { // Prisma error code for foreign key constraint violation
            return res.status(400).json({ message: "You cannot delete this trade as it is related to some work orders" });
        }
        return res.status(500).json({ message: "Error in the server" });
    }
}