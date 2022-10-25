const express = require("express")
const router = express.Router()
const {
    getUser,
    updateUser,
    getAllUsers,
    deleteUser
} = require("../controllers/users")

router.route("/").get(getAllUsers)
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser)

module.exports = router