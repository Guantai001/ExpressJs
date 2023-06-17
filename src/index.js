const express = require('express')
const app = express()
const port = 3000

app.use(express.json())//used to parse JSON bodies
app.use(express.urlencoded({ extended: true }))//Parse URL-encoded bodies
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// app.get('/', (req, res) => res.send('Hello World guantai !'))
const groceryList = [
    {
        item : 'milk',
        price : 2.33
    },
    {
        item : 'eggs',
        price : 3.33
    },
    {
        item : 'bread',
        price : 4.33
    }
]

// get all groceries
app.get('/groceries', (req, res) => res.send(groceryList))

// get a specific grocery by id
app.get('/groceries/:id', (req, res) => {
    const id = req.params.id
    res.send(groceryList[id])
}
)

// add a new grocery
app.post('/groceries', (req, res) => {
    const newGrocery = req.body
    groceryList.push(newGrocery)
    res.send(groceryList)
}
)
