import { Request, Response } from 'express'
import { IUserLogin } from '../interfaces/users/index'
import { createLoginService } from '../services/login.service'

const createSessionController = async(req: Request, res: Response) => {

    const sessionData: IUserLogin = req.body
    const [status, data] = await createLoginService(sessionData)
    return res.status(status as number).json(data)

}

export { createSessionController }