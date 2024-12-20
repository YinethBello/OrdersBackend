import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getEquipmentTypes = async (req, res) => {
    try {
        const equipmentTypes = await prisma.equipmentType.findMany({
            include: {
                equipment: true
            }
        });
        res.status(201).json(equipmentTypes);
    } catch (error) {
        console.error('Error en getEquipmentTypes:', error);
        res.status(500).json({ error: error.message });
    }
}

export const getEquipmentType = async (req, res) => {
    try {
        const { id } = req.params;
        const equipmentType = await prisma.equipmentType.findUnique({
            where: { id },
            include: {
                equipment: true
            }
        });
        res.status(201).json(equipmentType);
    } catch (error) {
        console.error('Error en getEquipmentType:', error);
        res.status(500).json({ error: error.message });
    }
}

export const createEquipmentType = async (req, res) => {
    try {
        const { name, description } = req.body;
        const equipmentType = await prisma.equipmentType.create({
            data: { name, description },
        });
        res.status(201).json(equipmentType);
    } catch (error) {
        console.error('Error en createEquipmentType:', error);
        res.status(500).json({ error: error.message });
    }
}

export const updateEquipmentType = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const equipmentType = await prisma.equipmentType.update({
            where: { id },
            data: { name, description }
        });
        res.status(201).json(equipmentType);
    } catch (error) {
        console.error('Error en updateEquipmentType:', error);
        res.status(500).json({ error: error.message });
    }
}

export const deleteEquipmentType = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.equipmentType.delete({
            where: { id }
        });
        res.status(201).json({ message: 'Equipment Type deleted' });
    } catch (error) {
        console.error('Error en deleteEquipmentType:', error);
        res.status(500).json({ error: error.message });
    }
}