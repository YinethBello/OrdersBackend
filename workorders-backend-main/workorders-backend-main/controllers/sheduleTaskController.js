// controllers/scheduledTaskController.js
import { PrismaClient } from '@prisma/client'
import cron from 'node-cron'
import schedule from 'node-schedule'

const prisma = new PrismaClient()
const scheduledJobs = new Map() // Para rastrear trabajos programados

export const createRecurringTask = async (req, res) => {
  try {
    const {
      name,
      description,
      workOrderId,
      taskTypeId,
      adminId,
      technicianIds,
      recurrenceDays
    } = req.body

    // Datos base de la tarea
    const taskData = {
      name,
      description,
      workOrderId,
      taskTypeId,
      adminId,
      isScheduled: true,
      scheduleType: 'RECURRING',
      recurrenceType: 'WEEKLY',
      recurrenceDays
    }

    // Agregar técnicos si están presentes
    if (technicianIds && Array.isArray(technicianIds) && technicianIds.length > 0) {
      taskData.technicians = {
        connect: technicianIds.map(id => ({ id }))
      }
    }

    const task = await prisma.task.create({
      data: taskData,
      include: {
        technicians: true,
        taskType: true,
        workOrder: true
      }
    })

    // Configurar cron job para días específicos
    recurrenceDays.forEach(day => {
      const cronDay = getDayCronExpression(day)
      const job = cron.schedule(cronDay, async () => {
        await executeRecurringTask(task)
      })

      // Guardar referencia del trabajo
      scheduledJobs.set(task.id, job)
    })

    res.status(201).json({
      message: 'Tarea recurrente creada exitosamente',
      task
    })
  } catch (error) {
    console.error('Error en createRecurringTask:', error)
    res.status(500).json({
      message: 'Error creando tarea recurrente',
      error: error.message
    })
  }
}

export const createMonthlyRecurringTask = async (req, res) => {
  try {
    const {
      name,
      description,
      workOrderId,
      taskTypeId,
      adminId,
      technicianIds,
      dayMonth,
    } = req.body;

    if (dayMonth < 1 || dayMonth > 31) {
      return res.status(400).json({ message: 'El día del mes debe estar entre 1 y 31.' });
    }

    const taskData = {
      name,
      description,
      workOrderId,
      taskTypeId,
      adminId,
      isScheduled: true,
      scheduleType: 'RECURRING',
      recurrenceType: 'MONTHLY',
      dayMonth: parseInt(dayMonth),
    };

    if (technicianIds && Array.isArray(technicianIds) && technicianIds.length > 0) {
      taskData.technicians = {
        connect: technicianIds.map((id) => ({ id })),
      };
    }

    const task = await prisma.task.create({
      data: taskData,
      include: {
        technicians: true,
        taskType: true,
        workOrder: true,
      },
    });

    // Configurar cron job para día específico del mes
    const job = cron.schedule(`0 9 ${dayMonth} * *`, async () => {
      await executeRecurringTask(task);
    });

    scheduledJobs.set(task.id, job);

    res.status(201).json({
      message: 'Tarea recurrente mensual creada exitosamente',
      task,
    });
  } catch (error) {
    console.error('Error en createMonthlyRecurringTask:', error);
    res.status(500).json({
      message: 'Error creando tarea recurrente mensual',
      error: error.message,
    });
  }
};

export const createAnnualTask = async (req, res) => {
  try {
    const {
      name,
      description,
      workOrderId,
      taskTypeId,
      adminId,
      technicianIds,
      specificDate // Fecha específica anual
    } = req.body;

    const taskData = {
      name,
      description,
      workOrderId,
      taskTypeId,
      adminId,
      isScheduled: true,
      scheduleType: 'RECURRING',
      recurrenceType: 'ANNUAL',
      specificDate: new Date(specificDate)
    };

    // Agregar técnicos si están presentes
    if (technicianIds && Array.isArray(technicianIds) && technicianIds.length > 0) {
      taskData.technicians = {
        connect: technicianIds.map(id => ({ id }))
      };
    }

    const task = await prisma.task.create({
      data: taskData,
      include: {
        technicians: true,
        taskType: true,
        workOrder: true
      }
    });

    // Programar la tarea anual
    const job = schedule.scheduleJob(`ANNUAL_${task.id}`, taskData.specificDate, async () => {
      await executeRecurringTask(task);
    });

    // Guardar referencia del trabajo programado
    scheduledJobs.set(task.id, job);

    res.status(201).json({
      message: 'Tarea anual creada exitosamente',
      task
    });
  } catch (error) {
    console.error('Error en createAnnualTask:', error);
    res.status(500).json({
      message: 'Error creando tarea anual',
      error: error.message
    });
  }
};


