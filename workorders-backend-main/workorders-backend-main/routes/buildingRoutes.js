import { createBuilding, getBuilding, getBuildings, updateBuilding, deleteBuilding } from "../controllers/buildingController.js";
import express from "express";
import { verifyToken, verifyRole } from "../middlewares/authJwt.js";

const router = express.Router();

router.get("/", getBuildings);
router.get("/:id", getBuilding);
router.post("/", verifyToken, verifyRole, createBuilding);
router.delete("/:id", verifyToken, verifyRole, deleteBuilding);
router.put("/:id", verifyToken, verifyRole, updateBuilding);

export default router;