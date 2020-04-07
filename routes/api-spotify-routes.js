// Dependencies
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------

const express = require("express");
const router = express.Router();
const axios = require("axios");


// Routes
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------

// Pull relaxation music from Spotify

router.get("/", function(req, res) {

  axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    headers: {"Authorization: Basic ":process.env.SPOTIFY_ENCODED},
    body: {
      grant_type: "client_credentials",
    },
  }).then(function(response) {
    return axios({
      method: "get",
      url: "https://accounts.spotify.com/api/v1/search/q=relaxation&type=track",
      headers: {"Authorization: Bearer ":response.data.access_token},
    }).then(function(response) {
      const relaxationMusic = {
        song: response.data
      };

      res.render("music", relaxationMusic);

    }).catch(function(error) {
      console.log(error);
    });

  });
});

// Pull meditation content from Spotify

router.get("/", function(req, res) {

  axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    headers: {"Authorization: Basic ":process.env.SPOTIFY_ENCODED},
    body: {
      grant_type: "client_credentials",
    },
  }).then(function(response) {
    return axios({
      method: "get",
      url: "https://accounts.spotify.com/api/v1/search/q=relaxation&type=track",
      headers: {"Authorization: Bearer ":response.data.access_token},
    }).then(function(response) {
      const meditationMusic = {
        meditate: response.data
      };

      res.render("music", meditationMusic);

    }).catch(function(error) {
      console.log(error);
    });

  });
});

// Export module

module.exports = router;