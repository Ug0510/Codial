const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// Authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
    },
    async function(email,password,done){
        // find a user and establish the identity
       try{
            let user = await User.findOne({email: email});
            if(!user || user.password != password)
            {
                console.log("Invalid Username/Password");
                return done(null,false);
            }
            return done(null,user);
       }
       catch(err)
       {
        console.log(err);
        return done(err);
       }
    }
));

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null,user.id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser(async function(id,done){
    try{
        let user = await User.findById(id);
        done(null,user);
    }
    catch(err)
    {
        console.log(err);
        done(err);
    }
})

module.exports = passport;