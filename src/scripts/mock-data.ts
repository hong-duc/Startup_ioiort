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
            return client.query('INSERT INTO "ioh_TienIch" VALUES (1,"test1","test1","http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png")');
        })
        .then(() => {
            return client.query('INSERT INTO "ioh_TienIch" VALUES (2,"test2","test2","http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png")');
        })
         .then(() => {
            return client.query('INSERT INTO "ioh_TienIch" VALUES (3,"test3","test3","http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png")');
        })
         .then(() => {
            return client.query('INSERT INTO "ioh_TienIch" VALUES (4,"test4","test4","http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png")');
        })

        .then(() => {
        return client.query('INSERT INTO "ioh_LoaiTinDang" VALUES (1,"tindang1","tindang1","http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png")');
         })
           .then(() => {
        return client.query('INSERT INTO "ioh_LoaiTinDang" VALUES (2,"tindang2","tindang2","http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png")');
         })
           .then(() => {
        return client.query('INSERT INTO "ioh_LoaiTinDang" VALUES (3,"tindang3","tindang3","http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png")');
         })
           .then(() => {
        return client.query('INSERT INTO "ioh_LoaiTinDang" VALUES (4,"tindang4","tindang4","http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png")');
         })
        .catch(error => {
            console.error('Error in create mock data',error);
            client.query('ROLLBACK');
        })

    
})