// Dependencies
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------

const express = require("express");
const router = express.Router();
const axios = require("axios");


// Routes
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------

// Pull images from Pexels

router.get("/", function(req, res) {

  axios({
    method: "get",
    url: "https://api.pexels.com/v1/curated?per_page=15&page=1",
    headers: {"Authorization":process.env.PEXELS_API}
  }).then(function(response) {
    console.log(response.data);
  }).catch(function(error) {
    console.log(error);
  });

});

// Export module

module.exports = router;