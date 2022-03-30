// Requiring Modules
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const request = require("request");

// Setup Express
const app = express();

// Define paths for express configuration
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup Handlebars for engine and view location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory
app.use(express.static(publicDirectory));

app.get("/", (req, res) => {
  res.render("index", { title: "Weather", name: "Mahdi" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About", name: "Mahdi" });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "This is the help message",
    name: "Mahdi",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please enter address",
    });
  }

  const url =
    "https://api.weatherapi.com/v1/current.json?q=" +
    req.query.address +
    "&key=14bb02887cac4099a2575000220202";

  return request({ url: url, json: true }, (error, response) => {
    const current = response.body.current;
    if (response.body.error) {
      error = response.body.error;
      return res.send({ error });
    } else {
      return res.send({
        forecast: current.condition.text,
        location: response.body.location.name,
        address: req.query.address,
      });
    }
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Not Found",
    message: "Page Not Found",
    name: "Mahdi",
  });
});

app.listen(3000, (req, res) => {
  console.log("listening on 3000...");
});
