import { ICategoryRequest } from "../interfaces/categories"
import AppDataSource from "../data-source"
import { Categories } from "../entities/categories.entity"

export const createCategoryService = async (data: ICategoryRequest): Promise<Array<number | object>> => {
    
    const categoriesRepository = AppDataSource.getRepository(Categories)

    const existsCategory = await categoriesRepository.findOneBy({
        name: data.name
    })

    if(existsCategory) {
        return [409, {message: "Category Already Exists"}]
    }

    const createCategory = categoriesRepository.create(data)
    await categoriesRepository.save(createCategory)

    return [201, createCategory]
}

export const listAllCategoriesService = async (): Promise<Array<number | object>> => {

    const categoriesRepository = AppDataSource.getRepository(Categories)

    const categories = await categoriesRepository.find()

    return [200, categories]
}

export const listPropertiesCategoryService= async (id: string): Promise<Array<number | object>> => {

    const categoriesRepository = AppDataSource.getRepository(Categories)
    
    const categoryProperties = await categoriesRepository.findOne({
        where:{
            id:id
        }, relations: {
            properties: true
        }
    })

    if (!categoryProperties) {
        return [404, {message: "Category Does Not Exists!"}]
    }

    return [200, categoryProperties!]
}