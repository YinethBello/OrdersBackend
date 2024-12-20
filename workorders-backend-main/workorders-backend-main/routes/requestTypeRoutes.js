import { getRequestTypes, getRequestTypeById, createRequestType, updateRequestType, deleteRequestType } from "../controllers/requestTypeController.js";
import express from "express";
import { verifyToken, verifyRole } from "../middlewares/authJwt.js";

const router = express.Router();

router.get("/", getRequestTypes);
router.get("/:id", getRequestTypeById);
router.post("/", verifyToken, verifyRole, createRequestType);
router.put("/:id", verifyToken, verifyRole, updateRequestType);
router.delete("/:id", verifyToken, verifyRole, deleteRequestType);

export default router;