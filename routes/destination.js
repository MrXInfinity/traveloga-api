const express = require("express")
const router = express.Router()
const {
    getAllDestinations,
    getDestination,
    createDestination,
    updateDestination,
    deleteDestination
} = require("../controllers/destination")

router.route("/").get(getAllDestinations)
router.route("/:id").get(getDestination).post(createDestination).patch(updateDestination).delete(deleteDestination)

module.exports = router