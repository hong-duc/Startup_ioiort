import { Expect, Test, TestCase, AsyncTest, Setup, Teardown, Timeout } from 'alsatian';
import * as supertest from 'supertest';
import * as bluebird from 'bluebird';
import app from '../api/app';
import { Server } from 'http';
import { bookData,productData,Contacts } from './test.data';
export class BookRouterTest {
    request: supertest.SuperTest<supertest.Test> = supertest('http://localhost:8081/api');
    instance: Server;

    @Setup
    public setUp() {
        this.instance = app.listen(8081, 'localhost');
    }
    @Teardown
    public tearDown() {
        this.instance.close();
    }
    // @AsyncTest('Check Mail nếu truyền vào đúng mail thì sẽ ra true, sai sẽ ra false')
    // @Timeout(5000)
    // public CheckMail() {
    //     return new bluebird((resolve, reject) => {
    //         this.request.post('/Contact/ForgetPass')
    //              .type('form')
    //              .send({email:'bebinhdt1@gmail.com'})
    //             .expect('Content-Type', /json/)
    //             .expect(200)
    //             .expect((res: supertest.Response) => {
    //                 Expect(res.body).toEqual(true);
    //             })
    //             .end((err, res) => {
    //                 if (err) {
    //                     reject(err);
    //                 } else {
    //                     resolve(res);
    //                 }
    //             })
                
    //     })
    // }
    @AsyncTest('Check tài khoản nếu đúng thì sẽ xuất ra thông tin tài khoản, sai thì trả về null')
    @Timeout(5000)
    public Login() {
        return new bluebird((resolve, reject) => {
            this.request.post('/Contact/Login')
                 .type('form')
                 .send({user:'tamti',pass:'tambaba'})
                .expect('Content-Type', /json/)
                .expect(200)
                .expect((res: supertest.Response) => {
                      console.info(res.body);
                })
                .end((err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                })
                
        })
    }
}