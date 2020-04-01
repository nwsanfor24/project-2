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

// Create new burger
router.post("/burgers", function(req, res) {

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
    ).then(function(dbBurger) {

        res.sendStatus(200);
    
    }).catch(function(error) {

        console.error(error);

    });
});


// Export module

module.exports = router;