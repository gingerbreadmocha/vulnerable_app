const express = require('express');

const app = express();

const cookieParser = require('cookie-parser')

const config = require('./config.json');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser())

//app.use(express.static(__dirname + '/'));
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/index', async (req, res) => {
    const data = await getPosts();
    res.cookie('liofotia', 'madburnish');
    //console.log('data ', data.rows);
    const rows = data.rows;
    res.render('index.ejs', {
        cat: 'maru',
        dog: 'floofy',
        moogle: 'kupo',
        posts: rows
        
    });
});

app.post('/createMessage', (req, res) => {
    const username = req.body.username.replace(/\'/g, "'");
    const post = req.body.postcontent.replace(/\'/g, "'");
    //console.log('asdfsa ', username, post);
    addPost(username, post);
    res.redirect('/index');

})

const server = app.listen(3000, () => {

});

const { Pool, Client } = require('pg')

const pool = new Pool(config);

const getPosts = () => {
    return pool.query('SELECT * FROM post');
}

const addPost = (username, post) => {
    return pool.query(`INSERT INTO post ( username, post, created_on) VALUES ( '${username}', '${post}', current_timestamp);`);
}
