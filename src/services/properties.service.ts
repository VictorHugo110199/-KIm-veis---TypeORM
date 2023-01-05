import AppDataSource from "../data-source"
import { Addresses } from "../entities/addresses.entity"
import { Categories } from "../entities/categories.entity"
import { Properties } from "../entities/properties.entity"
import { IPropertyRequest } from "../interfaces/properties"

export const creatPropetyService = async (propetyData: IPropertyRequest): Promise<Array<number | object>> => {

    const categoryRepository = AppDataSource.getRepository(Categories)
    const propetiesRepository = AppDataSource.getRepository(Properties)
    const addressRepository = AppDataSource.getRepository(Addresses)

    const verifyCategory = await categoryRepository.findOneBy({
        id: propetyData.categoryId
    })

    if(!verifyCategory){
        return [404, {message: "Category Does Not Exists!"}]
    }

    const verifyAddress = await addressRepository.findOneBy({
        zipCode: propetyData.address?.zipCode
    })

    if(verifyAddress?.zipCode === propetyData.address?.zipCode && verifyAddress?.number === propetyData.address?.number){
        return [409, {message: "Propety Alredy Exists!"}]
    }

    const createAddress = addressRepository.create(propetyData.address!)
    await addressRepository.save(createAddress)

    const createProperty = propetiesRepository.create({
        size: propetyData.size,
        value: propetyData.value,
        address: createAddress,
        category: verifyCategory
    })
    await propetiesRepository.save(createProperty)


    return [201, createProperty]
}

export const getPropetiesService = async (): Promise<Array<number | object>> => {

    const propetiesRepository = AppDataSource.getRepository(Properties)

    const propeties = await propetiesRepository.find()

    return[200, propeties]
}