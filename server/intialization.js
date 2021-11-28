// intialization of MongoDB database and server

const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();

app = express();

// connecting to database
MONGODB_URL = `mongodb+srv://Bala:${process.env.DB_PASSWORD}@scheduler.gb6m8.mongodb.net/Scheduler?retryWrites=true&w=majority`
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useunifiedTopology: true })
    .then((result) => {
        console.log("connected to Mongodb");
        app.listen(8800);
    })
    .catch((err) => {
        console.log(err);
    });

module.exports = app;