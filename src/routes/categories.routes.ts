import { Router } from 'express'
import { createCategoryController, listAllCategoriesController, listPropertiesCategoryController } from '../controller/categories.controller'
import { ensureAuthMiddleware, ensureIdExistsMiddleware, ensureIsAdmMiddleware, ensureUpdateSchema, ensureUserActiveMiddleware } from '../middleware/ensureAuth.middleware'

const categoriesRoutes = Router()

categoriesRoutes.post('',ensureAuthMiddleware,ensureIsAdmMiddleware,createCategoryController)
categoriesRoutes.get('',listAllCategoriesController)
categoriesRoutes.get('/:id/properties', listPropertiesCategoryController)

export default categoriesRoutes