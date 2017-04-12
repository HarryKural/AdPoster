let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

// passport dependencies
let passport = require('passport');
let session = require('express-session');
let localStrategy = require('passport-local').Strategy;

let index = require('./routes/index');
let users = require('./routes/users');
let ads = require('./routes/ads');

let app = express();

// use mongoose to connect to mongodb
let mongoose = require('mongoose');
let conn = mongoose.connection;

// link to config file
let globals = require('./config/globals');

conn.open(globals.db);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// configure passport and sessions
app.use(session({
    secret: 'some salt value here',
    resave: true,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// link to the new Account model
let Account = require('./models/account');
passport.use(Account.createStrategy());

// Reference: https://www.npmjs.com/package/passport-linkedin
//            https://developer.linkedin.com/

// linkedIn auth
let LinkedInStrategy = require('passport-linkedin').Strategy;

passport.use(new LinkedInStrategy({
        consumerKey: globals.linkedin.consumerKey,
        consumerSecret: globals.linkedin.consumerSecret,
        callbackURL: globals.linkedin.callbackURL
    },
    function(token, tokenSecret, profile, done) {
        Account.findOrCreate({ username: profile.displayName }, function (err, user) {
            return done(err, user);
        });
    }
));

// mailgun ----------------- contact page to send email --------------------
// Reference: https://www.youtube.com/watch?v=9RNQNwHCvSU&t=603s
app.post("/contact",function(req,res){

    let api_key = 'key-cea2f6217622326ba8270360ecabe20a';
    let domain = 'sandbox220cf30c51264734934e840e00a1535b.mailgun.org';
    let mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

    let data = {
        from: req.body.email,
        to: 'bsp42333@gmail.com',
        subject: req.body.name + " Sent you a message",
        html: "<b>Message: </b>"+req.body.message
    };

    mailgun.messages().send(data, function (error, body) {
        console.log(body);
        if (!error)
        {
            res.render('contact', {title: 'Contact', msg: 'Message sent! Thank you.', err: false, page: 'contact'});
        }
        else
        {
            res.render('contact', {title: 'Contact', msg: 'Error occured, message not sent.', err: true, page: 'contact'});
        }
    });
});

// manage user login status through the db
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

app.use('/', index);
app.use('/users', users);
app.use('/ads', ads);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {
      title: 'AdPoster',
      user: req.user
  });
});

module.exports = app;
