import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from "typeorm";

@Entity('addresses')
class Addresses {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    district: string

    @Column()
    zipCode: string
    
    @Column()
    number: string

    @Column()
    city: string

    @Column()
    state: string
}

export {Addresses}