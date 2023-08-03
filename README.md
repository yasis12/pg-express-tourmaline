# Music Library

Build a music library with postgres and [the node `pg` module](https://node-postgres.com/)

---

To spin up this project:

```sh
npm install
npm install pg
npm start
```

If you don't already have a `songs` database, create one using Postico and run the SQL from [database.sql](./database.sql).

Initially, only the GET and POST routes will work. After we're done adding the database, all of the server routes should work. 
