import { getStatuses, getStatusById, createStatus, updateStatus, deleteStatus } from "../controllers/statusController.js";
import express from "express";
import { verifyToken, verifyRole } from "../middlewares/authJwt.js";

const router = express.Router();

router.get("/", getStatuses);
router.get("/:id", getStatusById);
router.post("/", verifyToken, verifyRole, createStatus);
router.put("/:id", verifyToken, verifyRole, updateStatus);
router.delete("/:id", verifyToken, verifyRole, deleteStatus);

export default router;