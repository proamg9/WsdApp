'use strict';

const PORT_LISTENER = 3000;
console.log('I am listening to this port: http://localhost:%s', PORT_LISTENER);

const express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    errorhandler = require('errorhandler'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    http = require('http'),
    path = require('path');

const multer = require('multer');

const storage = multer.diskStorage({
    destination:"./uploads/files",
    filename:function(req,file,cb)
    {
        cb(null,path.extname(file.originalname));
    }
})

const upload = multer({storage:storage});

const passport = require('passport');

const flash = require('connect-flash');


const appConfig = require('./config/appConfig.json');


const app = express();

app.use(flash());
app.use(cookieParser());
// all environments
app.set('port', process.env.PORT || PORT_LISTENER);
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(favicon(__dirname + '/public/bootstrap-3.3.1/docs/favicon.ico'));
app.use(bodyParser({ keepExtensions: true, uploadDir: path.join(__dirname, appConfig.directories.publicDir) }));



//routes
app.use(session({
    secret: 'vidyapathaisalwaysrunning',
    resave: false,
    saveUninitialized: false,
    cookie:{httpOnly:true,maxAge:2419200000}
 } )); 

app.use(passport.initialize());
app.use(passport.session());   

app.use(express.static(path.join(__dirname, appConfig.directories.publicDir)));

require('./routes/index')(app,passport,upload);

require('./config/passport')(passport);
app.listen(3000);