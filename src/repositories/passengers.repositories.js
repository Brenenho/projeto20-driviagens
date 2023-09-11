import { db } from "../configs/db.connection.js"

async function createPassenger(firstName, lastName) {

    await db.query(`INSERT INTO passengers ("firstName", "lastName") VALUES ($1, $2)`, [firstName, lastName])
    
}

async function createTravel(passengerId, flightId) {

    await db.query(`INSERT INTO travels ("passengerId", "flightId") VALUES ($1, $2)`, [passengerId, flightId])
    
}

async function findTravel(name) {

    if (!name) {

        const result = await db.query(`
        SELECT CONCAT(passengers."firstName", ' ', passengers."lastName") AS "passenger", COUNT(travels.id) AS "travels"
        FROM passengers
        LEFT JOIN travels ON travels."passengerId" = passengers.id
        LEFT JOIN flights ON flights.id = travels."flightId"
        GROUP BY passengers.id, travels.id
        ORDER BY COUNT(travels.id) DESC
        `);

        return result.rows

    } else {

    const result = await db.query(`
    SELECT CONCAT(passengers."firstName", ' ', passengers."lastName") AS "passenger", COUNT(travels.id) AS "travels"
    FROM passengers
    LEFT JOIN travels ON travels."passengerId" = passengers.id
    LEFT JOIN flights ON flights.id = travels."flightId"
    WHERE CONCAT(passengers."firstName", ' ', passengers."lastName") ILIKE $1
    GROUP BY passengers.id, travels.id
    ORDER BY COUNT(travels.id) DESC
    `, [`%${name}%`]);


    return result.rows

    }

}

async function findPassengerById(id) {

    const result = await db.query(`SELECT * FROM passengers WHERE id = $1`, [id])

    return result.rows[0]

}

async function findFlightById(id) {

    const result = await db.query(`SELECT * FROM flights WHERE id = $1`, [id])

    return result.rows[0]

}

export const passengersRepository = { createPassenger, createTravel, findTravel, findPassengerById, findFlightById }