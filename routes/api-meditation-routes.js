// Dependencies
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------

const express = require("express");
const router = express.Router();
const axios = require("axios");
const querystring = require("querystring");


// Routes
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------



//Pull meditation music from Spotify

router.get("/", function(req, res) {

  axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    headers: {"Authorization": `Basic ${process.env.SPOTIFY_ENCODED}`},
    data: querystring.stringify({
      grant_type: "client_credentials",
    }),
  }).then(function(response) {
    return axios({
      method: "get",
      url: "https://api.spotify.com/v1/search?q=meditation&type=track&limit=12",
      headers: {"Authorization": `Bearer ${response.data.access_token}`},
    }).then(function(response) {
      console.log(response);
      const meditationMusic = {
        meditate: response.data.tracks.items
      };

      res.render("meditation", meditationMusic);

    }).catch(function(error) {
      console.log(error);
    });

  });
});

// Export module

module.exports = router;