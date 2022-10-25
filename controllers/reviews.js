const getAllReviews = async (req, res) => {
    console.log("All reviews gotten")

}

const createReview = async (req, res) => {
    console.log("Review created!")
}

//Admin Options

const getReview = async (req, res) => {
    console.log("Review Gotten")
}

const deleteReview = async (req, res) => {
    console.log("Review deleted!")
}

const updateReview = async (req, res) => {
    console.log("Review updated")
}

module.exports = {
    getAllReviews, 
    createReview,
    getReview,
    deleteReview,
    updateReview
}