import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todas las órdenes de trabajo
export const getWorkOrders = async (req, res) => {
    const workOrders = await prisma.workOrder.findMany();
    res.json(workOrders);
}


export const getWorkOrderById = async (req, res) => {
    const { id } = req.params;
    const workOrder = await prisma.workOrder.findUnique({
        where: {
            id,
        }
    });
    res.json(workOrder);
}


export const createWorkOrder = async (req, res) => {
    try {
        const { facilityId, statusId, priorityId, requestTypeId, woOriginId, woTypeId } = req.body;
        const workOrder = await prisma.workOrder.create({
            data: {
                facilityId,
                statusId,
                priorityId,
                requestTypeId,
                woOriginId,
                woTypeId,
            }
        });
        const facility = await prisma.facility.findUnique({
            where: {
                id: facilityId
            }
        });
        const workOderderUpdate = await prisma.workOrder.update({
            where: {
                id: workOrder.id
            },
            data: {
                workOrderNum: facility.code.slice(0, 3) + workOrder.workOrderId
            }
        });
        res.json(workOderderUpdate);
    } catch (error) {
        console.log(error);
        if (error.code === 'P2003') { // Prisma error code for foreign key constraint violation
            return res.status(400).json({ message: "You cannot delete this trade as it is related to some entitys" });
        }
        return res.status(500).json({ message: error.message });
    }
}

// Actualizar una orden de trabajo
export const updateWorkOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { facilityId, statusId, priorityId, requestTypeId, woOriginId, woTypeId, technicianId } = req.body;

        const data = {};
        if (facilityId !== undefined) data.facilityId = facilityId;
        if (statusId !== undefined) data.statusId = statusId;
        if (priorityId !== undefined) data.priorityId = priorityId;
        if (requestTypeId !== undefined) data.requestTypeId = requestTypeId;
        if (woOriginId !== undefined) data.woOriginId = woOriginId;
        if (woTypeId !== undefined) data.woTypeId = woTypeId;
        if (technicianId !== undefined) data.technicianId = technicianId;

        const workOrder = await prisma.workOrder.update({
            where: {
                id,
            },
            data
        });
        res.json(workOrder);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}
// export const updateWorkOrder = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { facilityId, statusId, priorityId, requestTypeId, woOriginId, woTypeId, technicianId } = req.body;
//         const workOrder = await prisma.workOrder.update({
//             where: {
//                 id,
//             },
//             data: {
//                 facilityId,
//                 statusId,
//                 priorityId,
//                 requestTypeId,
//                 woOriginId,
//                 woTypeId,
//                 technicianId
//             }
//         });
//         res.json(workOrder);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: error.message });
//     }
// }

// Nueva función para buscar órdenes de trabajo
