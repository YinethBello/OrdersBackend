import { getFacilities, getFacilityById, createFacility, updateFacility, deleteFacility } from "../controllers/facilityController.js";
import express from "express";
import { verifyToken, verifyRole } from "../middlewares/authJwt.js";

const router = express.Router();

router.get("/", getFacilities);
router.get("/:id", getFacilityById);
router.post("/", verifyToken, verifyRole, createFacility);
router.put("/:id", verifyToken, verifyRole, updateFacility);
router.delete("/:id", verifyToken, verifyRole, deleteFacility);

export default router;