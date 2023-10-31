const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
require('dotenv').config()

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID as string,
			clientSecret: process.env.CLIENT_SECRET as string,
			callbackURL:process.env.CALLBACK_URL as string,
			scope: ["email", "profile"],
		},
		function (accessToken: string, refreshToken: string, profile: object, callback: Function) {
			// console.log("......",profile);
			callback(null, profile);
		}
	)
);

passport.serializeUser((user: object, done: Function) => {
	done(null, user);
});

passport.deserializeUser((user: object, done: Function) => {
	done(null, user);
});