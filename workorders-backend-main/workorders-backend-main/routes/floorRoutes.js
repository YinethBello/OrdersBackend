import { createFloor, getFloor, getFloors, updateFloor, deleteFloor } from "../controllers/floorController.js";
import express from "express";
import { verifyToken, verifyRole } from "../middlewares/authJwt.js";

const router = express.Router();

router.get("/", getFloors);
router.get("/:id", getFloor);
router.post("/", verifyToken, verifyRole, createFloor);
router.delete("/:id", verifyToken, verifyRole, deleteFloor);
router.put("/:id", verifyToken, verifyRole, updateFloor);

export default router;