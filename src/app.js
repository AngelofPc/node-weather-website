const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
// for heroku
const port = process.env.PORT || 3000;

//Define path for Express config
const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static public directory
app.use(express.static(publicDir));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Angelofpc",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Weather App",
    name: "Angelofpc",
  });
});

// app.get('/about', (req, res) => {
//     res.send('<h1>ABOUT: AWA TI WA ONLINE</h1>')
// })

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geocode(req.query.address, (error, { lat, log, location } = {}) => {
    if (error) {
      return res.send({ error: error, address: req.query.address }); //short hand will be error only since the names are the same
    }

    forecast(lat, log, (error, forcastData) => {
      if (error) {
        return res.send({
          error,
          data: log,
          da: lat,
          address: req.query.address,
        });
      }

      res.send({
        forcast: forcastData,
        location,
        address: req.query.address,
      });
    });
  });
});

//Custom 404 for urls related to about
app.get("/about/*", (req, res) => {
  res.render("404", {
    title: "Weather App",
    name: "Angelofpc",
    errorMessage: "Page not found in about",
  });
});

// generic 404
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Angelofpc",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
