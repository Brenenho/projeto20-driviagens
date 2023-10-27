import dayjs from "dayjs"
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import { flightsService } from "../services/flights.services.js"
import { errors } from "../errors/errors.js"
import httpStatus from "http-status"

async function createFlight(req, res) {

    const { origin, destination, date } = req.body
    console.log(origin, destination, date)
    const flight = await flightsService.createFlight(origin, destination, date)

    res.status(httpStatus.CREATED).send({id: flight.id, origin, destination, date})
    

}

async function createCities(req, res) {

    const { name } = req.body

   const cities = await flightsService.createCities(name)


    res.status(httpStatus.CREATED).send(cities)

}

async function findFlights(req, res) {

    dayjs.extend(customParseFormat);

    const { origin} = req.query
    const { destination } = req.query
    const { 'bigger-date': biggerdate } = req.query;
    const { 'smaller-date': smallerdate } = req.query;


    console.log(origin, destination, biggerdate, smallerdate)

    const flights = await flightsService.findFlights(origin, destination, biggerdate, smallerdate)
    const formattedFlights = flights.map((flight) => {
        return {
            ...flight, date: dayjs(flight.date).format("DD-MM-YYYY")
        }
    })

    res.send(formattedFlights)
    
    
    }

export const flightsController = { createFlight, createCities, findFlights }