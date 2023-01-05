import { Router } from 'express'
import { createSessionController } from '../controller/login.controller'

const loginRoutes = Router()

loginRoutes.post('', createSessionController)

export default loginRoutes