const express = require('express');

const app = express();
const mongoose = require('mongoose');
require("dotenv/config");
const bodyParser = require("body-parser");
const scoreController = require("./controllers/scoreController");
//MIDDLEWARES
app.use(bodyParser.json());
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});



app.post('/scores',scoreController.postScores);
app.get('/scores',scoreController.getScores);

mongoose.connect(process.env.DB_CONNECTION).catch(error=>console.log(error));

console.log("listening")
//LISTENING TO THE SERVER
app.listen(3000);