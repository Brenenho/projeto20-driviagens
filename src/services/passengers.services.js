import { errors } from "../errors/errors.js"
import { passengersRepository } from "../repositories/passengers.repositories.js"

async function createPassenger(firstName, lastName) {

    await passengersRepository.createPassenger(firstName, lastName)
       
}

async function createTravel(passengerId, flightId) {

        const passenger = await passengersRepository.findPassengerById(passengerId)
        const flight = await passengersRepository.findFlightById(flightId)

        if (!passenger) throw errors.notFound("Passageiro")
        if (!flight) throw errors.notFound("Voo")
    

    await passengersRepository.createTravel(passengerId, flightId)
    
}

async function findTravel(name) {

    const travels = await passengersRepository.findTravel(name)

    if (travels.rowCount === 0) throw errors.notFound("Passageiro")

    if (travels.rowCount > 10) throw errors.many()
    return travels

}

export const passengersService = { createPassenger, createTravel, findTravel }