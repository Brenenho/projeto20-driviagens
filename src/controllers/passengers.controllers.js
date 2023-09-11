import dayjs from "dayjs"
import { passengersService } from "../services/passengers.services.js"
import httpStatus from "http-status"

async function createPassenger(req, res) {

    const { firstName, lastName } = req.body

    await passengersService.createPassenger(firstName, lastName)
    res.sendStatus(httpStatus.CREATED)
    
}

async function createTravel(req, res) {

    const { passengerId, flightId } = req.body

    await passengersService.createTravel(passengerId, flightId)
    res.sendStatus(httpStatus.CREATED)
    
}

async function findTravel(req, res) {

    const { name } = req.query

    const travels = await passengersService.findTravel(name)
    res.send(travels)

}

export const passengersController = { createPassenger, createTravel, findTravel }