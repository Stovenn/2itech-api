import * as express from 'express'
import { IndexController } from './controllers/IndexController'
import { UserController } from './controllers/userController'


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
        action: 'index',
    },

    {
        method: 'get',
        path: '/users',
        controller: UserController,
        action: 'getUsers'
    },
    {
        method: 'get',
        path: '/users/:email',
        controller: UserController,
        action: 'getUserByEmail'
    },
    {
        method: 'post',
        path: '/register',
        controller: UserController,
        action: 'register'
    }
]