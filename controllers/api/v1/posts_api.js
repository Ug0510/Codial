const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req, res) {
    try {
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

        return res.status(200).json({
            message: "List post",
            posts: posts
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

module.exports.destroy = async function(req, res) {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: await Post.find({})
            });
        }

        if (post.user.equals(req.user.id)) {
            // Delete the post and associated comments
            await post.deleteOne();
            await Comment.deleteMany({
                post: req.params.id
            });
            return res.status(200).json({
                message: "Post and associated comments deleted successfully!"
            });
        } else {
            return res.status(401).json({
                message: "You can't delete this post!"
            });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}
