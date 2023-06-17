const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const groceriesRouter = require('./routes/groceries');
const marketsRouter = require('./routes/markets');
const authRouter = require('./routes/auth');
// const mongoose = require('mongoose');

require('./database');

// mongoose
//     .connect('mongodb://localhost:27017/expressjs')
//     .then(() => console.log('Connected to MongoDB'))
//     .catch((err) => console.log(err));




const app = express();
const port = 3000;

app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser());
app.use(
    session({
        secret: 'supersecret',
        resave: false,
        saveUninitialized: false,
    })
);





app.use((req, res, next) => {
  console.log(`${req.method}:${req.url}`);
  next();
});


// router.use((req, res, next) => {
//     if (req.session.user) next();
//     else res.send(401);
//   });


app.use("/groceries", groceriesRouter);
app.use("/api/markets", marketsRouter);
app.use("/api/auth", authRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
