import { getWoTypes, getWoTypeById, createWoType, updateWoType, deleteWoType } from "../controllers/woTypeController.js";
import express from "express";
import { verifyToken, verifyRole } from "../middlewares/authJwt.js";

const router = express.Router();

router.get("/", getWoTypes);
router.get("/:id", getWoTypeById);
router.post("/", verifyToken, verifyRole, createWoType);
router.put("/:id", verifyToken, verifyRole, updateWoType);
router.delete("/:id", verifyToken, verifyRole, deleteWoType);

export default router;