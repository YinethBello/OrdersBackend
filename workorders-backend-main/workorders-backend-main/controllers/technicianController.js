import { PrismaClient } from "@prisma/client";
import { encryptPassword, comparePassword } from "../libs/encryptPassword.js";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();


const prisma = new PrismaClient();

export const getTechnicians = async (req, res) => {
    const { adminId } = req.params;
    if (!adminId) {
        return res.status(400).json({ message: "AdminId is required" });
    }
    const technicians = await prisma.technician.findMany({
        where: {
            adminId: adminId
        },
        include: {
            Task: true
        }
    });
    res.json(technicians);
}

export const getTechnicianById = async (req, res) => {
    const { id } = req.params;
    const technician = await prisma.technician.findUnique({
        where: {
            id,
        }
    });
    res.json(technician);
}

export const createTechnician = async (req, res) => {
    const { repairCenterId, techCode, tradeId, FullName, FirstName, LastName, Email, Phone, TechnicianTitle, password, roleId } = req.body;
    try {
        const passwordEncrypted = await encryptPassword(password);
        const technician = await prisma.technician.create({
            data: {
                repairCenterId,
                techCode,
                tradeId,
                FullName,
                FirstName,
                LastName,
                Email,
                Phone,
                TechnicianTitle,
                password: passwordEncrypted,
                roleId
            }
        });
        const updatedTechnician = await prisma.technician.update({
            where: {
                id: technician.id
            },
            data: {
                adminId: technician.id
            }
        });
        const token = jwt.sign({ id: technician.id }, process.env.SECRET_WORD, {
            expiresIn: 86400
        });
        return res.status(200).json({
            technician: updatedTechnician,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }

}

export const createSubTechnician = async (req, res) => {
    const { repairCenterId, techCode, tradeId, FullName, FirstName, LastName, Email, Phone, TechnicianTitle, password, roleId, adminId } = req.body;
    try {
        console.log("adminId: " + adminId)
        if (!adminId) {
            return res.status(400).json({ message: "AdminId is required" });
        }
        const passwordEncrypted = await encryptPassword(password);
        const technician = await prisma.technician.create({
            data: {
                repairCenterId,
                techCode,
                tradeId,
                FullName,
                FirstName,
                LastName,
                Email,
                Phone,
                TechnicianTitle,
                password: passwordEncrypted,
                roleId,
                adminId
            }
        });
        const token = jwt.sign({ id: technician.id }, process.env.SECRET_WORD, {
            expiresIn: 86400
        });
        return res.status(200).json({
            technician,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
}


export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.technician.findFirst({
            where: {
                Email: email
            },
        });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const matchPassword = await comparePassword(password, user.password);
        if (!matchPassword) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ id: user.id }, process.env.SECRET_WORD, {
            expiresIn: 86400
        });
        res.status(200).json({
            user,
            token
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const deleteTechnician = async (req, res) => {
    const { id } = req.params;
    const technician = await prisma.technician.update({
        where: {
            id,
        },
        data: {
            active: false,
            dateInact: new Date(),
        }
    });
    res.json(technician);
}

export const restoreTechnician = async (req, res) => {
    const { id } = req.params;
    const technician = await prisma.technician.update({
        where: {
            id,
        },
        data: {
            active: true,
            dateInact: null,
        }
    });
    res.json(technician);
}

export const updateTechnician = async (req, res) => {
    try {
        const { id } = req.params;
        const { repairCenterId, techCode, tradeId, FullName, FirstName, LastName, Email, Phone, TechnicianTitle, roleId } = req.body;
        const technician = await prisma.technician.update({
            where: {
                id,
            },
            data: {
                repairCenterId,
                techCode,
                tradeId,
                FullName,
                FirstName,
                LastName,
                Email,
                Phone,
                TechnicianTitle,
                roleId
            }
        });
        res.json(technician);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }

}

export const createTechnicianDefault = async (req, res) => {
    const { techCode, FullName, FirstName, LastName, Email, Phone, TechnicianTitle, password } = req.body;
    const repairCenter = await prisma.repairCenter.create({
        data: {
            name: "Default"
        }
    });
    const trade = await prisma.trade.create({
        data: {
            name: "Default",
            repairCenterId: repairCenter.id
        }
    });
    const role = await prisma.role.create({
        data: {
            name: "Default",
            permissions: ["all"]
        }
    });
    try {
        const passwordEncrypted = await encryptPassword(password);
        const technician = await prisma.technician.create({
            data: {
                repairCenterId: repairCenter.id,
                techCode,
                tradeId: trade.id,
                FullName,
                FirstName,
                LastName,
                Email,
                Phone,
                TechnicianTitle,
                password: passwordEncrypted,
                roleId: role.id
            }
        });
        const updatedTechnicianAdminId = await prisma.technician.update({
            where: {
                id: technician.id
            },
            data: {
                adminId: technician.id
            }
        });
        res.status(200).json(updatedTechnicianAdminId);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
}

export const updatePassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { password } = req.body;
        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }
        const passwordEncrypted = await encryptPassword(password);
        const technician = await prisma.technician.update({
            where: {
                id,
            },
            data: {
                password: passwordEncrypted
            }
        });
        res.json(technician);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}