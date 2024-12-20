import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAreaTypes = async (req, res) => {
    try {
        const areaTypes = await prisma.areaType.findMany({
            include: {
                areas: true
            }
        });
        res.status(201).json(areaTypes);
    } catch (error) {
        console.error('Error en getAreaTypes:', error);
        res.status(500).json({ error: error.message });
    }
}

export const getAreaType = async (req, res) => {
    try {
        const { id } = req.params;
        const areaType = await prisma.areaType.findUnique({
            where: { id },
            include: {
                areas: true
            }
        });
        res.status(201).json(areaType);
    } catch (error) {
        console.error('Error en getAreaType:', error);
        res.status(500).json({ error: error.message });
    }
}

export const createAreaType = async (req, res) => {
    try {
        const { name, description } = req.body;
        const areaType = await prisma.areaType.create({
            data: { name, description }
        });
        res.status(201).json(areaType);
    } catch (error) {
        console.error('Error en createAreaType:', error);
        res.status(500).json({ error: error.message });
    }
}

export const updateAreaType = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const areaType = await prisma.areaType.update({
            where: { id },
            data: { name, description }
        });
        res.status(201).json(areaType);
    } catch (error) {
        console.error('Error en updateAreaType:', error);
        res.status(500).json({ error: error.message });
    }
}

export const deleteAreaType = async (req, res) => {
    try {
        const { id } = req.params;
        const areaType = await prisma.areaType.delete({
            where: { id }
        });
        res.status(201).json(areaType);
    } catch (error) {
        console.error('Error en deleteAreaType:', error);
        res.status(500).json({ error: error.message });
    }
}