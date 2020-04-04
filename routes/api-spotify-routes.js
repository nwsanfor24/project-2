// Dependencies
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------

const express = require("express");
const router = express.Router();

// Getting sequelize for database
const db = require("../models");

// Routes
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------

// Get music data from spotify api
router.get("/music", function(req, res) {

  db.Burger.create({
    name: req.body.name,
    eaten: false
  })
    .then(function(dbBurger) {

      res.json(dbBurger);

    }).catch(function(error) {

      console.error(error);
    });

});

router.put("/burgers/:id", function(req, res) {
  db.Burger.update(
    {
      eaten: true
    },
    {
      where: {
        id: req.params.id
      }
    }
  ).then(function() {

    res.sendStatus(200);
  }).catch(function(error) {

    console.error(error);

  });
});

router.delete("/burgers/:id", function(req, res) {
  db.Burger.destroy(
    {
      where: {
        id: req.params.id
      }
    }
  ).then(function() {

    res.sendStatus(200);
  }).catch(function(error) {

    console.error(error);

  });
});


// Export module

module.exports = router;