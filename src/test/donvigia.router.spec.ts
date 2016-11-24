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
    @AsyncTest('Danh sách đơn vị giá:')
    @Timeout(5000)
    public GetAllDonViGia() {
        return new bluebird((resolve, reject) => {
            this.request.get('/DonViGia/GetAll')
                .expect('Content-Type',/json/)
                .expect((res: supertest.Response) => {
                    console.warn(res);
                })
                .end(err => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                })
        })
    }

}