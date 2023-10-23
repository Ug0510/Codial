const User = require('../models/user')
const fs = require('fs');
const path = require('path');

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

// update user details
module.exports.update = async function(req,res){
    try{
        if(req.user.id == req.params.id)
        {
            let user = await User.findByIdAndUpdate(req.params.id);
            User.uploadedAvatar(req,res,function(err)
            {
                // handling error
                if(err){console.log(err);}

                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file)
                {
                    // checking if the avator already exists for that user 
                    if(user.avatar && fs.existsSync(path.join(__dirname , ".." , user.avatar )))
                    {
                        fs.unlinkSync(path.join(__dirname , ".." , user.avatar ));
                    }
                    //this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
            });
            return res.redirect('back');
        }

    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

// render sign up page
module.exports.signUp = function(req, res){
    
    // check if user is already signed in
    if(req.isAuthenticated())
    {
        return res.redirect('/');
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

        req.flash('success','Logged in successfully!');
        return res.redirect('/');
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
      req.flash('success','You have logged out!');
      // Redirect to a desired page after logout, or send a success message
      res.redirect('/'); 
    });
  };


