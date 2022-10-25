const mongoose = require("mongoose")

const destinationSchema = new mongoose.Schema({
    title: {type: String, required: [true, "Please provide the destination title"]},
    category: {type: String, required: [true, "Please provide the category"]},
    location: {type: String, required: [true, "Please provide the location"]},
    image: {type: String, required: [true, "Please provide the image"]},
    description: {type: String, required: [true, "Please provide the description"], minlength: 10, maxlength: 500},
    showCase: {type: Array},
    limitedOffers: {
        domestic: {type: Number, default: 0},
        international: {type: Number, default: 0}
    },
    domestic: {
        availableRegions: {type: Array, default: ["Luzon", "Visayas", "Mindanao"]},
        travelIn: {type: Number, default: 2500},
        travelOut: {type: Number, default: 2500},
        hotelFee: {type: Number, default: 5500}
    },
    international: {
        america: {
            travelIn: {type: Number, default: 62000},
            travelOut: {type: Number, default: 62000},
            hotelFee: {type: Number, default: 5500}
        },
        europe: {
            travelIn: {type: Number, default: 46000},
            travelOut: {type: Number, default: 46000},
            hotelFee: {type: Number, default: 5500}
        },
        asia: {
            travelIn: {type: Number, default: 21000},
            travelOut: {type: Number, default: 21000},
            hotelFee: {type: Number, default: 5500}
        },
        southeastAsia: {
            travelIn: {type: Number, default: 12000},
            travelOut: {type: Number, default: 12000},
            hotelFee: {type: Number, default: 5500}
        },
        oceania: {
            travelIn: {type: Number, default: 24000},
            travelOut: {type: Number, default: 24000},
            hotelFee: {type: Number, default: 5500}
        }
    }
})

module.exports = mongoose.model("Destinations", destinationSchema)