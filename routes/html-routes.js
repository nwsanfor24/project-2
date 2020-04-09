// Dependencies
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------

const express = require("express");
const secured = require("../lib/middleware/secured");
const router = express.Router();

// Getting sequelize for database
const db = require("../models");

// Routes
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------

router.get("/", function(req, res) {
  res.render("start", { title: "Give Me A Break!" });
});

router.get("/home", secured(), function(req, res) {

  db.User.findOne({
    where: {
      userid: req.user._json.email
    },
    raw: true,
    order: [["updatedAt", "DESC"]]
  }).then(function(data) {

    db.Favorite.findAll({
      where: {
        UserId: data.id
      },
      raw: true,
      order: [["updatedAt", "DESC"]]
    }).then((favData) => {

      const favorites = {
        favorite: favData
      };
      console.log(favorites);
      res.render("index", favorites);

    }).catch(function(error) {
      console.error(error);
      res.status(403);
    });

  });

});

module.exports = router;

