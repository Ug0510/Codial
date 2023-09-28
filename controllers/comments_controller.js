const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req, res) {

    try {

        //getting the post 
        const post = await Post.findById(req.body.post);

        //if post if not found return 
        if(!post)
        {
            return res.send('Post not found');
        }
        
        const comment = await Comment.create({
            content: req.body.content,
            user: req.user._id,
            post: post._id            
        });
        console.log(comment);

        // Adding comment to the post comment array
        post.comments.push(comment);
        await post.save();


        console.log(post);

        
        // Handle the case where the post is created successfully
        // You can choose to redirect to a different page or do something else here.
        // For example, you can redirect to the newly created post's page.
        return res.redirect(`back`);
    } catch (err) {
        console.error(err);
        return res.redirect('back');
    }
};
