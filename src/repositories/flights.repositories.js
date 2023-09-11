import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';


import { db } from "../configs/db.connection.js"


async function createFlight(origin, destination, date) {

    dayjs.extend(customParseFormat);

    const formattedDate = dayjs(date, 'DD-MM-YYYY').format('YYYY-MM-DD');

    console.log(formattedDate)

    await db.query(`INSERT INTO flights (origin, destination, date) VALUES ($1, $2, $3)`, [origin, destination, formattedDate])
    
}

async function createCities(name) {

    await db.query(`INSERT INTO cities (name) VALUES ($1)`, [name])
    
}


async function findFlights(origin, destination, biggerdate, smallerdate) {

    dayjs.extend(customParseFormat);

    if (biggerdate && smallerdate) {
    const formattedbigger = dayjs(biggerdate, 'DD-MM-YYYY').format('YYYY-MM-DD');
    const formattedsmaller = dayjs(smallerdate, 'DD-MM-YYYY').format('YYYY-MM-DD');

    const result = await db.query(`
    SELECT flights.id, origin.name AS origin, destination.name AS destination, date
    FROM flights
    JOIN cities AS origin ON origin.id = flights.origin
    JOIN cities AS destination ON destination.id = flights.destination
    WHERE 
    (date BETWEEN $2 AND $1 OR $1 IS NULL OR $2 IS NULL)
    AND (origin.name = $3 OR $3 IS NULL)
    AND (destination.name = $4 OR $4 IS NULL)
`, [formattedbigger, formattedsmaller, origin, destination])

    return result.rows


    } else {



    const result = await db.query(`
    SELECT flights.id, origin.name AS origin, destination.name AS destination, date
    FROM flights
    JOIN cities AS origin ON origin.id = flights.origin
    JOIN cities AS destination ON destination.id = flights.destination
`)

    return result.rows }

    
    }

async function findCities(name) {

    const result = await db.query(`SELECT * FROM cities WHERE name = $1`, [name])

    return result.rows[0]

}

async function findCitiesByID(id) {

    const result = await db.query(`SELECT * FROM cities WHERE id = $1`, [id])

    return result.rows[0]

}
   

export const flightsRepository = { createFlight, createCities, findFlights, findCities, findCitiesByID }