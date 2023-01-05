import { Router } from 'express'
import { authDateTimeMiddleware, ensureAuthMiddleware, ensureIsAdmMiddleware } from "../middleware/ensureAuth.middleware"
import { createSchedulesController, listSchedulePropertiesController } from '../controller/schedules.controller'

const schedulesRoutes = Router()

schedulesRoutes.post('',authDateTimeMiddleware,ensureAuthMiddleware,createSchedulesController)
schedulesRoutes.get('/properties/:id',ensureAuthMiddleware,ensureIsAdmMiddleware,listSchedulePropertiesController)

export default schedulesRoutes