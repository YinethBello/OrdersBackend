import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";

//import routes
import workOrdersRoutes from "./routes/workOrdersRoutes.js";
import zoneRoutes from "./routes/zoneRoutes.js";
import facilityRoutes from "./routes/facilityRoutes.js";
import statusRoutes from "./routes/statusRoutes.js";
import priorityRoutes from "./routes/priorityRoutes.js";
import requestTypeRoutes from "./routes/requestTypeRoutes.js";
import woOriginRoutes from "./routes/woOriginRoutes.js";
import woTypeRoutes from "./routes/woTypeRoutes.js";
import repairCenterRoutes from "./routes/repairCenterRoutes.js";
import tradeRoutes from "./routes/tradeRoutes.js";
import technicianRoutes from "./routes/technicianRoutes.js";
import taskTypeRoutes from "./routes/taskTypeRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import roleRoutes from "./routes/roleRoutes.js";
import scheduledTaskRoutes from "./routes/sheduleTaskRoutes.js";
import areaTypeRoutes from "./routes/areaTypeRoutes.js";
import buildingRoutes from "./routes/buildingRoutes.js";
import floorRoutes from "./routes/floorRoutes.js";
import areaRoutes from "./routes/areaRoutes.js";
import equipmentTypeRoutes from "./routes/equipmentTypeRoutes.js";
import getEquipmentRoutes from "./routes/equipmentRoutes.js";

const app = express();

//midlewares
app.use(cors({
    origin: "*",
}));
app.use(morgan("dev"));
app.use(express.json());

//routes
// app.use("/api/users", userRoutes);
app.use("/api/workOrders", workOrdersRoutes);
app.use("/api/zones", zoneRoutes);
app.use("/api/facilities", facilityRoutes);
app.use("/api/status", statusRoutes);
app.use("/api/priorities", priorityRoutes);
app.use("/api/requestTypes", requestTypeRoutes);
app.use("/api/woOrigins", woOriginRoutes);
app.use("/api/woTypes", woTypeRoutes);
app.use("/api/repairCenters", repairCenterRoutes);
app.use("/api/trades", tradeRoutes);
app.use("/api/technicians", technicianRoutes);
app.use("/api/taskTypes", taskTypeRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/roles", roleRoutes);
app.use('/api/scheduled-tasks', scheduledTaskRoutes)
app.use("/api/areaTypes", areaTypeRoutes);
app.use("/api/buildings", buildingRoutes);
app.use("/api/floors", floorRoutes);
app.use("/api/areas", areaRoutes);
app.use("/api/equipmentTypes", equipmentTypeRoutes);
app.use("/api/equipments", getEquipmentRoutes);

export default app;