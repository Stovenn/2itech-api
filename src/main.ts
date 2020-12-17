import * as express from 'express'
import {createConnection} from 'typeorm'
import * as bodyParser from 'body-parser'
import { Request, Response, Application, NextFunction} from 'express'
import { Route, routes } from './routes'
import { DomainError, NotFoundError } from './errors'

//Variables d'environnement
const HOST = process.env.HOST || 'localhost'
const PORT = Number(process.env.PORT) || 3000

//Creation de l'instance d'application express
const app: Application = express()
app.set('views', './views')
app.set('view engine', 'ejs')

function handleError(res: Response, err: Error | DomainError){
    if (err instanceof DomainError){
        res.status(err.code).json(err)
        return;
    }
    res.json(err)
}
//Ajout des middleware
app.use(express.static('static'))
app.use(bodyParser.json())


app.use((req,res,next)=>{
    //throw new NotFoundError('My middleware')
    next()
})

//Gestion des routes
routes.forEach((route: Route): void =>{

    app[route.method](route.path, (req: Request, res: Response)=>{
        const controller = new (route.controller)
        const result = controller[route.action](req, res)

        if(result instanceof Promise){
            result.then(data => data !==null && data !== undefined ? res.send(data) : undefined)
                .catch(err => handleError(res, err))
        }else if(result !== null  && result !== undefined){
            res.json(result)
        } 
    })
})

app.use((err:Error | DomainError, req: Request, res: Response, next: NextFunction) =>{
    handleError(res, err)
})

//Ecoute du serveur
module.exports = app.listen(PORT, HOST, async() => {
    console.log(`[express] server has started on localhost:3000`)
    try {
        await createConnection()
    } catch (error) {
        console.log('[typeorm] connection error:', error)
    }
})