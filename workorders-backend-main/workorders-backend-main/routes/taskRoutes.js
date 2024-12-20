import { getTaskById, getTasks, createTask, deleteTask, restoreTask, updateTask, assignTechnicians } from "../controllers/taskController.js";
import express from "express";
import { verifyToken, verifyRole } from "../middlewares/authJwt.js";

const router = express.Router();

router.get("/", getTasks);
router.get("/:id", getTaskById);
router.post("/", verifyToken, verifyRole, createTask);
router.delete("/:id", verifyToken, verifyRole, deleteTask);
router.put("/restore/:id", verifyToken, verifyRole, restoreTask);
router.put("/:id", verifyToken, verifyRole, updateTask);
router.put("/assign/:id", verifyToken, verifyRole, assignTechnicians);

export default router;