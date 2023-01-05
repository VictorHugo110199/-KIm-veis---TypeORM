import { IUserLogin } from '../interfaces/users/index'
import jwt from 'jsonwebtoken'
import { compare } from 'bcryptjs'
import AppDataSource from '../data-source'
import { User } from '../entities/user.entity'
import 'dotenv/config'

export const createLoginService = async ( { email, password }: IUserLogin ): Promise<Array<number | object | string>> => {

    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOneByOrFail({
        email: email
    })
    
    if(!user){
        return [403, {message: "User email or password invalid"}]
    }

    if(user.isActive === false) {
        return [400, {message: "User Deleted!"}]
    }

    const passwordMatch = await compare(password, user.password)

    if(!passwordMatch){
        return [403, {message: "User email or password invalid"}]
    }

    const token = jwt.sign(
        {
            isAdm: user.isAdm
        },
        process.env.SECRET_KEY as string,
        {
            subject: user.id, 
            expiresIn: '24h'
        }
    )

    return [200, {token: token}]

}

