import { Promise } from 'es6-promise'
import * as pg from 'pg';
import path = require('path');
let env = process.env.NODE_ENV || 'development';
let config = require(path.join(__dirname,'..','config','database.config.json'))[env];


var connectString = ('postgres://' + config.username + ':' + config.password + '@' + config.host + config.database);
pg.connect(connectString, (err,client,done) => {
    if(err){
        console.error(err.message)
        done(err);
        return;
    }

    client.query('BEGIN')
        .then(() => {
            return client.query('INSERT INTO public."ioh_TienIch" VALUES(1,"HA","Thiên nhiên hoang dã","http://biancuocsong.com/wp-content/uploads/2015/12/hinh-anh-thien-nhi%C3%AAn-dep-5.jpg"');
        })
        .then(() => {
            return client.query('INSERT INTO public."ioh_TienIch" VALUES(2,"TN","Thác nước","http://hinhanhdep.pro/content/uploads/2014/09/35-hinh-anh-thien-nhien-dep-nhat-126-28.jpg"');
        })
        .then(() =>{
            return client.query('INSERT INTO public."ioh_TienIch" VALUES(3,"ĐV","Động vật","http://www.danongonline.com.vn/product_images/s/065/dong-vat-hoang-da(7)__12773_zoom.jpg"');
        })
        .then(() =>{
            return client.query('INSERT INTO public."ioh_TienIch" VALUES(4,"ST","Sư tử","http://image.xahoi.com.vn/resize_580x1100/news/2014/10/25/anh-dep-ve-dong-vat3.jpg"');
        })
        .catch(error => {
            console.error('Error in create mock data',error);
            client.query('ROLLBACK');
        })

    
})