import { Expect, Test, TestCase, AsyncTest, Setup, Teardown, Timeout } from 'alsatian';
import * as supertest from 'supertest';
import * as bluebird from 'bluebird';
import app from '../../api/app';
import { Server } from 'http';

import path = require('path');
let testloaitindang = require(path.join(__dirname, 'loaitindang.test.json'));
let config = require(path.join(__dirname, '..', '..', 'config', 'server.config.json'))['test'];


export class LoaiTinDangRouterTest {
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
        // console.log('chay Teardown')
    }



    @AsyncTest('should return json array')
    @Timeout(5000)
    public getAllLoaiTinDang() {
        return new bluebird((resolve, reject) => {
            this.request.get('/loaitindang')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect((res: supertest.Response) => {
                    Expect(res.body).toEqual(testloaitindang)
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
    //             .query({id:1})
    //             .expect('Content-Type', /json/)
    //             .expect((res: supertest.Response) => {
    //                 Expect(res.body).toEqual([TienIch[0]]);
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

    @AsyncTest('shuold create and return loaitindang')
    @Timeout(5000)
    public createALoaiTinDang() {
        return new bluebird((resolve, reject) => {
            this.request.post('/loaitindang')
                .type('form')
                .send({LoaiTinDangID: '11', KyHieu:'aaa', TenGoi:'aaa', BieuTuong:'aaa' })
                .expect(200)
                .expect((res: supertest.Response) => {
                    Expect(res.body).toEqual({ LoaiTinDangID: '11',  KyHieu:'aaa', TenGoi:'aaa', BieuTuong:'aaa' })
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

    @AsyncTest('should delete and return loaitindang TenGoi')
    @Timeout(5000)
    @TestCase(0)
    public deleteALoaiTinDang(index: number) {
        return new bluebird((resolve, reject) => {
            this.request.delete('/loaitindang')
                .query({ id: 5})
                .expect(200)
                .expect((res: supertest.Response) => {
                    Expect(res.text).toEqual('Loại tin đăng ' + testloaitindang[index].TenGoi + ' đã được hủy')
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
    
@AsyncTest('shuold edit and return loaitindang')
    @Timeout(7000)
    public editALoaiTinDang() {
        return new bluebird((resolve, reject) => {
            this.request.put('/loaitindang')
                .type('form')
                .send({id:9, KyHieu:'bbb', TenGoi:'aaa', BieuTuong:'aaa' })
                .expect(200)
                .expect((res: supertest.Response) => {
                    Expect(res.body).toEqual({ id:'9',  KyHieu:'bbb', TenGoi:'aaa', BieuTuong:'aaa' })
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



    @Test('add 1 and 2 shuold return 3')
    @TestCase(1,2,3)
    public testAdd(v1,v2,expected){
        Expect(v1+v2).toEqual(expected);
    }


}