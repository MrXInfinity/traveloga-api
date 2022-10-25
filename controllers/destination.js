const Destination = require("../models/destinations")
const {StatusCodes} = require("http-status-codes")
const {BadRequestError, NotFoundError} = require("../errors")

const getAllDestinations = async (req, res) => {

    //req.query for selections (homepage and promotions) and categories (landmark, history, beaches)
    const {showCase, limitedOffers, category} = req.query

    if (showCase) {
        const destinations = await Destination.find({showCase}, 'title location image _id')
        if (!destinations) throw new NotFoundError("There is no destination with this showcase")
        res.status(StatusCodes.OK).json({destinations})
    }
    if (limitedOffers) {
        const destinations = await Destination.find({
            "limitedOffers.domestic": {$gt: 0},
            "limitedOffers.international": {$gt: 0}
        }, "image title location description limitedOffers _id")
        if (!destinations) throw new NotFoundError("There is no destination with this limited offer")
        res.status(StatusCodes.OK).json(destinations)
    }
    if (category) {
        const destinations = await Destination.find({category}, "title location image _id")
        if (!destinations) throw new NotFoundError("There is no destination with this category")
        res.status(StatusCodes.OK).json(destinations) 
    }
    res.status(StatusCodes.NOT_FOUND).json({msg: "No Destination found"})
}

const getDestination = async (req, res) => {
    const {id} = req.params
    const destination = await Destination.findOne({_id: id})
    res.status(StatusCodes.OK).json({destination})
}

//ADMIN OPTIONS
const createDestination = async (req, res) => {
    res.send("Item created")
}

const updateDestination = async (req, res) => {
    res.send("Item updated")
}

const deleteDestination = async (req, res) => {
    res.send("Item deleted")
}

module.exports = {
    getAllDestinations,
    getDestination,
    createDestination,
    updateDestination,
    deleteDestination
}