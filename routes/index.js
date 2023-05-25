var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index", { title: "Express" });
});

router.get("/api", (req, res) => {
  res.json({ users: ["u1", "u2", "u3"] });
});

module.exports = router;
