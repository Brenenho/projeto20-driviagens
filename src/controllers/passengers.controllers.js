import dayjs from "dayjs"
import { passengersService } from "../services/passengers.services.js"
import httpStatus from "http-status"

async function createPassenger(req, res) {

    const { firstName, lastName } = req.body

    const id =  await passengersService.createPassenger(firstName, lastName)

    res.status(httpStatus.CREATED).send({ id, firstName, lastName })
    
}

async function createTravel(req, res) {

    const { passengerId, flightId } = req.body

   const travel = await passengersService.createTravel(passengerId, flightId)
   console.log(travel)
    res.status(httpStatus.CREATED).send(travel)
    
}

async function findTravel(req, res) {

    const { name } = req.query

    const travels = await passengersService.findTravel(name)
    res.send(travels)

}

export const passengersController = { createPassenger, createTravel, findTravel }