import { getEquipmentType, getEquipmentTypes, createEquipmentType, updateEquipmentType, deleteEquipmentType } from "../controllers/equipmentTypeController.js";
import express from "express";
import { verifyToken, verifyRole } from "../middlewares/authJwt.js";

const router = express.Router();

router.get("/", getEquipmentTypes);
router.get("/:id", getEquipmentType);
router.post("/", verifyToken, verifyRole, createEquipmentType);
router.delete("/:id", verifyToken, verifyRole, deleteEquipmentType);
router.put("/:id", verifyToken, verifyRole, updateEquipmentType);

export default router;