//router
import {Request, Response} from "express";
const auth_router = require('express').Router();
const signUpController = require("../controller/Auth")
const passport = require("passport");
require("../middleware/passport")

function isLoggedIn(req: Request, res: Response, next: any) {
  console.log(req)
    req.user ? next() : console.log("error"); 
    // res.status(401);
  }

//Login
// localhost:3001/auth/
auth_router.post("/auth",signUpController.login)


//Login with google
// localhost:3001/auth/google/
auth_router.get("/auth/google", passport.authenticate('google', { scope: [ 'email', 'profile' ]}))


//localhost:3001/auth/google/callback
auth_router.get("/auth/google/callback", passport.authenticate( 'google', { failureRedirect: '/auth/google/failure' }), signUpController.callback)


//localhost:3001/auth/google/failure
auth_router.get("/auth/google/failure", (req: Request, res: Response)=>{
    console.log("Failed to authenticate.")

})

//protected route
// localhost: 3001/auth/protected
auth_router.get('/auth/protected', isLoggedIn, signUpController.protected);

//logout
// localhost:3001/auth/logout
// auth_router.post("/logout/:email",signUpController.logOut)


module.exports = auth_router