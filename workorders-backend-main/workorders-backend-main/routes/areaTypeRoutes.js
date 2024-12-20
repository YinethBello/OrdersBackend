import { getAreaType, getAreaTypes, createAreaType, deleteAreaType, updateAreaType } from "../controllers/areaTypeController.js";
import express from "express";
import { verifyToken, verifyRole } from "../middlewares/authJwt.js";

const router = express.Router();

router.get("/", getAreaTypes);
router.get("/:id", getAreaType);
router.post("/", verifyToken, verifyRole, createAreaType);
router.delete("/:id", verifyToken, verifyRole, deleteAreaType);
router.put("/:id", verifyToken, verifyRole, updateAreaType);

export default router;