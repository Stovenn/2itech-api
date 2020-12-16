import * as express from 'express'
import { Request, Response, Application} from 'express'
const app: Application = express()

app.get('/', (req: Request, res: Response): void =>{
    console.log(req.url)
    res.json({message: 'hello'})
})

app.listen(3000, ():void => console.log("Server is running..."))