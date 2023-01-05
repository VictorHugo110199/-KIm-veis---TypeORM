import { Router } from 'express'
import { creatPropetiesController, getPropetiesController } from '../controller/properties.controller'
import { ensureAuthMiddleware, ensureCreatePropetirySchema, ensureIsAdmMiddleware} from '../middleware/ensureAuth.middleware'
import { createPropertySchemas } from '../schemas/user.schemas'

const propertiesRoutes = Router()

propertiesRoutes.post('',ensureAuthMiddleware,
                        ensureIsAdmMiddleware,
                        ensureCreatePropetirySchema(createPropertySchemas),
                        creatPropetiesController
)
propertiesRoutes.get('',getPropetiesController)

export default propertiesRoutes