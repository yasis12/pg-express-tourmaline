const express = require('express');
const app = express();

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
const PORT = 5004;
app.listen(PORT, () => {
    console.log('up and running on port', PORT);
});

