import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { User } from "../entity/User";
import { BadRequest, NotFoundError, ConflictError, UnprocessableEntityError} from "../errors";
import { UserRepository } from "../repository/UserRepository";

export class UserController {

    private userRepo: UserRepository = getCustomRepository(UserRepository)

    async getUsers(req: Request, res: Response) {
        return await this.userRepo.find()
    }

    async getUserByEmail(req: Request, res: Response) {
        const email = req.params.email
        if(!email){
            throw new BadRequest()
        }
        const user: User | undefined = await this.userRepo.findByEmail(req.params.email)
        if(!user){
            throw new NotFoundError(req.url)
        }
        return user
    }

    async register(req: Request, res: Response) {
        const body = req.body;
        const user = new User()
        
        user.firstName = body.firstName
        user.lastName = body.lastName
        user.email = body.email
        user.setPassword(body.password)

        try {
            res.status(201)
            await this.userRepo.save(user)
        } catch (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                throw new ConflictError()
            }
            throw new UnprocessableEntityError()
        }

        return user
    }
}