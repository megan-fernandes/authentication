"use strict";
//connecting database to server...DB connection
const Pool = require("pg").Pool;
const pool = new Pool({
    user: "postgres",
    password: "DB@megs17",
    host: "localhost",
    port: 5432,
    database: 'auth'
});
module.exports = pool;
