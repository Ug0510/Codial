const Post = require('../models/post');

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
