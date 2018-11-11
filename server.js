var express = require('express');
var http = require('http');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');
var consolidate = require("consolidate"); //1
var _ = require("underscore");
var cookieParser = require('cookie-parser');
var formidable = require('formidable');
var fs = require('fs');
var app = express();
var path = require('path');
var multer = require('multer');
const Availables = require('./models/avail');
const Requires = require('./models/req');
const Users = require('./models/user');
var Report = require('./models/report');
var upload = require('./multer/storage');
var Feedback = require('./models/feedback');
var Article = require('./models/article');
var Review = require('./models/review');

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var db = mongoose.connection;

//Middleware
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.engine('ejs', engine);
app.set('view engine', 'ejs');

var server = http.Server(app);
var mongoClient = require("mongodb").MongoClient;
var routes = require('./routes');

var io = require('socket.io')(server); //Creating a new socket.io instance by passing the HTTP server object
var portNumber = 8080;

var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');
var rRoutes = require('./routes/router');

app.use(mainRoutes);
app.use(userRoutes);
app.use(rRoutes);

app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db
    })
  }));

// mongoose.connect('mongodb://localhost:27017/ambulancego');
// mongoose.Promise = global.Promise;
// var db = mongoose.connection;
// db.once('open', function () {
//   console.log("Connection to MongoDB succesful...");
// }).on('error', function (error) {
//   console.log("MongoDB connection error: ", error);
// });
//
// io.on('connection', function(socket) { //Listen on the 'connection' event for incoming sockets
//     console.log('A user just connected');
//
//     socket.on('join', function(data) { //Listen to any join event from connected users
//         socket.join(data.userId); //User joins a unique room/channel that's named after the userId
//         console.log("User joined room: " + data.userId);
//     });
//
//     routes.initialize(app, db, socket, io); //Pass socket and io objects that we could use at different parts of our app
// });
//
// app.listen(8080, function () {
//     console.log("Server is running at 8080");
// });

server.listen(portNumber, function() { //Runs the server on port 8000
    console.log('Server listening at port ' + portNumber);

    var url = 'mongodb://localhost:27017/ambulancego'; //Db name
    mongoose.Promise = global.Promise;
    mongoClient.connect(url, function(err, db) { //a connection with the mongodb is established here.
        console.log("Connected to Database");

        app.get('/citizen', function(req, res) { //a request to /citizen.html will render our citizen.html page
            //Substitute the variable userId in citizen.html with the userId value extracted from query params of the request.
            res.render('citizen', {
                userId: req.query.userId
            });
        });

        app.get('/cop', function(req, res) {
            res.render('cop', {
                userId: req.query.userId
            });
        });

        app.get('/data', function(req, res) {
            res.render('data');
        });

        io.on('connection', function(socket) { //Listen on the 'connection' event for incoming sockets
            console.log('A user just connected');

            socket.on('join', function(data) { //Listen to any join event from connected users
                socket.join(data.userId); //User joins a unique room/channel that's named after the userId
                console.log("User joined room: " + data.userId);
            });

            routes.initialize(app, db, socket, io); //Pass socket and io objects that we could use at different parts of our app
        });
    });
});
