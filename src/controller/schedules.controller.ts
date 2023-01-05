import { Request, Response } from "express"
import { IScheduleRequest } from "../interfaces/schedules"
import { createSchedulesService, listSchedulePropertiesService } from "../services/schedules.service"

export const createSchedulesController = async (req: Request, res: Response) => {
    const scheduleData: IScheduleRequest = req.body
    const [status, data] = await createSchedulesService(scheduleData)
    return res.status(status as number).json(data)
}

export const listSchedulePropertiesController = async (req: Request, res: Response) => {
    const propertyId: string = req.params.id
    const [status, data] = await listSchedulePropertiesService(propertyId)
    return res.status(status as number).json(data)
}