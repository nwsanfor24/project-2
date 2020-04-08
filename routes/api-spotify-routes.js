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



//Pull relaxation music from Spotify

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
      url: "https://api.spotify.com/v1/search?q=relaxation&type=track&limit=3",
      headers: {"Authorization": `Bearer ${response.data.access_token}`},
    }).then(function(response) {
      console.log(response);
      const relaxationMusic = {
        song: response.data.tracks.items
      };

      res.render("music", relaxationMusic);

    }).catch(function(error) {
      console.log(error);
    });

  });
});



// Pull the list of quotes

// router.get("/", function(req, res) {

//   axios({
//     method: "get",
//     url: "https://favqs.com/api/quotes",
//     headers: "Authorization: Token token=395f07cfac08d1f79095278f4d7abb25",

//   }).then(function(response) {

//     const inspiredQuotes =
//     {
//       quote: response.data.quotes
//     };

//     res.render("music", inspiredQuotes);

//   }).catch(function(error) {
//     console.log(error);
//   });

// });

// router.get("/", function(req, res) {

//   axios({
//     method: "get",
//     url: "https://icanhazdadjoke.com/search",
//     //headers: "Accept: application/json",

//   }).then(function(response) {
//     console.log(response);
//     const jokes =
//     {
//       resJoke: response.data.results
//     };

//     res.render("music", jokes);

//   }).catch(function(error) {
//     console.log(error);
//   });

// });

// Export module

module.exports = router;