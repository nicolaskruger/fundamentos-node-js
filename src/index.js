const express = require("express");

const app = express();

app.get("/", (req, res) => {
  return res.json({
    msg: "fundamentos node js! ",
  });
});

app.listen(3333);
