import { EntityRepository, Repository } from "typeorm";
import { User } from "../entity/User";

@EntityRepository(User)
export class UserRepository extends Repository<User>{

    async findByEmail(value:string): Promise<User | undefined> {
        return await this.findOne({where: {email:value}})
    }
}