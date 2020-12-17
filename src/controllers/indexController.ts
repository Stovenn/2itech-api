import { Request, Response } from 'express'
import { Column, Db} from 'typeorm'
import { InternalServerError } from '../errors'

export class IndexController {
    async index(req: Request, res: Response): Promise <any> {
        // throw new InternalServerError('/')
        return { message: 'Hello World' };
    }
}