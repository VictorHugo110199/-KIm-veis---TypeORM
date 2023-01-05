import { Request, Response } from "express"
import { ICategoryRequest } from "../interfaces/categories"
import { createCategoryService, listAllCategoriesService, listPropertiesCategoryService } from "../services/categories.service"

export const createCategoryController = async (req: Request, res: Response) => {
    const categoryName: ICategoryRequest = req.body
    const [status, data] = await createCategoryService(categoryName)
    return res.status(status as number).json(data)
}

export const listAllCategoriesController = async (req: Request, res: Response) => {
    const [status, data] = await listAllCategoriesService()
    return res.status(status as number).json(data)
}

export const listPropertiesCategoryController = async (req: Request, res: Response) => {
    const id:  string = req.params.id
    const [status, data] = await listPropertiesCategoryService(id)
    return res.status(status as number).json(data)
}