import "mocha";
import * as app from '../src/main'
import chai = require('chai')
import chaiHttp = require('chai-http')
import { expect } from 'chai'

chai.use(chaiHttp)

describe('Hello test', () =>{
    //suite de tests

    it('GET / should return "Hello, World"', ()=>{
        chai.request(app)
        .get('/')
            .end((err: any, res: any)=>{
                expect(res).to.have.json
                expect(res).to.have.status(200)
               // expect(res.body).equal({ message: 'Hello World' })
            })
    })
})