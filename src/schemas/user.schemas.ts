import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { IPropertyRequest, IAddressRequest } from '../interfaces/properties'
import { IUser, IUserUpdate } from '../interfaces/users'

export const userWithoutPasswordSchemas: SchemaOf<IUser> = yup.object().shape({
    email: yup.string().email().notRequired(),
    name: yup.string().notRequired(),
    isAdm: yup.boolean().notRequired(),
    id: yup.string().notRequired(),
    createdAt: yup.date().notRequired(),
    updatedAt: yup.date().notRequired(),
    isActive: yup.boolean().notRequired()
})

export const updateUserSchemas: SchemaOf<IUserUpdate> = yup.object().shape({
    email: yup.string().email().notRequired(),
    name: yup.string().notRequired(),
    password: yup.string().notRequired()
}).noUnknown().strict()

export const createPropertySchemas: SchemaOf<IPropertyRequest> = yup.object().shape({
    value: yup.number(),
    size: yup.number(),
    address: yup.object({
        district: yup.string(),
        zipCode: yup.string().max(8),
        number: yup.string().notRequired(),
        city: yup.string(),
        state: yup.string().max(2)
    }) ,
    categoryId: yup.string()
}).noUnknown().strict()