import { Request, Response } from "express"
import { IPropertyRequest } from "../interfaces/properties"
import { creatPropetyService, getPropetiesService } from "../services/properties.service"

export const creatPropetiesController = async (req: Request, res: Response) => {
    const propetyData: IPropertyRequest = req.body
    const [status, data] = await creatPropetyService(propetyData)
    return res.status(status as number).json(data)
}

export const getPropetiesController = async (req: Request, res: Response) => {
    const [status, data] = await getPropetiesService()
    return res.status(status as number).json(data)
}