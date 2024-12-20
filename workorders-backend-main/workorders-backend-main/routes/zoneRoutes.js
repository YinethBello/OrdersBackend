import { getZones, getZoneById, createZone, updateZone, deleteZone } from "../controllers/zoneController.js";
import express from "express";
import { verifyToken, verifyRole } from "../middlewares/authJwt.js";

const router = express.Router();

router.get("/", getZones);
router.get("/:id", getZoneById);
router.post("/", verifyToken, verifyRole, createZone);
router.put("/:id", verifyToken, verifyRole, updateZone);
router.delete("/:id", verifyToken, verifyRole, deleteZone);

export default router;