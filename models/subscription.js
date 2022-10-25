const mongoose = require("mongoose")

const subscriptionSchema = new mongoose.Schema({
    email: {
        type:String,
        required: [true, "Please provide your email"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
        unique: true,
    }
})

module.exports = mongoose.model("Subscriptions", subscriptionSchema)

