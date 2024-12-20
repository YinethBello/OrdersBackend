import { createRole, getRoleById, getRoles, updateRole, deleteRole} from "../controllers/roleController.js";
import express from "express";
import { verifyToken, verifyRole } from "../middlewares/authJwt.js";

const router = express.Router();

router.get("/", getRoles);
router.get("/:id", getRoleById);
router.post("/", verifyToken, verifyRole, createRole);
router.put("/:id", verifyToken, verifyRole, updateRole);
router.delete("/:id", verifyToken, verifyRole, deleteRole);

export default router;