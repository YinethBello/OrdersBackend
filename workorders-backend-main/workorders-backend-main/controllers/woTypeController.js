import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getWoTypes = async (req, res) => {
    const woTypes = await prisma.woType.findMany();
    res.json(woTypes);
}

export const getWoTypeById = async (req, res) => {
    const { id } = req.params;
    const woType = await prisma.woType.findUnique({
        where: {
            id,
        }
    });
    res.json(woType);
}

export const createWoType = async (req, res) => {
    const { name } = req.body;
    const woType = await prisma.woType.create({
        data: {
            name
        }
    });
    res.json(woType);
}

export const updateWoType = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const woType = await prisma.woType.update({
            where: {
                id,
            },
            data: {
                name,
            }
        });
        return res.json(woType);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error in the server" });
    }
}

export const deleteWoType = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: "WoType id is required" });
        await prisma.woType.delete({
            where: {
                id,
            }
        });
        return res.status(200).json({ message: "WoType deleted" });
    } catch (error) {
        console.log(error);
        if (error.code === 'P2003') { // Prisma error code for foreign key constraint violation
            return res.status(400).json({ message: "You cannot delete this trade as it is related to some work orders" });
        }
        return res.status(500).json({ message: "Error in the server" });
    }
}