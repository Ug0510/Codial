const User = require('../models/user')

module.exports.profile = async function(req,res){
    
    try{
        const user = await User.findById(req.params.id);

        return res.render('user_profile',{
            title: 'Codial | User Profile',
            profile_user: user
        });
    }
    catch(err)
    {
        console.log(err);
    }
    
} 

// render sign up page
module.exports.signUp = function(req, res){
    
    // check if user is already signed in
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: 'Codeial | Sign Up'
    })
}

// render sign in page
module.exports.signIn = function(req, res){
    // check if user is already signed in
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title: 'Codeial | Sign In'
    })
}

// get sign up data
// module.exports.create = async function (req, res) {
//     try {
//       if (req.body.password != req.body.confirm_password) {
//         return res.redirect('back');
//       }
//       const user = await User.findOne({ email: req.body.email });
//       if (!user) {
//         await User.create(req.body);
//         return res.redirect('/users/sign-in');
//       } else {
//         return res.redirect('back');
//       }
//     } catch (err) {
//       console.error("Error in finding or creating a user while signing up:", err);
//       return res.status(500).send("Internal Server Error");
//     }
//   };
  

// get the sign up data
module.exports.create = function(req, res){
  if (req.body.password != req.body.confirm_password){
      return res.redirect('back');
  }

  User.findOne({email: req.body.email}, function(err, user){
      if(err){console.log('error in finding user in signing up'); return}

      if (!user){
          User.create(req.body, function(err, user){
              if(err){console.log('error in creating user while signing up'); return}

              return res.redirect('/users/sign-in');
          })
      }else{
          return res.redirect('back');
      }

  });
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
  return res.redirect('back');
  
}


// Sign out and destroy session
module.exports.destroySession = function (req, res) {
    // Use Passport.js's logout() function to log the user out
    req.logout(function (err) {
      if (err) {
        console.error('Error logging out:', err);
        return next(err);
      }
      // Redirect to a desired page after logout, or send a success message
      res.redirect('/'); 
    });
  };