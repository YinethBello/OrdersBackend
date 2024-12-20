import { getEquipment, getEquipments, createEquipment, updateEquipment, deleteEquipment } from "../controllers/equipmentController.js";
import express from "express";
import { verifyToken, verifyRole } from "../middlewares/authJwt.js";

const router = express.Router();

router.get("/", getEquipments);
router.get("/:id", getEquipment);
router.post("/", verifyToken, verifyRole, createEquipment);
router.delete("/:id", verifyToken, verifyRole, deleteEquipment);
router.put("/:id", verifyToken, verifyRole, updateEquipment);

export default router;