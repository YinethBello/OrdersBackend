import { getRepairCenters, getRepairCenterById, createRepairCenter, updateRepairCenter, deleteRepairCenter } from "../controllers/repairCenterController.js";
import express from "express";
import { verifyToken, verifyRole } from "../middlewares/authJwt.js";

const router = express.Router();

router.get("/", getRepairCenters);
router.get("/:id", getRepairCenterById);
router.post("/", verifyToken, verifyRole, createRepairCenter);
router.put("/:id", verifyToken, verifyRole, updateRepairCenter);
router.delete("/:id", verifyToken, verifyRole, deleteRepairCenter);

export default router;