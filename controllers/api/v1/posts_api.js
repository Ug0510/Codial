const Post = require('../../../models/post');

module.exports.index = async function(req , res){

    const posts = await Post.find({})
    .sort('-createdAt')
    .populate({
        path: 'user',
        select: 'name email createdAt updatedAt avatar'
    })
    .populate({
        path: 'comments',
        populate: {
            path: 'user',
            select: 'email name createdAt updatedAt avatar'
        },
        options: { sort: { createdAt: -1 } }
    });

    return res.json(200, {
        message: "List post",
        posts: posts
    })
}