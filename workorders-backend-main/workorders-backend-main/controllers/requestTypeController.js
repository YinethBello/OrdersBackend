import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getRequestTypes = async (req, res) => {
    const requestTypes = await prisma.requestType.findMany();
    res.json(requestTypes);
}

export const getRequestTypeById = async (req, res) => {
    const { id } = req.params;
    const requestType = await prisma.requestType.findUnique({
        where: {
            id,
        }
    });
    res.json(requestType);
}

export const createRequestType = async (req, res) => {
    const { name } = req.body;
    const requestType = await prisma.requestType.create({
        data: {
            name,
        }
    });
    res.json(requestType);
}

export const updateRequestType = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const requestType = await prisma.requestType.update({
            where: {
                id,
            },
            data: {
                name,
            }
        });
        return res.json(requestType);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error in the server" });
    }
}

export const deleteRequestType = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: "RequestType id is required" });
        await prisma.requestType.delete({
            where: {
                id,
            }
        });
        return res.status(200).json({ message: "RequestType deleted" });
    } catch (error) {
        console.log(error);
        if (error.code === 'P2003') { // Prisma error code for foreign key constraint violation
            return res.status(400).json({ message: "You cannot delete this trade as it is related to some work orders" });
        }
        return res.status(500).json({ message: "Error in the server" });
    }
}