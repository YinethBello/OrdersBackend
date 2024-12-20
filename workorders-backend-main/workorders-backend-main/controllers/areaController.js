import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAreas = async (req, res) => {
    try {
        const areaTypes = await prisma.area.findMany({
            include: {
                areaType: true,
                floor: true
            }
        });
        res.status(201).json(areaTypes);
    } catch (error) {
        console.error('Error en getAreaTypes:', error);
        res.status(500).json({ error: error.message });
    }
}

export const getArea = async (req, res) => {
    try {
        const { id } = req.params;
        const areaType = await prisma.area.findUnique({
            where: { id },
            include: {
                areaType: true,
                floor: true
            }
        });
        res.status(201).json(areaType);
    } catch (error) {
        console.error('Error en getAreaType:', error);
        res.status(500).json({ error: error.message });
    }
}

export const createArea = async (req, res) => {
    try {
        const {
            areaTypeId,
            floorId,
            code,
            roomNumber,
            description,
            active,
            floorCode
        } = req.body;
        let auxActive = (active === 'true' || active) ? true : false;
        const area = await prisma.area.create({
            data: {
                areaTypeId,
                floorId,
                code,
                roomNumber,
                description,
                active: auxActive,
                floorCode,
            }
        });
        res.status(201).json(area);
    } catch (error) {
        console.error('Error en createArea:', error);
        res.status(500).json({ error: error.message });
    }
}

export const updateArea = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            areaTypeId,
            floorId,
            code,
            roomNumber,
            description,
            active,
            floorCode
        } = req.body;
        let auxActive = undefined;
        if (active !== undefined) {
            auxActive = active === 'true' ? true : false;
        }
        const area = await prisma.area.update({
            where: { id },
            data: {
                areaTypeId,
                floorId,
                code,
                roomNumber,
                description,
                active: auxActive,
                floorCode
            }
        });
        res.status(201).json(area);
    } catch (error) {
        console.error('Error en updateArea:', error);
        res.status(500).json({ error: error.message });
    }
}

export const deleteArea = async (req, res) => {
    try {
        const { id } = req.params;
        const area = await prisma.area.delete({
            where: { id }
        });
        res.status(201).json(area);
    } catch (error) {
        console.error('Error en deleteArea:', error);
        res.status(500).json({ error: error.message });
    }
}