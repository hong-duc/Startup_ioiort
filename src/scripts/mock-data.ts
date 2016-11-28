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
            return client.query('INSERT INTO TEN_TABLE VALUES(A,B,N,C)');
        })
        .then(() => {
            return client.query('INSERT INTO TEN_TABLE VALUES(A,B,N,C)');
        })
        .catch(error => {
            console.error('Error in create mock data',error);
            client.query('ROLLBACK');
        })

    
})