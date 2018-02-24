var express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

var morgan = require('morgan');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

var config = require('./config/database');
var port = process.env.PORT || 3001;

mongoose.connect(config.db);

require('./config/passport')(passport);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(session({
    secret: 'ABCdef555',
    saveUninitialized: true,
    resave: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

var routes = require('./routes/routes')(app, passport);
// app.use('/api', routes);
app.use((req, res, next) => {
    res.status(404).send('<h2 align=center>Page Not  Found!</h2>');
});
app.listen(port, function() {
    console.log("App Server Listening at", port);
  });