const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const path = require('path');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport_local_strategy');
const passportJWT = require('./config/passport_jwt_strategy');
const passportGoogle = require('./config/passport_google_oauth2-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle:'extended',
    prefix: '/css'  
}));
app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static(path.join(__dirname,'assets')));
// app.use(express.static('./assets'));

// make the uploads path available to the browser
app.use('/uploads',express.static(__dirname+'/uploads'));
app.use(expressLayouts);

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


// setting up ejs for view engine
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name: 'codial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://localhost/test-app',
            autoRemove: 'disabled'
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session())
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use('/',require('./routes'));

app.listen(port , function(err){
    if(err)
    {
        // equivalent to console.log('Error',err);
        // this is called interpolation
        console.log(`Error in running the server: ${err}`);
    }

    // if server runs 
    console.log(`Server is running on port ${port}`);
})