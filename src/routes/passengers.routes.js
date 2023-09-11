import { Router } from "express"
import { passengersController } from "../controllers/passengers.controllers.js"
import { schemaValidation } from "../middlewares/schemaValidation.js"
import { passengersSchema, citiesSchema, travelsSchema, flightsSchema } from "../schemas/agency.schemas.js"

const passengersRouter = Router()

passengersRouter.post("/passengers", schemaValidation(passengersSchema), passengersController.createPassenger)
passengersRouter.post("/travels", schemaValidation(travelsSchema), passengersController.createTravel)
passengersRouter.get("/passengers/travels", passengersController.findTravel)

export default passengersRouter