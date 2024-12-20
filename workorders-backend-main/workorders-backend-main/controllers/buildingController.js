import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getBuildings = async (req, res) => {
    try {
        const buildings = await prisma.building.findMany({
            include: {
                floors: true,
                facility: true
            }
        });
        res.status(201).json(buildings);
    } catch (error) {
        console.error('Error en getBuildings:', error);
        res.status(500).json({ error: error.message });
    }
}

export const getBuilding = async (req, res) => {
    try {
        const { id } = req.params;
        const building = await prisma.building.findUnique({
            where: { id },
            include: {
                floors: true,
                facility: true
            }
        });
        res.status(201).json(building);
    } catch (error) {
        console.error('Error en getBuilding:', error);
        res.status(500).json({ error: error.message });
    }
}

export const createBuilding = async (req, res) => {
    try {
        const { name, facilityId } = req.body;
        const building = await prisma.building.create({
            data: { name, facilityId }
        });
        res.status(201).json(building);
    } catch (error) {
        console.error('Error en createBuilding:', error);
        res.status(500).json({ error: error.message });
    }
}

export const updateBuilding = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, facilityId } = req.body;
        const building = await prisma.building.update({
            where: { id },
            data: { name, facilityId }
        });
        res.status(201).json(building);
    } catch (error) {
        console.error('Error en updateBuilding:', error);
        res.status(500).json({ error: error.message });
    }
}

export const deleteBuilding = async (req, res) => {
    try {
        const { id } = req.params;
        const building = await prisma.building.delete({
            where: { id }
        });
        res.status(201).json(building);
    } catch (error) {
        console.error('Error en deleteBuilding:', error);
        res.status(500).json({ error: error.message });
    }
}