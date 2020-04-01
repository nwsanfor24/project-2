// Dependencies
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------

const express = require('express');
const router = express.Router();

// Getting sequelize for database
const db = require("../models");

// Routes
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------

router.get("/", function(req, res) {

  db.Burger.findAll({
    attributes: ["id", "name", "eaten"],
    raw: true,
    order: [['updatedAt', 'DESC']]
  })
  .then(function(dbBurger) {

    const hamburgers = {
      hamburger: dbBurger
    }

    res.render("index", hamburgers);

  });

});

module.exports = router;
