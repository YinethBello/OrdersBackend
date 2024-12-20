import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config()

const secretWord = process.env.SECRET_WORD
const prisma = new PrismaClient()

export async function verifyToken(req, res, next) {
    let token = req.headers["access-token"]
    if (!token) {
        return res.status(403).json({ message: "Unprovisioned Token" })
    }
    try {
        const decoded = jwt.verify(token, secretWord)
        req.userId = decoded.id
        const user = await prisma.technician.findUnique({
            where: {
                id: req.userId
            }
        })

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        next()
    } catch (error) {
        res.status(401).json({ message: "invalid authorization" })
        console.log(error)
    }
}

export async function verifyRole(req, res, next) {
    try {
        const permission = req.headers["permission"]
        console.log(permission)
        const user = await prisma.technician.findUnique({
            where: {
                id: req.userId,
            }
        })
        const role = await prisma.role.findUnique({
            where: {
                id: user.roleId
            }
        })
        if (role.permissions.includes(permission) || role.permissions.includes("all")) {
            next()
            return
        }
        return res.status(403).json({ message: "You are not authorized to perform this action" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error in the sever" })
    }

}