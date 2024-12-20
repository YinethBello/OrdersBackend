// routes/scheduledTaskRoutes.js
import express from 'express'
import {
  createRecurringTask,
  createOneTimeTask,
  cancelScheduledTask,
  listScheduledTasks,
  createMonthlyRecurringTask,
  createAnnualTask,
} from '../controllers/sheduleTaskController.js'
import { verifyToken, verifyRole } from "../middlewares/authJwt.js"

const router = express.Router()

// Ruta para crear tarea recurrente
router.post('/recurring', verifyToken, verifyRole, createRecurringTask)

// Ruta para crear tarea programada única
router.post('/one-time', verifyToken, verifyRole, createOneTimeTask)

// Ruta para cancelar tarea programada
router.delete('/:id', verifyToken, verifyRole, cancelScheduledTask)

// Ruta para listar tareas programadas de un usuario
router.get('/user/:userId', verifyToken, listScheduledTasks)
// Ruta para crear tarea recurrente mensual
router.post('/monthly', verifyToken, verifyRole, createMonthlyRecurringTask);
// Ruta para crear tarea anual
router.post('/annual', verifyToken, verifyRole, createAnnualTask);



export default router