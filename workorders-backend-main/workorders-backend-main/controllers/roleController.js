import { PrismaClient } from "@prisma/client";
import e from "express";
const prisma = new PrismaClient();

export const getRoles = async (req, res) => {
    const roles = await prisma.role.findMany();
    res.json(roles);
}

export const getRoleById = async (req, res) => {
    const { id } = req.params;
    const role = await prisma.role.findUnique({
        where: {
            id,
        }
    });
    res.json(role);
}

export const createRole = async (req, res) => {
    const { name, permissions } = req.body;
    try {
        const newRole = await prisma.role.create({
            data: {
                name,
                permissions
            }
        });
        res.status(200).json(newRole);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }

}

export const updateRole = async (req, res) => {
    const { id } = req.params;
    const { name, permissions } = req.body;
    try {
        const updatedRole = await prisma.role.update({
            where: {
                id,
            },
            data: {
                name,
                permissions
            }
        });
        res.status(200).json(updatedRole);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
}

export const deleteRole = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRole = await prisma.role.delete({
            where: {
                id,
            }
        });
        res.status(200).json(deletedRole);
    } catch (error) {
        console.log(error);
        if (error.code === 'P2003') { // Prisma error code for foreign key constraint violation
            return res.status(400).json({ message: "You cannot delete this role as it is related to some users" });
        }
        res.status(400).json({ error: error.message });
    }
}