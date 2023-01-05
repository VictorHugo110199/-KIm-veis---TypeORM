import AppDataSource from "../data-source"
import { Properties } from "../entities/properties.entity"
import { Schedules_user_properties } from "../entities/schedules.entity"
import { User } from "../entities/user.entity";
import { IScheduleRequest } from "../interfaces/schedules"

export const createSchedulesService = async (scheduleData: IScheduleRequest) => {

    

    const propertyRepository = AppDataSource.getRepository(Properties)
    const userRepository = AppDataSource.getRepository(User)
    const schedulesRepository = AppDataSource.getRepository(Schedules_user_properties)

    const property = await propertyRepository.findOneBy({ 
        id: scheduleData.propertyId
    })

    const user = await userRepository.findOneBy({ 
        id: scheduleData.userId 
    })

    if (!property) {
      return [404, {message:"Property not found"}]
    }

    const schedulesExist = await schedulesRepository
      .createQueryBuilder("schedules_users_properties")
      .where(
        "schedules_users_properties.hour = :hour AND schedules_users_properties.date = :date",
        {
          date: scheduleData.date,
          hour: scheduleData.hour,
        }
      )
      .getExists()
    if (schedulesExist) {
        return [409, {message:"there is already a visit scheduled for that time or day"}]
    }

    const newSchedule = schedulesRepository.create({
        date: scheduleData.date,
        hour: scheduleData.hour,
        property: property!,
        user: user!,
    })

    await schedulesRepository.save(newSchedule)
    
    return [201, { message: "Schedule create" }]
};


export const listSchedulePropertiesService = async (propertyId: string): Promise<Array<number | object[] | object>> => {

    const propertiesRepository = AppDataSource.getRepository(Properties)
    const schedulesRepository = AppDataSource.getRepository(Schedules_user_properties)


    const validId = await propertiesRepository.findOneBy({
        id: propertyId
    })
    
    if(!validId){
        return [404, {message: "Property Does Not Exists!"}]
    }

    const schedules = await propertiesRepository.find({
        where: {
            id: propertyId
        }, relations: {
            address: true,
            category: true,
            schedules: {
                user: true
            }
        }
    })

    return [200, schedules[0]]
}