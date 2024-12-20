import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getZones = async (req, res) => {
    const zones = await prisma.zone.findMany();
    res.json(zones);
}

export const getZoneById = async (req, res) => {
    const { id } = req.params;
    const zone = await prisma.zone.findUnique({
        where: {
            id,
        }
    });
    res.json(zone);
}

export const createZone = async (req, res) => {
    const { name } = req.body;
    const zone = await prisma.zone.create({
        data: {
            name,
        }
    });
    res.json(zone);
}

export const updateZone = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const zone = await prisma.zone.update({
            where: {
                id,
            },
            data: {
                name,
            }
        });
        return res.json(zone);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error in the server" });
    }
}

export const deleteZone = async (req, res) => {
    try {
        const { id } = req.params;
        if(!id) return res.status(400).json({ message: "Zone id is required" });
        await prisma.zone.delete({
            where: {
                id,
            }
        });
        return res.status(200).json({ message: "Zone deleted" });
    } catch (error) {
        console.log(error);
        if (error.code === 'P2003') { // Prisma error code for foreign key constraint violation
            return res.status(400).json({ message: "You cannot delete this trade as it is related to some work orders" });
        }
        return res.status(500).json({ message: "Error in the server" });
    }
}