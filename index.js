const express = require('express')
const app = express()

app.use(express.json())

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

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
    response.write(`<p>Phonebook has info for ${persons.length} people</p>`)
    response.write(`<p>${Date()}</p>`)
    response.end()
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(element => element.id === id)
    
    if(person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(element => element.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if(!body.name || !body.number ) {
       return response.status(400).json({
        error: 'name or number missing'
       }) 
    } 

    const name = persons.find(element => element.name === body.name)

    if(name) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }
    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }
    
    persons = persons.concat(person)
    response.json(person)
})

const generateId = () => {
    return Math.floor(Math.random() * 1000)
}

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`);