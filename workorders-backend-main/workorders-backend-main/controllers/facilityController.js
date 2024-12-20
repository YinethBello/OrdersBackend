import { PrismaClient } from "@prisma/client";
import e from "express";

const prisma = new PrismaClient();

export const getFacilities = async (req, res) => {
    try {
        const facilities = await prisma.facility.findMany({
            include:{
                zone: true,
                buildings: true,
                equipment: true
            }
        });
        res.json(facilities);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export const getFacilityById = async (req, res) => {
    const { id } = req.params;
    const facility = await prisma.facility.findUnique({
        where: {
            id,
        },
        include: {
            zone: true,
            buildings: true,
            equipment: true
        }
    });
    res.json(facility);
}

export const createFacility = async (req, res) => {
    try {
        const { code, zoneId } = req.body;
        const facility = await prisma.facility.create({
            data: {
                code,
                zoneId
            }
        });
        res.json(facility);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export const updateFacility = async (req, res) => {
    try {
        const { id } = req.params;
        const { code, zoneId } = req.body;
        const facility = await prisma.facility.update({
            where: {
                id,
            },
            data: {
                code,
                zoneId
            }
        });
        return res.json(facility);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error in the server" });
    }
}

export const deleteFacility = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: "Facility id is required" });
        await prisma.facility.delete({
            where: {
                id,
            }
        });
        return res.status(200).json({ message: "Facility deleted" });
    } catch (error) {
        console.log(error);
        if (error.code === 'P2003') { // Prisma error code for foreign key constraint violation
            return res.status(400).json({ message: "You cannot delete this trade as it is related to some work orders" });
        }
        return res.status(500).json({ message: "Error in the server" });
    }
}