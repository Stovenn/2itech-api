import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcryptjs"
@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({unique: true})
    email: string

    @Column()
    password: string

    setPassword(password: string): void{
        this.password = bcrypt.hashSync(password)
    }
}