const express = require('express');
const bodyParser = require('body-parser');
var routes = require("./app/routes/router")
// create express app
const app = express();
app.set('view engine', 'ejs');
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}))

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.use('/api', routes);
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/5c-network')
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
    console.log('mongoDB connected!!')
});
// define a simple route
app.get('/', function (req, res) {
    res.send('5c network');
});


// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
module.exports = app;