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
    return res.render('user_sign_in', {
        title: 'Codeial | Sign In'
    })
}

// get sign up data
module.exports.create = function(req,res){
    // todo later
}

// sign in and create the session for user
module.exports.createSession = function(req,res){
    // todo later
}