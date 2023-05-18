const express = require("express");
const router = express.Router();
const { createSubscriber } = require("../controllers/subscription");

router.route("/").post(createSubscriber);
// router.route("/:id").get(getSubscriber)

module.exports = router;
