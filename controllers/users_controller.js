const User = require('../models/user')

module.exports.profile = function(req,res){
    res.end('<h1>User Profile</h1>');
} 

// render sign up page
module.exports.signUp = function(req, res){

    return res.render('user_sign_up', {
        title: 'Codeial | Sign Up'
    })
}

// render sign in page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in',{
        title: 'Codeial | Sign In'
    })

}

// get sign up data
module.exports.create = async function (req, res) {
    try {
      if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
      }
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        await User.create(req.body);
        return res.redirect('/users/sign-in');
      } else {
        return res.redirect('back');
      }
    } catch (err) {
      console.error("Error in finding or creating a user while signing up:", err);
      return res.status(500).send("Internal Server Error");
    }
  };
  

// sign in and create the session for user
module.exports.createSession = async function (req, res) {
  try {
    // find the user
    let user = await User.findOne({ email: req.body.email });

    // if not found then redirect to sign up page
    if (!user) {
      return res.redirect('back');
    } else {
      // handle password, if it doesn't match
      if (user.password !== req.body.password) {
        return res.redirect('back');
      }

      // handle session creation
      res.cookie('user_id', user.id); // Assuming _id is the user's unique identifier
      return res.redirect('/users/profile');
    }
  } catch (err) {
    console.error('Error:', err);
  }
};
