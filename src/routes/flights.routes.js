import { Router } from "express"
import { flightsController } from "../controllers/flights.controllers.js"
import { schemaValidation } from "../middlewares/schemaValidation.js"
import { passengersSchema, citiesSchema, travelsSchema, flightsSchema } from "../schemas/agency.schemas.js"

const flightsRouter = Router()

flightsRouter.post("/flights", schemaValidation(flightsSchema), flightsController.createFlight)
flightsRouter.post("/cities", schemaValidation(citiesSchema), flightsController.createCities)
flightsRouter.get("/flights", flightsController.findFlights)

export default flightsRouter