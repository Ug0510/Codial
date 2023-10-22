const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req, res) {
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        // populating post with user to show user name when post is added
        post = await post.populate({
            path: 'user',
            select: 'name email createdAt updatedAt'
        });
        console.log(post);
        
        if(req.xhr)
        {
            return res.status(200).json({
                data:{
                    post: post
                },
                message: "Post created"
            })
        }


        // Handle the case where the post is created successfully
        // You can choose to redirect to a different page or do something else here.
        // For example, you can redirect to the newly created post's page.
        req.flash('success','Post published!');
        return res.redirect('back');
    } catch (err) {
        req.flash('error',err)
        return res.redirect('back');
    }
};

module.exports.destroy = async function(req, res) {
    try {
        const post = await Post.findById(req.params.id);

        // .id means converting the object id into a string
        if (post.user.equals(req.user.id)) {
            // Delete the post and associated comments
            await post.deleteOne();
            await Comment.deleteMany({
                post: req.params.id
            });
        }
        
        // check if request made using ajax then return the staus 200 with post id
        if(req.xhr)
        {
            return res.status(200).json({
                data:{
                    post_id: req.params.id
                },
                message: "Post deleted"
            })
        }


        
        req.flash('success','Post deleted successfully!')
        return res.redirect('back');
    } catch (err) {
        console.log(err);
    }
}