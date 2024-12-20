import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getRepairCenters = async (req, res) => {
    const repairCenters = await prisma.repairCenter.findMany();
    res.json(repairCenters);
}

export const getRepairCenterById = async (req, res) => {
    const { id } = req.params;
    const repairCenter = await prisma.repairCenter.findUnique({
        where: {
            id,
        }
    });
    res.json(repairCenter);
}

export const createRepairCenter = async (req, res) => {
    const { name } = req.body;
    const repairCenter = await prisma.repairCenter.create({
        data: {
            name
        }
    });
    res.json(repairCenter);
}

export const updateRepairCenter = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const repairCenter = await prisma.repairCenter.update({
            where: {
                id,
            },
            data: {
                name
            }
        });
        return res.json(repairCenter);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error in the server" });
    }
}

export const deleteRepairCenter = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.repairCenter.delete({
            where: {
                id,
            }
        });
        return res.status(200).json({ message: "Repair Center deleted" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error in the server" });
    }
}