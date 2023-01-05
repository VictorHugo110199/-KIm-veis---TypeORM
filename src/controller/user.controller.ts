import { creatUserService, deleteUserService, getAllUserService, patchUserService } from "../services/user.service"
import { Request, Response } from "express"
import { IUserRequest, IUserUpdate } from "../interfaces/users/index"

export const creatUserController = async (req: Request, res: Response) => {
   const userData: IUserRequest = req.body
   const [status, newUser] = await creatUserService(userData)
   return res.status(status as number).json(newUser)
}

export const getAllUserController = async (req: Request, res: Response) => {
    const users = await getAllUserService()
    return res.status(200).json(users)
}

export const patchUserController = async (req: Request, res: Response) => {
    const id: string = req.params.id
    const userData:IUserUpdate = req.body
    const [status, data] = await patchUserService(id, userData)
    return res.status(status as number).json(data)
}

export const deleteUserController = async (req: Request, res: Response) => {
    const id:  string = req.params.id
    const [status, data] = await deleteUserService(id)
    return res.status(status as number).json(data)
}