const Post = require('../models/post');

module.exports.home = async function(req,res){

    try{
        const posts = await Post.find({}).populate('user');
        
    return res.render('home',{
        title: 'Home',
        posts: posts
    })

    }catch(err){
        if(err){
            console.log(err);
        }
    }

}
