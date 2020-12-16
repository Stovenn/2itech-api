import { Request, Response } from 'express'

export class IndexController {

    async index(req: Request, res: Response): Promise <any> {
        return {message: 'Hello World'};
    }

}