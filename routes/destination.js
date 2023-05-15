const express = require("express");
const router = express.Router();
const {
  getAllDestinations,
  getDestination,
} = require("../controllers/destination");

router.route("/").get(getAllDestinations);
router.route("/:id").get(getDestination);

module.exports = router;
