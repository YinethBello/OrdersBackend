import {
    getTechnicians,
    getTechnicianById,
    createTechnician,
    login,
    createSubTechnician,
    deleteTechnician,
    restoreTechnician,
    updateTechnician,
    createTechnicianDefault,
    updatePassword
} from "../controllers/technicianController.js";
import express from "express";
import { verifyToken, verifyRole } from "../middlewares/authJwt.js";

const router = express.Router();

router.get("/sub/:adminId", getTechnicians);
router.get("/:id", getTechnicianById);
router.post("/", verifyToken, createTechnician);
router.post("/sub", verifyToken, verifyRole, createSubTechnician);
router.post("/login", login);
router.delete("/:id", verifyToken, verifyRole, deleteTechnician);
router.put("/restore/:id", verifyToken, verifyRole, restoreTechnician);
router.put("/:id", verifyToken, verifyRole, updateTechnician);
router.post("/default", createTechnicianDefault);
router.put("/updatePassword/:id", verifyToken, updatePassword);

export default router;