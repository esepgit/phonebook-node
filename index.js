require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.json())

morgan.token('data', (request, response) => {
    if(request.method === "POST") {
        return JSON.stringify(request.body)
    }
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
app.use(cors())
app.use(express.static('dist'))

let persons = [
    {
        id: 1,
        name: "Arto Hellas", 
        number: "040-12314"
    },
    {
        id: 2,
        name: "Juan Perez",
        number: "234232342"
    },
    {
        id: 3,
        name: "Piripao Rodriguez",
        number: "234234234"
    },
    {
        id: 4,
        name: "Mary Poppins",
        number: "2342342-3443"
    }  
]

app.get('/info', (request, response) => {
    response.write(`<p>Phonebook has info for ${persons.length} people</p>`)
    response.write(`<p>${Date()}</p>`)
    response.end()
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(element => element.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if(!body.name || !body.number ) {
       return response.status(400).json({error: 'name or number missing'}) 
    } 

    // const name = persons.find(element => element.name === body.name)

    // if(name) {
    //     return response.status(400).json({
    //         error: 'name must be unique'
    //     })
    // }
    const person = new Person({
            name: body.name,
            number: body.number
        })
    
    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`); 