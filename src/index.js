const express = require('express');
const app = express();
const groceriesRouter = require('./routes/groceries');

const port = 3000;

app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.use((req, res, next) => {
  console.log(`${req.method}:${req.url}`);
  next();
});

app.use("/api/groceries", groceriesRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
