// Dependencies
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------

const express = require("express");
const exphbs = require("express-handlebars");

// For Express Routes
const basehtml = require("./routes/html-routes");
const favorites = require("./routes/api-favorite-routes");
const pexels = require("./routes/api-pexels-routes");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const music = require("./routes/api-music-routes");
const meditation = require("./route/api-meditation-routes");


// Express App
const app = express();
const PORT = process.env.PORT || 3000;

// Getting sequelize for database
const db = require("./models");

// Express Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Using static directory in HTML
app.use(express.static("public"));

// Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
// ---------------------------------------------------------------------------
app.use("/", basehtml);
app.use("/art", pexels);
app.use("/music", music);
app.use("/meditation", meditation);
//app.use("/meditation", spotify);
app.use("/spotify", spotify);
app.use("/api", favorites);

db.sequelize.sync({}).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

//Auth0
// ---------------------------------------------------------------------------

//Configure express-session
// ---------------------------------------------------------------------------
var session = require("express-session");

// config express-session
var sess = {
  secret: "5iRrBgXtRckfnncIDxBPfYrXPnfxMJ_Pgv2IgZhoM0gNOG3bTShNPck-SFFPMzgx",
  cookie: {},
  resave: false,
  saveUninitialized: true
};

if (app.get("env") === "production") {
  // Use secure cookies in production (requires SSL/TLS)
  sess.cookie.secure = true;

  // Uncomment the line below if your application is behind a proxy (like on Heroku)
  // or if you're encountering the error message:
  // "Unable to verify authorization request state"
  // app.set('trust proxy', 1);
}

app.use(session(sess));

//Configure Passport with the application settings
// ---------------------------------------------------------------------------

// Load environment variables from .env
var dotenv = require("dotenv");
dotenv.config();

// Load Passport
var passport = require("passport");
var Auth0Strategy = require("passport-auth0");

// Configure Passport to use Auth0
var strategy = new Auth0Strategy(
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

//Including the routers and userInViews middleware
//---------------------------------------------------------------------------

var userInViews = require('./lib/middleware/userInViews');
var authRouter = require('./routes/auth');
var usersRouter = require('./routes/users');

app.use(userInViews());
app.use('/', authRouter);
app.use('/', usersRouter);


//Storing and retrieving user data from the session
// ---------------------------------------------------------------------------

// You can use this section to keep a smaller payload
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});


