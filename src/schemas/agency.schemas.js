import joiBase from "joi"
import joiDate from "@joi/date"
const joi = joiBase.extend(joiDate)

// Validação de Passageiros

export const passengersSchema = joi.object({
    firstName: joi.string().min(2).max(100).required().messages({
        'string.base': `"Nome" deve ser um texto.`,
        'string.empty': `"Nome" não deve ser vazio.`,
        'string.min': `"Nome" deve ter pelo menos {#limit} caracteres.`,
        'string.max': `"Nome" deve ter no máximo {#limit} caracteres.`,
        'any.required': `O campo "Nome" é obrigatório.`
    }),
    lastName: joi.string().min(2).max(100).required().messages({
        'string.base': `"Sobrenome" deve ser um texto.`,
        'string.empty': `"Sobrenome" não deve ser vazio.`,
        'string.min': `"Sobrenome" deve ter pelo menos {#limit} caracteres.`,
        'string.max': `"Sobrenome" deve ter no máximo {#limit} caracteres.`,
        'any.required': `O campo "Sobrenome" é obrigatório.`
    })
})

// Validação de Cidades

export const citiesSchema = joi.object({
    name: joi.string().min(2).max(50).required().messages({
        'string.base': `"Nome" deve ser um texto.`,
        'string.empty': `"Nome" não deve ser vazio.`,
        'string.min': `"Nome" deve ter pelo menos {#limit} caracteres.`,
        'string.max': `"Nome" deve ter no máximo {#limit} caracteres.`,
        'any.required': `O campo "Nome" é obrigatório.`
    })
})

// Validação de Travels

export const travelsSchema = joi.object({
    passengerId: joi.number().integer().positive().required().messages({
        'number.base': `"PassengerId" deve ser um número.`,
        'number.integer': `"PassengerId" deve ser um número inteiro.`,  
        'number.positive': `"PassengerId" deve ser um número positivo.`,
        'any.required': `O campo "PassengerId" é obrigatório.`
    }),
    flightId: joi.number().integer().positive().required().messages({
        'number.base': `"FlightId" deve ser um número.`,
        'number.integer': `"FlightId" deve ser um número inteiro.`,
        'number.positive': `"FlightId" deve ser um número positivo.`,
        'any.required': `O campo "FlightId" é obrigatório.`
    })
})

// Validação de Voos

export const flightsSchema = joi.object({
    origin: joi.number().integer().positive().required().messages({
        'number.base': `"Origin" deve ser um número.`,
        'number.integer': `"Origin" deve ser um número inteiro.`,
        'number.positive': `"Origin" deve ser um número positivo.`,
        'any.required': `O campo "Origin" é obrigatório.`
    }),
    destination: joi.number().integer().positive().required().messages({
        'number.base': `"Origin" deve ser um número.`,
        'number.integer': `"Origin" deve ser um número inteiro.`,
        'number.positive': `"Origin" deve ser um número positivo.`,
        'any.required': `O campo "Origin" é obrigatório.`
    }),
    date: joi.date().format("DD-MM-YYYY").greater('now').required().messages({
        'date.base': `"Data" é um campo do tipo data.`,
        'date.format': `O formato da data de Data deve ser: DD-MM-YYYY.`,
        'date.greater': `A data de Data deve ser maior que a data atual.`,
        'any.required': `O campo "Data" é obrigatório.`
    })
})