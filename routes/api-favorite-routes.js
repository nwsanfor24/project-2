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
router.post("/favorite", secured(), function (req, res, next) {

  db.User.findOne({
    where: {
      userid: req.user._json.email
    },
    raw: true
  }).then((foundUser) => {
    db.Favorite.create({
      src: req.body.src,
      image: req.body.image,
      text: req.body.text,
      UserId: foundUser.id
    })
      .then(function(favorited) {

        res.json(favorited);

      }).catch(function(error) {
        console.error(error);
        res.status(403);
      });
  });
});

// Remove favorite
router.delete("/favorite/:id", secured(), function(req, res) {

  db.User.findOne({
    where: {
      userid: req.user._json.email
    },
    raw: true
  }).then((foundUser) => {
    db.Favorite.destroy(
      {
        where: {
          id: req.params.id,
          UserId: foundUser.id
        }
      }
    ).then(function() {
      res.sendStatus(200);
    }).catch(function(error) {
      console.error(error);
      res.status(403);
    });
  });
});

module.exports = router;