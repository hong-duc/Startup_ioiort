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
    @AsyncTest('Lấy 1 yêu cầu bán dựa trên get url/:id')
    @Timeout(5000)
    public GetOneYeuCauBan() {
        return new bluebird((resolve, reject) => {
            this.request.get('/YeuCauBan/GetOne/1')
                .expect('Content-Type',/json/)
                .expect((res: supertest.Response) => {
                    console.warn(res.body);
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