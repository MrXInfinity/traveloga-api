require("dotenv").config()

const connectdb = require("./db/connect")
const destinationModel = require("./models/destinations")

const data = require("./data/data.json")

const start = async () => {
    try {
        await connectdb(process.env.MONGO_URI)
        await destinationModel.deleteMany()
        await destinationModel.create(data)
        console.log('Success!!!!')
        process.exit(0)
    } catch (error) {
    console.log(error)
    process.exit(1)
    }
}

start()