const express = require("express");
const app = express();
const bodyParser = require('body-parser')

const mongoose = require('mongoose');
mongoose.connect('mongodb://db_mongo/page-check');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    app.listen(8085);
});

app.use(bodyParser.json());

app.set("view engine", "pug");

require("routes/webpage.route")(app);
