const express = require('express')
const app = express()

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

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`);