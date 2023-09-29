const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req, res) {
    try {
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        
        // Handle the case where the post is created successfully
        // You can choose to redirect to a different page or do something else here.
        // For example, you can redirect to the newly created post's page.
        return res.redirect(`back`);
    } catch (err) {
        console.error(err);
        return res.redirect('back');
    }
};

module.exports.destroy = async function(req, res) {
    try {
        console.log('hi')
        const post = await Post.findById(req.params.id);
        console.log(post);
        // .id means converting the object id into a string
        if (post.user.equals(req.user.id)) {
            // Delete the post and associated comments
            // await Post.deleteOne({_id: post.id});
            await post.deleteOne();
            await Comment.deleteMany({
                post: req.params.id
            });
        }
        return res.redirect('back');
    } catch (err) {
        console.log(err);
    }
}

