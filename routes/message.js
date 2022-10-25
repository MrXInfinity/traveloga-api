const express = require("express")
const router = express.Router()
const {
    getAllMessages,
    getMessage,
    createMessage,
    updateMessage,
    deleteMessage
} = require("../controllers/message")

router.route("/").get(getAllMessages).post(createMessage)
router.route("/:id").get(getMessage).patch(updateMessage).delete(deleteMessage)

module.exports = router