import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getEquipments = async (req, res) => {
    try {
        const equipments = await prisma.equipment.findMany({
            include: {
                equipmentType: true,
                facility: true
            }
        });
        res.status(201).json(equipments);
    } catch (error) {
        console.error('Error en getEquipments:', error);
        res.status(500).json({ error: error.message });
    }
}

export const getEquipment = async (req, res) => {
    try {
        const { id } = req.params;
        const equipment = await prisma.equipment.findUnique({
            where: { id },
            include: {
                equipmentType: true,
                facility: true
            }
        });
        res.status(201).json(equipment);
    } catch (error) {
        console.error('Error en getEquipment:', error);
        res.status(500).json({ error: error.message });
    }
}

export const createEquipment = async (req, res) => {
    try {
        const {
            tagNumber,
            equipmentTypeId,
            facilityId,
            alternateTag,
            description,
            make,
            active,
            modelNumber,
            buildingName,
            floorLevelNum,
            RoomNumber,
            Manufacturer,
            SerialNumber
        } = req.body;
        let auxActive = (active === 'true' || active) ? true : false;
        const equipment = await prisma.equipment.create({
            data: {
                tagNumber,
                equipmentTypeId,
                facilityId,
                alternateTag,
                description,
                make,
                active: auxActive,
                modelNumber,
                buildingName,
                floorLevelNum,
                RoomNumber,
                Manufacturer,
                SerialNumber,
            }
        });
        res.status(201).json(equipment);
    } catch (error) {
        console.error('Error en createEquipment:', error);
        res.status(500).json({ error: error.message });
    }
}

export const updateEquipment = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            tagNumber,
            equipmentTypeId,
            facilityId,
            alternateTag,
            description,
            make,
            active,
            modelNumber,
            buildingName,
            floorLevelNum,
            RoomNumber,
            Manufacturer,
            SerialNumber
        } = req.body;
        let auxActive = undefined;
        if (active !== undefined) {
            auxActive = active === 'true' ? true : false;
        }
        const equipment = await prisma.equipment.update({
            where: { id },
            data: {
                tagNumber,
                equipmentTypeId,
                facilityId,
                alternateTag,
                description,
                make,
                active: auxActive,
                modelNumber,
                buildingName,
                floorLevelNum,
                RoomNumber,
                Manufacturer,
                SerialNumber,
            }
        });
        res.status(201).json(equipment);
    } catch (error) {
        console.error('Error en updateEquipment:', error);
        res.status(500).json({ error: error.message });
    }
}

export const deleteEquipment = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.equipment.delete({
            where: { id }
        });
        res.status(201).json({ message: 'Equipment deleted' });
    } catch (error) {
        console.error('Error en deleteEquipment:', error);
        res.status(500).json({ error: error.message });
    }
}