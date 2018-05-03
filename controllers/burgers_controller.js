var express = require("express");
var burger = require("../models/burger.js");

var router = express.Router();

router.get("/", function(req, res) {
  res.redirect("/burgers");
});

router.get("/burgers", function(req, res) {
  burger.selectAll(function(data) {
    var allBurgers = {
      burgers: data,
    };
    console.log(allBurgers);
    res.render("index", allBurgers);
  });
});

router.post("/api/burgers", function(req, res) {
  burger.insertOne(
    ["burger_name", "short_description", "devoured"],
    [req.body.burger_name, req.body.short_description, req.body.devoured],
    function(result) {
      res.json({ id: result.insertId });
    }
  );
});

router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  burger.updateOne(
    {
      devoured: req.body.devoured,
    },
    condition,
    function(result) {
      res.status(200).end();
    }
  );
});

module.exports = router;
