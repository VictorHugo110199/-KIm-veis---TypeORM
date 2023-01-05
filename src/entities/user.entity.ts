import { hashSync } from "bcryptjs";
import { Entity, OneToMany ,PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import { Schedules_user_properties } from "./schedules.entity";

@Entity('users')
class User {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    isAdm: boolean

    @Column({ default: true})
    isActive: boolean = true

    @CreateDateColumn()
    createdAt: Date 

    @UpdateDateColumn()
    updatedAt: Date
    
    @BeforeUpdate()
    @BeforeInsert()
    hashPassword(){
        this.password = hashSync(this.password, 10)
    }

    @OneToMany(() => Schedules_user_properties, schedules_user_properties => schedules_user_properties.user)
    schedules: Schedules_user_properties[]

}

export { User }