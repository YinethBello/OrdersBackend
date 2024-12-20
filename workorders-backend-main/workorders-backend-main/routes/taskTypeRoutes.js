import { getTaskTypes, getTaskTypeById, createTaskType, deleteTaskType, updateTaskType } from "../controllers/taskTypeController.js";
import express from "express";
import { verifyToken, verifyRole } from "../middlewares/authJwt.js";

const router = express.Router();

router.get("/", getTaskTypes);
router.get("/:id", getTaskTypeById);
router.post("/", verifyToken, verifyRole, createTaskType);
router.delete("/:id", verifyToken, verifyRole, deleteTaskType);
router.put("/:id", verifyToken, verifyRole, updateTaskType);

export default router;