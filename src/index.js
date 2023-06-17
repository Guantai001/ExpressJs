const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.use((req, res, next) => {
  console.log(`${req.method}:${req.url}`);
  next();
});

const groceryList = [
  {
    item: 'milk',
    price: 2.33
  },
  {
    item: 'eggs',
    price: 3.33
  },
  {
    item: 'bread',
    price: 4.33
  }
];

// Get all groceries
app.get('/groceries', (req, res) => res.send(groceryList));

// Get a specific grocery by id
app.get('/groceries/:id', (req, res) => {
  const id = req.params.id;
  if (id >= 0 && id < groceryList.length) {
    res.send(groceryList[id]);
  } else {
    res.status(404).send('Grocery not found');
  }
});

// Get a specific grocery by item name
app.get('/groceries/:item', (req, res) => {
    const { item } = req.params;
    const grocery = groceryList.find(grocery => grocery.item === item);
    if (grocery) {
        res.send(grocery);
    } else {
        res.status(404).send('Grocery not found');
    }
});

// Add a new grocery
app.post('/groceries', (req, res) => {
  const newGrocery = req.body;
  groceryList.push(newGrocery);
  res.send(groceryList);
});

// Update a grocery
app.put('/groceries/:id', (req, res) => {
    const id = req.params.id;
    const updatedGrocery = req.body;
    if (id >= 0 && id < groceryList.length) {
        groceryList[id] = updatedGrocery;
        res.send(groceryList);
    } else {
        res.status(404).send('Grocery not found');
    }
});

// Delete a grocery
app.delete('/groceries/:id', (req, res) => {
    const id = req.params.id;
    if (id >= 0 && id < groceryList.length) {
        groceryList.splice(id, 1);
        res.send(groceryList);
    } else {
        res.status(404).send('Grocery not found');
    }
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`));
