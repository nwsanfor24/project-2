
//Configure express-session
//////////////////////////////////////////////////////////////////////
const session = require("express-session");
const sess = {
  //The secret parameter is a secret string that is used to sign the session ID cookie.
  secret: "5iRrBgXtRckfnncIDxBPfYrXPnfxMJ_Pgv2IgZhoM0gNOG3bTShNPck-SFFPMzgx",
  cookie: {},
  resave: false,
  saveUninitialized: true
};
if (app.get("env") === "production") {
  sess.cookie.secure = true;

  // Uncomment the line below if your application is behind a proxy (like on Heroku)
  // or if you"re encountering the error message:
  // "Unable to verify authorization request state"
  app.set("trust proxy", 1);
}
app.use(session(sess));
//////////////////////////////////////////////////////////////////////


//Configure Passport with the application settings
//////////////////////////////////////////////////////////////////////
// Load environment constiables from .env
const dotenv = require("dotenv");
dotenv.config();
// Load Passport
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
// Configure Passport to use Auth0
const strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:
      process.env.AUTH0_CALLBACK_URL || "http://localhost:3000/callback"
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  }
);
passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());
//////////////////////////////////////////////////////////////////////

//Storing and retrieving user data from the session
//////////////////////////////////////////////////////////////////////
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});
//////////////////////////////////////////////////////////////////////


//Including the routers and userInViews middleware
//////////////////////////////////////////////////////////////////////
const userInViews = require("./lib/middleware/userInViews");
const authRouter = require("./routes/auth");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

app.use(userInViews());
app.use("/", authRouter);
app.use("/", indexRouter);
app.use("/", usersRouter);
//////////////////////////////////////////////////////////////////////