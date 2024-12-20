import { getWorkOrders, getWorkOrderById, createWorkOrder, updateWorkOrder } from "../controllers/workOrdersController.js";
import express from "express";
import { verifyToken, verifyRole } from "../middlewares/authJwt.js";

const router = express.Router();

router.get("/", getWorkOrders);
router.get("/:id", getWorkOrderById);
router.post("/", verifyToken, verifyRole, createWorkOrder);
router.put("/:id", verifyToken, verifyRole, updateWorkOrder);

export default router;