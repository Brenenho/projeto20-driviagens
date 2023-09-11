import express from "express"
import "express-async-errors"
import passengersRouter from "./routes/passengers.routes.js"
import flightsRouter from "./routes/flights.routes.js"
import { errorHandler } from "./middlewares/errorHandler.js"
import dotenv from "dotenv"
dotenv.config()

const app = express()
app.use(express.json())
app.use(passengersRouter)
app.use(flightsRouter)
app.use(errorHandler)

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Server running on port ${port}`))