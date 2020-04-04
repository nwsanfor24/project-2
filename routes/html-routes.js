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

router.get("/", function(req, res) {
  res.render("index", { title: "Give Me A Break!" });
});

module.exports = router;
