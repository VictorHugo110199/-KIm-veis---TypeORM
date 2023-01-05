import { Entity, PrimaryGeneratedColumn, ManyToOne ,Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, OneToOne, JoinColumn, OneToMany} from "typeorm";
import { Addresses } from "./addresses.entity";
import { Categories } from "./categories.entity";
import { Schedules_user_properties } from "./schedules.entity";

@Entity('properties')
class Properties{

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ default: false})
    sold: boolean = false

    @Column('decimal')
    value: number

    @Column('integer')
    size: number

    @CreateDateColumn()
    createdAt: Date 

    @UpdateDateColumn()
    updatedAt: Date

    @OneToOne(() => Addresses) @JoinColumn()
    address: Addresses

    @ManyToOne(() => Categories, categories => categories.properties)
    category: Categories

    @OneToMany(() => Schedules_user_properties, schedules_user_properties => schedules_user_properties.property)
    schedules: Schedules_user_properties[]
}

export {Properties}