import { Expect, Test, TestCase, AsyncTest, Setup, Teardown, Timeout } from 'alsatian';
import * as supertest from 'supertest';
import * as bluebird from 'bluebird';
import app from '../../api/app';
import { Server } from 'http';

import path = require('path');
let testtienich = require(path.join(__dirname, 'tienich.test.json'));
let config = require(path.join(__dirname, '..', '..', 'config', 'server.config.json'))['test'];

export class TienIchRouterTest {
    request: supertest.SuperTest<supertest.Test> = supertest('http://localhost:3000/api');
    instance: Server;

    @Setup
    public setUp() {
        this.instance = app.listen(3000, 'localhost');
        // console.log('chay setup')
    }

    @Teardown
    public tearDown() {
        this.instance.close();
        
    }



    @AsyncTest('should return json array')
    @Timeout(5000)
    public getAllTienIch() {
        return new bluebird((resolve, reject) => {
            this.request.get('/tienich')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect((res: supertest.Response) => {
                    Expect(res.body).toEqual(testtienich)
                })
                .end((err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                })
                
        })
    }


    // @AsyncTest('should return book with name book1')
    // @Timeout(5000)
    // public getATienIch() {
    //     return new bluebird((resolve, reject) => {
    //         this.request.get('/tienich')
    //             // .query({id:4})
    //             .expect(200)
    //             .expect('Content-Type', /json/)
    //             .expect((res: supertest.Response) => {
    //                 Expect(testtienich[0]).toEqual(res.body || {});
    //             })
    //             .end(err => {
    //                 if (err) {
    //                     reject(err);
    //                 } else {
    //                     resolve();
    //                 }
    //             })
    //     })
    // }



    @AsyncTest('shuold create and return tienich')
    @Timeout(5000)
    public createATienIch() {
        return new bluebird((resolve, reject) => {
            this.request.post('/tienich')
                .type('form')
                .send({TienIchID:'9', KyHieu:'aaa', TenGoi:'aaa', BieuTuong:'aaa' })
                .expect(200)
                .expect((res: supertest.Response) => {
                    Expect(res.body).toEqual({ TienIchID:'9',  KyHieu:'aaa', TenGoi:'aaa', BieuTuong:'aaa' })
                })
               .end(function(err) {
                    if (err) {
                        reject(err);
                        console.log("Erro k them dc")
                    } else {
                        resolve();
                        console.log('da them thanh cong!')
                    }
                })
        })
    }

@AsyncTest('shuold edit and return tiechich')
    @Timeout(7000)
    public editATienIch() {
        return new bluebird((resolve, reject) => {
            this.request.put('/tienich')
                .type('form')
                .send({id:2, KyHieu:'bbb', TenGoi:'aaa', BieuTuong:'aaa' })
                .expect(200)
                .expect((res: supertest.Response) => {
                    Expect(res.body).toEqual({ id:'2',  KyHieu:'bbb', TenGoi:'aaa', BieuTuong:'aaa' })
                })
                .end(function(err) {
                    if (err) {
                        reject(err);
                        console.log("Erro k sua dc")
                    } else {
                        resolve();
                        console.log('da sua thanh cong!')
                    }
                })
        })
    }

    @AsyncTest('should delete and return tienich TenGoi')
    @Timeout(5000)
    @TestCase(0)
    public deleteATienIch(index: number) {
        return new bluebird((resolve, reject) => {
            this.request.delete('/tienich')
                .query({ id: testtienich[index].10 })
                .expect(200)
                .expect((res: supertest.Response) => {
                    Expect(res.text).toEqual('Tien Ich ' + testtienich[index].TenGoi + ' da duoc huy')
                })
                .end(err => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                })
        })
    }

    @Test('add 1 and 2 shuold return 3')
    @TestCase(1,2,3)
    public testAdd(v1,v2,expected){
        Expect(v1+v2).toEqual(expected);
    }


}