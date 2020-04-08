// Dependencies
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------

const express = require("express");
const router = express.Router();

// Getting sequelize for database
const db = require("../models");

//Require secured
const secured = require("../lib/middleware/secured.js");

// Routes
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------

router.get("/", function(req, res) {
  res.render("start", { title: "Give Me A Break!" });
});

router.get("/home", function(req, res) {
  res.render("index", { title: "Give Me A Break!" });

// UNCOMMENT THIS ONCE WE HAVE THE USERID & CARDS ON THE HOME PAGE

//   db.Favorites.findAll({
//     where: {
//       UserId: 1
//     },
//     raw: true,
//     order: [["updatedAt", "DESC"]]
//   }).then(function(data) {

//     const favorites = {
//       favorite: data
//     };

//     res.render("index", favorites);

//   });
// });

router.get("/music", function(req, res) {
  res.render("music", { title: "Music to soothe your soul"});
});

router.get("/meditation", function(req, res) {
  res.render("meditation", { title: "Meditate" });
});

module.exports = router;
