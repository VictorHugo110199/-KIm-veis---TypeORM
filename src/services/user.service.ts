import AppDataSource from "../data-source"
import { IUserRequest, IUser, IUserErrorReturn, IUserUpdate } from "../interfaces/users/index"
import { User } from "../entities/user.entity"
import { userWithoutPasswordSchemas } from "../schemas/user.schemas"
import { hash } from "bcryptjs"

export const creatUserService = async (userData: IUserRequest): Promise<Array<IUser| number | IUserErrorReturn>> => {

    const userRepository = AppDataSource.getRepository(User)

    const newUser = await userRepository.findOneBy({
        email: userData.email
    })

    if(newUser) {
        return [409, {message: "Email already exist!"}]
    }

    const createdUser = userRepository.create(userData)

    await userRepository.save(createdUser)

    const userWithoutpassword = await userWithoutPasswordSchemas.validate(createdUser, {
        stripUnknown: true 
    })

    return [201, userWithoutpassword] 
}

export const getAllUserService = async (): Promise<IUser[]> => {

    const userRepository = AppDataSource.getRepository(User)

    const users = await userRepository.find()

    const userNoPassword: IUser[] = []

    users.forEach(async (user) => {
       const newUser: IUser = {
        email: user.email,
        id: user.id,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        name: user.name,
        isAdm: user.isAdm
       }
        userNoPassword.push(newUser)
    })

    return userNoPassword
}

export const patchUserService = async (id: string, userData:IUserUpdate): Promise<Array<number| IUserUpdate | IUserErrorReturn>> => {

    const userRepository = AppDataSource.getRepository(User)

    let user = await userRepository.findOneBy({
        id: id
    })

    if(userData.name){
        user!.name = userData.name
    }
    if(userData.email){
        user!.email = userData.email
    }
    if(userData.password){
        user!.password = await hash (userData.password, 10)
    }

    await userRepository.save(user!)

    const userWithoutpassword = await userWithoutPasswordSchemas.validate(user, {
        stripUnknown: true 
    })
    
    return [200, userWithoutpassword]
}

export const deleteUserService = async (id:string): Promise<Array<number | IUser | string>> => {

    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOneBy({
        id: id
    })

    user!.isActive = false 

    await userRepository.save(user!)

    const userWithoutpassword = await userWithoutPasswordSchemas.validate(user, {
        stripUnknown: true 
    })
    
    return [204, userWithoutpassword]
}