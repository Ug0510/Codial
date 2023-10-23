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

        
        // Adding comment to the post comment array
        post.comments.push(comment);
        await post.save();

        await comment.populate({
            path:'user',
            option: 'name'
        });
        if(req.xhr)
        {
            return res.status(200).json({
                data:{
                    comment: comment
                },
                message: "Comment created"
            })
        }


        // Handle the case where the post is created successfully
        // You can choose to redirect to a different page or do something else here.
        // For example, you can redirect to the newly created post's page.
        return res.redirect(`back`);
    } catch (err) {
        console.error(err);
        return res.redirect('back');
    }
};


module.exports.destroy = async function(req, res){
    try{
        const comment = await Comment.findById(req.params.id);
        
        if(comment.user == req.user.id){
            //storing the post id from comment
            let postId = comment.post;
            // deleting the comment 
            await comment.deleteOne();
            // removing comment from post 
            await Post.findByIdAndUpdate(postId, {
                $pull: { comments: req.params.id}
            })


            if(req.xhr)
            {
                return res.status(200).json({
                    data:{
                        commentId: comment.id
                    },
                    message: 'Comment delete Successfully'
                });
            }
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
    }
};