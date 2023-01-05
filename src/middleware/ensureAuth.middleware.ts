import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import AppDataSource from '../data-source'
import { User } from '../entities/user.entity'
import { AnySchema } from 'yup'
import { hash } from 'bcryptjs'

export const ensureAuthMiddleware = async(req: Request, res: Response, next: NextFunction) => {

    let token = req.headers.authorization

    if(!token){
        return res.status(401).json({
            message: 'Invalid token'
        })
    }

    token = token.split(' ')[1]

    jwt.verify(token as string, process.env.SECRET_KEY as string, (error: any, decoded: any) => {
        if(error){
            return res.status(401).json({
                message: error.message
            })
        }
        
        req.user = {
            id: decoded.sub,
            isAdm: decoded.isAdm
        }

        return next()
    })

}

export const ensureIsAdmMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    if (req.user.isAdm === false) {
        return res.status(403).json({
            "message": "Missing admin permissions"
        })
    }

    return next()
}

export const ensureIdExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOneBy({
        id: req.params.id
    })

    if (!user) {
        return res.status(404).json({message: "User Does Not Exists"})
    }

    return next()
}

export const ensureUserActiveMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    
    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOneBy({
        id: req.params.id
    })

    if (user!.isActive === false){
        return res.status(400).json({message:"User Already Deleted"})
    }

    return next()
}

export const ensureUpdateSchema = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validated = await schema.validate(req.body, {
            abortEarly: true,
            stripUnknown: false
        })
        req.body = validated
        return next()
    }catch (error) {
        return res.status(401).json({ message: "Information missing" });
    }
}

export const ensureCreatePropetirySchema = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validated = await schema.validate(req.body, {
            abortEarly: true,
            stripUnknown: false
        })
        req.body = validated
        return next()
    }catch (error) {
        return res.status(400).json({ message: "Information missing" });
    }
}


export const authDateTimeMiddleware = (req: Request,res: Response,next: NextFunction) => {

  const validTime = new Date(`${req.body.date} ${req.body.hour}`).getHours();
  const validDate = new Date(`${req.body.date} ${req.body.hour}`).getDay();

  if (validDate < 1 || validDate > 5) {
    return res.status(400).json({message: "Invalid Date"})
  }

  if (validTime < 8 || validTime >= 18) {
    return res.status(400).json({message:"Invalid Time!"})
  }

  next();
};