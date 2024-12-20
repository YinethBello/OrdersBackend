import { getWoOrigins, getWoOriginById, createWoOrigin, updateWoOrigin, deleteWoOrigin } from "../controllers/woOriginController.js";
import express from "express";
import { verifyToken, verifyRole } from "../middlewares/authJwt.js";

const router = express.Router();

router.get("/", getWoOrigins);
router.get("/:id", getWoOriginById);
router.post("/", verifyToken, verifyRole, createWoOrigin);
router.put("/:id", verifyToken, verifyRole, updateWoOrigin);
router.delete("/:id", verifyToken, verifyRole, deleteWoOrigin);

export default router;