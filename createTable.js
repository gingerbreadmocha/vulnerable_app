const { Pool, Client } = require('pg');
const config = require('./config.json');

const pool = new Pool(config);

const initTable = () => pool.query(
    'DROP TABLE IF EXISTS post; ' + 
    'CREATE TABLE post( ' + 
        'post_id serial PRIMARY KEY,' + 
        'username VARCHAR (50) NOT null,' + 
        'post VARCHAR (2000) NOT null, ' + 
        'created_on TIMESTAMP NOT null' + 
    ');');

 const seed = () => pool.query(
     `INSERT INTO post ( username, post, created_on) VALUES ( 'moogle', 'hello, kupo', current_timestamp);`
 );


const initDB = async() => {
    try{
        await initTable()
        await seed()
        console.log('success');

    } catch (e){
        console.log('error ', e)
    }
}

initDB();