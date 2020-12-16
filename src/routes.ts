import * as express from 'express'
import { IndexController } from './controllers/indexController'

export interface Route {
    method: string                      //get, post, put, delete
    path: string                        // chemin
    controller: any                     //objet
    action: string                      //methode
    middleware?: Function | Function[]  //[func1, func2, func3]
}

export const routes: Route[] = [
    {
        method: 'get',
        path: '/',
        controller: IndexController,
        action: 'index'
    },
]