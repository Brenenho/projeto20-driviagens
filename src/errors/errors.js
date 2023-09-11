function joi(message) {
    return {
        type: "joiError",
        message
    }
}

function notFound(resource) {
    return {
        type: "notFound",
        message: `${resource} não foi encontrado!`
    }
}

function many() {
    return {
        type: "many",
        message: `Too many results`
    }
}

function conflict() {
    return {
        type: "conflict",
        message: `A cidade de origem e destino não podem ser iguais!`
    }
}

function exists (resource) {
    return {
        type: "exists",
        message: `${resource} já existe!`
    }
}

function date (resource = "Data de ida") {
    return {
        type: "date",
        message: `${resource} não pode ser menor que a data de volta!`
    }
}

export const errors = { joi, notFound, many, conflict, exists, date }