export const createOneTimeTask = async (req, res) => {
  try {
    const {
      name,
      description,
      workOrderId,
      taskTypeId,
      adminId,
      technicianIds,
      specificDate
    } = req.body

    const taskData = {
      name,
      description,
      workOrderId,
      taskTypeId,
      adminId,
      isScheduled: true,
      scheduleType: 'ONE_TIME',
      specificDate: new Date(specificDate)
    }

    // Agregar técnicos si están presentes
    if (technicianIds && Array.isArray(technicianIds) && technicianIds.length > 0) {
      taskData.technicians = {
        connect: technicianIds.map(id => ({ id }))
      }
    }

    const task = await prisma.task.create({
      data: taskData,
      include: {
        technicians: true,
        taskType: true,
        workOrder: true
      }
    })

    // Programar ejecución única
    const job = schedule.scheduleJob(new Date(specificDate), async () => {
      await executeOneTimeTask(task)
    })

    // Guardar referencia del trabajo
    scheduledJobs.set(task.id, job)

    res.status(201).json({
      message: 'Tarea programada creada exitosamente',
      task
    })
  } catch (error) {
    console.error('Error en createOneTimeTask:', error)
    res.status(500).json({
      message: 'Error creando tarea programada',
      error: error.message
    })
  }
}

export const cancelScheduledTask = async (req, res) => {
  try {
    const { id } = req.params

    // Cancelar el trabajo programado
    const job = scheduledJobs.get(id)
    if (job) {
      // Verificar qué tipo de trabajo es y usar el método apropiado
      if (job.hasOwnProperty('stop')) {
        // Es un trabajo de node-cron
        job.stop()
      } else {
        // Es un trabajo de node-schedule
        job.cancel()
      }
      scheduledJobs.delete(id)
    }

    // Actualizar en base de datos
    const task = await prisma.task.update({
      where: { id },
      data: {
        isScheduled: false,
        specificDate: null
      }
    })

    res.status(200).json({
      message: 'Tarea programada cancelada exitosamente',
      task
    })
  } catch (error) {
    console.error('Error en cancelScheduledTask:', error)
    res.status(500).json({
      message: 'Error cancelando tarea programada',
      error: error.message
    })
  }
}

export const listScheduledTasks = async (req, res) => {
  try {
    const { userId } = req.params

    const scheduledTasks = await prisma.task.findMany({
      where: {
        adminId: userId,
        isScheduled: true
      },
      include: {
        technicians: true,
        taskType: true,
        workOrder: true
      }
    })

    res.status(200).json(scheduledTasks)
  } catch (error) {
    console.error('Error en listScheduledTasks:', error)
    res.status(500).json({
      message: 'Error listando tareas programadas',
      error: error.message
    })
  }
}

// Función auxiliar para ejecutar tarea recurrente
async function executeRecurringTask(originalTask) {
  try {
    await prisma.task.create({
      data: {
        name: originalTask.name,
        description: originalTask.description,
        workOrderId: originalTask.workOrderId,
        taskTypeId: originalTask.taskTypeId,
        adminId: originalTask.adminId,
        technicians: {
          connect: originalTask.technicians.map(tech => ({ id: tech.id }))
        }
      }
    })
  } catch (error) {
    console.error('Error ejecutando tarea recurrente:', error)
  }
}

// Función auxiliar para ejecutar tarea única
async function executeOneTimeTask(originalTask) {
  try {
    await prisma.task.update({
      where: { id: originalTask.id },
      data: {
        isScheduled: false,
        specificDate: null
      }
    })

    // Puedes agregar lógica adicional aquí si es necesario
  } catch (error) {
    console.error('Error ejecutando tarea única:', error)
  }
}

// Mapeo de días a expresiones cron
function getDayCronExpression(day) {
  const dayMap = {
    'Lunes': '0 9 * * 1',
    'Martes': '0 9 * * 2',
    'Miércoles': '0 9 * * 3',
    'Jueves': '0 9 * * 4',
    'Viernes': '0 9 * * 5',
    'Sábado': '0 9 * * 6',
    'Domingo': '0 9 * * 0'
  }
  return dayMap[day] || '0 9 * * 1' // Por defecto lunes
}