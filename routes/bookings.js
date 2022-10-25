const express = require("express")
const router = express.Router()
const {
    getAllBookings,
    getBooking,
    addInTheCart,
    updateInfo,
    deleteItem
} = require("../controllers/bookings")

router.route("/").get(getAllBookings)
router.route("/:id").get(getBooking).post(addInTheCart).patch(updateInfo).delete(deleteItem)

module.exports = router