require("dotenv").config()
require("express-async-errors")

//Additional security
const helmet = require("helmet")
const cors = require("cors")
const xss = require("xss-clean")
const rateLimiter = require("rate-limiter")

//Basic setup
const express = require("express")
const app = express()
const path = require('path')

//Connect DB
const connectDB = require("./db/connect")

//Router
const bookingsRouter = require('./routes/bookings')
const destinationRouter = require("./routes/destination")
const usersRouter = require("./routes/users")
const authRouter = require("./routes/auth")
const reviewRouter = require("./routes/reviews")
const subscriptionRouter = require("./routes/subscription")
const messageRouter = require("./routes/message")

//MiddleWare
const authenticateUser = require('./middleware/authentication');
//error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

//app.set('trust proxy', 1);
//app.use(
//  rateLimiter({
//    windowMs: 15 * 60 * 1000, // 15 minutes
//    max: 100, // limit each IP to 100 requests per windowMs
//  })
//);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.use('/', express.static(path.join(__dirname, 'public'))) 

//Routes
app.use("/api/v1/bookings", authenticateUser, bookingsRouter)
app.use("/api/v1/destinations", destinationRouter)
app.use("/api/v1/users", authenticateUser, usersRouter)
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/reviews", reviewRouter)
app.use("/api/v1/subscription", subscriptionRouter)
app.use("/api/v1/message", messageRouter)

//Middleware error handler
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
    );
    } catch (err) {
        console.log(err)
    }
}

start()
