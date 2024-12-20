import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTrades = async (req, res) => {
    const trades = await prisma.trade.findMany();
    res.json(trades);
}

export const getTradeById = async (req, res) => {
    const { id } = req.params;
    const trade = await prisma.trade.findUnique({
        where: {
            id,
        }
    });
    res.json(trade);
}

export const createTrade = async (req, res) => {
    const { name, repairCenterId } = req.body;
    const trade = await prisma.trade.create({
        data: {
            name,
            repairCenterId
        }
    });
    res.json(trade);
}

export const updateTrade = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, repairCenterId } = req.body;
        const trade = await prisma.trade.update({
            where: {
                id,
            },
            data: {
                name,
                repairCenterId
            }
        });
        return res.json(trade);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error in the server" });
    }
}

export const deleteTrade = async (req, res) => {
    try {
        const { id } = req.params;
        if(!id) return res.status(400).json({ message: "Trade id is required" });
        await prisma.trade.delete({
            where: {
                id,
            }
        });
        return res.status(200).json({ message: "Trade deleted" });
        } catch (error) {
        if (error.code === 'P2003') { // Prisma error code for foreign key constraint violation
            return res.status(400).json({ message: "You cannot delete this trade as it is related to some users" });
        }
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}