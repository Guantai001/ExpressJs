const { Router} = require('express');
const router = Router();



const groceryList = [{
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

router.use((req, res, next) => {
    console.log('Inside Groceries Auth Check Middleware');
    console.log(req.user);
    if (req.user) next();
    else res.send(401);
  });
  

// Get all groceries
router.get('/', (req, res) => {
    res.cookie('grocery', 'cookie');
    res.send(groceryList);
});
// Get a specific grocery by id
router.get('/:id', (req, res) => {
    const id = req.params.id;
    if (id >= 0 && id < groceryList.length) {
        res.send(groceryList[id]);
    } else {
        res.status(404).send('Grocery not found');
    }
});

// Get a specific grocery by item name
router.get('/:item', (req, res) => {
    const {
        item
    } = req.params;
    const grocery = groceryList.find(grocery => grocery.item === item);
    if (grocery) {
        res.send(grocery);
    } else {
        res.status(404).send('Grocery not found');
    }
});

// Add a new grocery
router.post('/', (req, res) => {
    const newGrocery = req.body;
    groceryList.push(newGrocery);
    res.send(groceryList);
});

// Update a grocery
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    if (id >= 0 && id < groceryList.length) {
        groceryList.splice(id, 1);
        res.send(groceryList);
    } else {
        res.status(404).send('Grocery not found');
    }
});

router.get('/cart', (req, res) => {
    const {cart} = req.session;
    if (!cart) {
        res.send("Cart is empty");
    } else {
        res.send(cart);
    }
});

router.post('/cart/item', (req, res) => {
    const {item, price} = req.body;
    const newItem = {item, price};
    const {cart} = req.session;
    if (cart) {
        req.session.cart.items.push(newItem);
    } else {
        req.session.cart = {
            items: [newItem]
        }
    }
    res.send(201);
});


module.exports = router;