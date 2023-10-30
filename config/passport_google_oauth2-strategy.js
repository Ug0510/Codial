const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


// tell passport to use a new strategy for google login 
passport.use(new googleStrategy({
    clientID: "858715951029-t82tvb9j9qmc26db1gfslqchu46nnbtr.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
    },
    async function(accessToken, refreshToken, profile, done)
    {
        try{
            // find the user
            const user = await User.find({
                email: profile.emails[0].value
            });

            // if found, set this user as req.user
            if(user)
            {
                return done(null,user);
            }
            else{
                // if not found , create the user and set it as req.user
                const newUser = await User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                });

                if(newUser)
                {
                    return done(null,user);
                }
            }


        }
        catch(err)
        {
            console.log(err);
        }
        
    }    
))