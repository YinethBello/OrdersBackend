import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getFloors = async (req, res) => {
    try {
        const floors = await prisma.floor.findMany({
            include: {
                areas: true,
                building: true,
                facility: true,
                Zone: true
            }
        });
        res.status(201).json(floors);
    } catch (error) {
        console.error('Error en getFloors:', error);
        res.status(500).json({ error: error.message });
    }
}

export const getFloor = async (req, res) => {
    try {
        const { id } = req.params;
        const floor = await prisma.floor.findUnique({
            where: { id },
            include: {
                areas: true,
                building: true,
                facility: true,
                zone: true
            }
        });
        res.status(201).json(floor);
    } catch (error) {
        console.error('Error en getFloor:', error);
        res.status(500).json({ error: error.message });
    }
}

export const createFloor = async (req, res) => {
    try {
        const { floorCode, buildingId, description, floorLevel, facilityId, zoneId, active } = req.body;
        let auxActive = (active === 'true' || active) ? true : false;
        const floor = await prisma.floor.create({
            data: { floorCode, buildingId, description, floorLevel, facilityId, zoneId, active: auxActive }
        });
        res.status(201).json(floor);
    } catch (error) {
        console.error('Error en createFloor:', error);
        res.status(500).json({ error: error.message });
    }
}

export const updateFloor = async (req, res) => {
    try {
        const { id } = req.params;
        const { floorCode, buildingId, description, floorLevel, facilityId, zoneId, active } = req.body;
        let auxActive = undefined;
        if (active !== undefined) {
            auxActive = active === 'true' ? true : false;
        }
        const floor = await prisma.floor.update({
            where: { id },
            data: { floorCode, buildingId, description, floorLevel, facilityId, zoneId, active: auxActive }
        });
        res.status(201).json(floor);
    } catch (error) {
        console.error('Error en updateFloor:', error);
        res.status(500).json({ error: error.message });
    }
}

export const deleteFloor = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.floor.delete({
            where: { id }
        });
        res.status(201).json({ message: 'Floor deleted' });
    } catch (error) {
        console.error('Error en deleteFloor:', error);
        res.status(500).json({ error: error.message });
    }
}