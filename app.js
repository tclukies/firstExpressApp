const express = require("express");
const request = require("request");
const app = express();
const port = process.env.PORT || 3000;
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("search");
});

app.get("/results", function(req, res) {
  var query = req.query.search;
  request("http://www.omdbapi.com/?s=" + query + "&apikey=thewdb", function(
    error,
    response,
    body
  ) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      res.render("results", { data: data });
      console.log("error:", error); // Print the error if one occurred
      console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
      console.log("body:", body); // Print the HTML for the Google homepage.
    }
  });
});

app.listen(port, () => {
  console.log("listening on port", port);
});
