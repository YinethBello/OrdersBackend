import { getArea, getAreas, createArea, updateArea, deleteArea } from "../controllers/areaController.js";
import express from "express";
import { verifyToken, verifyRole } from "../middlewares/authJwt.js";

const router = express.Router();

router.get("/", getAreas);
router.get("/:id", getArea);
router.post("/", verifyToken, verifyRole, createArea);
router.delete("/:id", verifyToken, verifyRole, deleteArea);
router.put("/:id", verifyToken, verifyRole, updateArea);

export default router;