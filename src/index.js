const express = require("express");

const app = express();

app.get("/courses", (req, res) => {
  return res.json(["Curson 1", "Curson 2", "Curson 3"]);
});

app.post("/courses", (req, res) => {
  return res.json(["Curson 1", "Curson 2", "Curson 3"]);
});

app.put("/courses/:id", (req, res) => {
  return res.json(["Curson 1", "Curson 2", "Curson 3"]);
});

app.patch("/courses/:id", (req, res) => {
  return res.json(["Curson 1", "Curson 2", "Curson 3"]);
});

app.delete("/courses/:id", (req, res) => {
  return res.json(["Curson 1", "Curson 2", "Curson 3"]);
});

app.listen(3333);
