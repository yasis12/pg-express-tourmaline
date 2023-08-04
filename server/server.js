const express = require('express');
const app = express();
const router = express.Router();
const pg = require('pg'); //import just what we need

const pool = new pg.Pool({
    // Name of the database, app specific
    database: 'music_library',
    // where is your database? localhost === on computer
    host: 'localhost',
    // Postgres listens for network connections on port 5432 by default
    port: 5432
})
// Parse the request body, required for req.body
// NOTE: This was previously bodyParser.json(), express
// now supports parsing json without needing bodyParser.
app.use(express.json());

// Serve "static assets" (html, css, client-side js)
// from the server/public folder
app.use(express.static('server/public'));

// Setup the songs router
// to respond to requests from the `/songs` URL
let songsRouter = require('./routes/songs.router');
app.use('/songs', songsRouter);

// Start express
const PORT = 5001;
app.listen(PORT, () => {
    console.log('up and running on port', PORT);
});
//GET SQL
app.get('/database' , (req, res) => {
    let queryText = 'SELECT * FROM songs;';  //no user entry in the GET but for all others we are prventing SQL injection with the $1
    pool.query(queryText)
    .then((result) => {
        res.send(result.rows);
    })
    .catch((err) => {
        console.log(`Error making query ${queryText}`,err);
        res.sendStatus(500)
    })
});
//POST SQL
app.post('/database', (req,res) => {
    let newSong = req.body;
    let queryText = `INSERT INTO songs (artist, track, published, rank)
        VALUES ($1, $2, $3, $4);`;
        //by using this, we are avioding SQL injeciton.
    pool.quesry(queryText, [newSong.artist, newSong.track, newSong.published, newSong.rank])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log(`Error making query ${queryText}`, err);
            res.sendStatus(500);
        })
});
//DELETE SQL
app.delete('/database/:id', (req,res) => {
    let id = req.params.id;
    let queryText = `DELETE FROM "songs" WHERE "id" = $1;`;
    pool.query(queryText, [id])
    .then((result) => {
        res.sendStatus(200);
    })
    .catch((err) => {
        console.log(`Error making query ${queryText}`, err);
        res.sendStatus(500);
    })
});
//PUT SQL
app.put('/database/rank/:id', (req,res) => {
    let id = req.params.id;
    let queryText = `UPDATE "songs" SET "rank" = + 1 WHERE "id" = $1;`;
    pool.query(queryText, [id])
    .then((result) => {
        res.sendStatus(200);
    })
    .catch((err) => {
        console.log(`Error making query ${queryText}`, err);
        res.sendStatus(500);
    })
})
