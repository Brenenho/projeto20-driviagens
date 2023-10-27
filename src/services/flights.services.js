import { errors } from "../errors/errors.js"
import { flightsRepository } from "../repositories/flights.repositories.js"
import dayjs from "dayjs"
import customParseFormat from 'dayjs/plugin/customParseFormat.js';


async function createFlight(origin, destination, date) {

    const cityOrigin = await flightsRepository.findCitiesByID(origin)
    console.log(origin, destination, date)
    const cityDestination = await flightsRepository.findCitiesByID(destination)

    if (!cityOrigin) throw errors.notFound("Cidade de origem")
    if (!cityDestination) throw errors.notFound("Cidade de destino")
    if (origin === destination) throw errors.conflict()


    const flight = await flightsRepository.createFlight(origin, destination, date)

    return flight

}

async function createCities(name) {

    const cityExists = await flightsRepository.findCities(name)

    if (cityExists) throw errors.exists(name)

    const cities = await flightsRepository.createCities(name)

    return cities

}

async function findFlights(origin, destination, biggerdate, smallerdate) {

    dayjs.extend(customParseFormat);

    const formattedbigger = dayjs(biggerdate, 'DD-MM-YYYY').format('MM-DD-YYYY');
    const formattedsmaller = dayjs(smallerdate, 'DD-MM-YYYY').format('MM-DD-YYYY');

    if (biggerdate && !smallerdate || !biggerdate && smallerdate) throw errors.joi("É necessário informar as duas datas para a busca!") 

    if (biggerdate && smallerdate) {
        const after = dayjs(smallerdate).isAfter(biggerdate)
        console.log(smallerdate, biggerdate, after)
        if (dayjs(smallerdate).isAfter(biggerdate)) throw errors.date()
    }

    const result = await flightsRepository.findFlights(origin, destination, biggerdate, smallerdate)

    if (biggerdate && smallerdate) {
        if (dayjs(formattedsmaller).isAfter(formattedbigger)) throw errors.date()
    }

    return result

    
    }

export const flightsService = { createFlight, createCities, findFlights }