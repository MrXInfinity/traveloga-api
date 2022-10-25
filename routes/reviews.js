const express = require("express")
const router = express.Router()
const {
    getAllReviews, 
    createReview,
    getReview,
    deleteReview,
    updateReview
} = require("../controllers/reviews")

router.route("/").get(getAllReviews)
router.route("/:id").get(getReview).post(createReview).patch(updateReview).delete(deleteReview)

module.exports = router