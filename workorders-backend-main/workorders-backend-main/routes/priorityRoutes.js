import { getPriorities, getPriorityById, createPriority, updatePriority, deletePriority } from "../controllers/priorityController.js";
import express from "express";
import { verifyToken, verifyRole } from "../middlewares/authJwt.js";

const router = express.Router();

router.get("/", getPriorities);
router.get("/:id", getPriorityById);
router.post("/", verifyToken, verifyRole, createPriority);
router.put("/:id", verifyToken, verifyRole, updatePriority);
router.delete("/:id", verifyToken, verifyRole, deletePriority);

export default router;