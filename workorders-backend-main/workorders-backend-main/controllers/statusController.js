import { PrismaClient } from "@prisma/client";
import { sendNotification, notificationTypes } from "../services/notificationService.js";

const prisma = new PrismaClient();

export const getStatuses = async (req, res) => {
    const statuses = await prisma.status.findMany();
    res.json(statuses);
}

export const getStatusById = async (req, res) => {
    const { id } = req.params;
    const status = await prisma.status.findUnique({
        where: {
            id,
        }
    });
    res.json(status);
}

export const createStatus = async (req, res) => {
    try {
        const { name } = req.body;
        const status = await prisma.status.create({
            data: {
                name
            }
        });
        sendNotification("userId", notificationTypes.CREATE_STATUS, {
            statusId: status.id,
            name: status.name,
            message: `Status ${status.name} created`
        });
        res.json(status);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }

}

export const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const status = await prisma.status.update({
            where: {
                id,
            },
            data: {
                name,
            }
        });
        sendNotification("userId", notificationTypes.UPDATE_STATUS, {
            statusId: status.id,
            name: status.name,
            message: `Status ${status.name} updated`
        });
        return res.json(status);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error in the server" });
    }
}

export const deleteStatus = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: "Status id is required" });
        await prisma.status.delete({
            where: {
                id,
            }
        });
        sendNotification("userId", notificationTypes.DELETE_STATUS, {
            statusId: id,
            message: `Status ${id} deleted`
        });
        return res.status(200).json({ message: "Status deleted" });
    } catch (error) {
        console.log(error);
        if (error.code === 'P2003') { // Prisma error code for foreign key constraint violation
            return res.status(400).json({ message: "You cannot delete this status as it is related to some work orders" });
        }
        return res.status(500).json({ message: "Error in the server" });
    }
}