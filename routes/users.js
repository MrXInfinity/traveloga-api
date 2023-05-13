const express = require("express");
const router = express.Router();
const { getUser, updateUser } = require("../controllers/users");

router.route("/").get(getUser);
router.route("/:id").patch(updateUser);

module.exports = router;
