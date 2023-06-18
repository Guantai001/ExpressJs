#### Express JS - Node JS Framework 
Express Js is a Node Js framework which is used to build web applications. It is very simple and flexible framework. It provides a lot of HTTP methods and middleware for creating robust APIs easily. Express Js is developed by the team of TJ Holowaychuk and it is released in 2010. It is free and open source framework under MIT license. It runs on various platforms like Windows, Linux, and Mac OS X, etc. It is used to design single-page, multi-page and hybrid web applications.

#### Installation
```
npm install express --save
```
```
npm install -g nodemon
```

#### Express JS Application

    var express = require('express');
    var app = express();
    app.get('/', function (req, res) {
    res.send('Hello World');
    })
    var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
    })

#### Express JS Routing

    var express = require('express');
    var app = express();
    app.get('/', function (req, res) {
    res.send('Hello World');
    })
    var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
    })

#### Express JS HTTP Methods

    var express = require('express');
    var app = express();
    app.get('/', function (req, res) {
    res.send('Hello World');
    })
    var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
    })

#### Express JS Middleware

    var express = require('express');
    var app = express();
    app.use(express.static('public'));
    app.get('/', function (req, res) {
    res.send('Hello World');
    })

    var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
    })

#### Express JS Router

    var express = require('express');
    var app = express();
    var router = express.Router();
    router.get('/', function(req, res) {
    res.send('Home page');
    })
    router.get('/about', function(req, res) {
    res.send('About this page');
    })
    app.use('/', router);
    app.listen(8081);

#### Express JS Database Integration with MongoDB
Install mongodb and create a database mydb and collection customers.We will use this database in our following examples.


    var express = require('express');
    var app = express();
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    app.get('/', function (req, res) {
    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("customers").findOne({}, function(err, result) {
    if (err) throw err;
    console.log(result.name);
    db.close();
    });
    });
    })

    var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
    })




