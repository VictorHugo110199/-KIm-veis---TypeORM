import { Router } from 'express'
import { creatUserController, deleteUserController, getAllUserController, patchUserController } from '../controller/user.controller'
import { ensureAuthMiddleware, ensureIdExistsMiddleware, ensureIsAdmMiddleware, ensureUpdateSchema, ensureUserActiveMiddleware } from '../middleware/ensureAuth.middleware'
import { updateUserSchemas } from '../schemas/user.schemas'


const userRoutes = Router()

userRoutes.post('', creatUserController)
userRoutes.get('',ensureAuthMiddleware, ensureIsAdmMiddleware, getAllUserController)
userRoutes.patch('/:id', ensureAuthMiddleware, 
                        ensureIdExistsMiddleware,  
                        ensureIsAdmMiddleware, 
                        ensureUpdateSchema(updateUserSchemas),
                        patchUserController
)
userRoutes.delete('/:id',ensureAuthMiddleware, 
                        ensureIdExistsMiddleware, 
                        ensureIsAdmMiddleware, 
                        ensureUserActiveMiddleware, 
                        deleteUserController
)

export default userRoutes