"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const exphbs = require('express-handlebars');
const passport = require('passport');
const app = express();
const authRouter = require("./routes/auth");
const session = require("express-session");
require("dotenv").config();
require("./middleware/passport");
//session 
app.use(session({
    secret: "hakuna_matata",
    resave: false,
    maxAge: 24 * 60 * 60 * 100,
    saveUninitialized: true,
}));
//middleware
app.use(express.json()); //to get json request data
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
//setting view engine
app.engine('handlebars', exphbs.engine({ extname: 'handlebars', defaultLayout: "main" }));
app.set('view engine', 'handlebars');
// home route
app.get('/', (req, res) => {
    res.render('index', { title: "Welcome! let us log you in" });
});
//Routes
app.use('/', authRouter); //Auth APIs
app.listen(3001, () => {
    console.log(`Server is running on port 3001`);
});
