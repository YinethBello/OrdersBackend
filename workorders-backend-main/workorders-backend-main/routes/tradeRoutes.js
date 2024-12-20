import { getTrades, getTradeById, createTrade, updateTrade, deleteTrade } from "../controllers/tradeController.js";
import express from "express";
import { verifyToken, verifyRole } from "../middlewares/authJwt.js";

const router = express.Router();

router.get("/", getTrades);
router.get("/:id", getTradeById);
router.post("/", verifyToken, verifyRole, createTrade);
router.put("/:id", verifyToken, verifyRole, updateTrade);
router.delete("/:id", verifyToken, verifyRole, deleteTrade);

export default router;