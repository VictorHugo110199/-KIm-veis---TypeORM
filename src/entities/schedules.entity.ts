import { Entity, PrimaryGeneratedColumn, ManyToOne , Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import { Properties } from "./properties.entity";
import { User } from "./user.entity";

@Entity('schedules_user_properties')
class Schedules_user_properties {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'date'})
    date: string 

    @Column({ type: 'time'})
    hour: string

    @ManyToOne(() => Properties, properties => properties.schedules)
    property: Properties

    @ManyToOne(() => User, user => user.schedules)
    user: User
}

export {Schedules_user_properties}