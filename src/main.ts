import * as express from 'express'
import {createConnection} from 'typeorm'
import * as bodyParser from 'body-parser'
import { Request, Response, Application} from 'express'
import { Route, routes } from './routes'


//Variables d'environnement
const HOST = process.env.HOST || 'localhost'
const PORT = Number(process.env.PORT) || 3000

//Creation de l'instance d'application express
const app: Application = express()

//Ajout des middleware
app.use(express.static('static'))
app.use(bodyParser.json())

//Gestion des routes
routes.forEach((route: Route): any =>{
    
    app[route.method](route.path, (req: Request, res: Response)=>{
        const controller = new (route.controller)
        const result = controller[route.action](req, res)

        if(result instanceof Promise){
            result.then( 
                data => data !==null && data !== undefined ? res.send(data) : null,
                err => console.log(err)
            )
        }else if(result !== null  && result !== undefined){
            res.json(result)
        }  
    })
})

//Ecoute du serveur
app.listen(PORT, HOST, () => {
    console.log(`[express] server has started on localhost:3000`)
    try {
        createConnection()
    } catch (error) {
        console.log('[typeorm] connection error:', error)
    }
})