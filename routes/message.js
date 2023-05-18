const express = require("express");
const router = express.Router();
const { createMessage } = require("../controllers/message");

router.route("/").post(createMessage);
// router.route("/:id").get(getMessage).patch(updateMessage).delete(deleteMessage)

module.exports = router;
