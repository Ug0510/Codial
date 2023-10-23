{
    // Function to handle Comment creation on any post using AJAX
    let createPostComment = function()
    {
        $('.new-comment-form').submit(function(e)
        {
            e.preventDefault();

            // getting post id to identify the post
            const postId = $(this).find('input[name="post"]').val();
           console.log(postId);
            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: $(this).serialize(),
                success: function(data){
                    let newComment = newPostComment(data.data.comment);

                    // check what's wrong here 
                    $(`#post-comments-list-${postId}>ul`).prepend(newComment);
                    deletePostComment();
                    if(data.message)
                    {
                        displayFlashMessage(data.message,'success');
                    }
                },
                error: function(err)
                {
                    console.log(err);
                }
            });
        });
    }

    // Function to create a new comment element for the DOM
    function newPostComment(comment) {
        console.log(comment.user.name);
        return $(`<li id="post-comment-${comment._id}">
            ${comment.content} by ${comment.user.name} 
            <a href="/comments/destroy/${comment._id}" class="post-comment-delete-button">X</a>
            </li>`
        );
    }


    createPostComment();

    // function to delete Post comment using AJAX
    let deletePostComment = function(){
        $('.post-comment-delete-button').click(function(e)
    {
        e.preventDefault();

        const url = $(this).prop('href');

        // making ajax request to delete comment
        $.ajax({
            type: 'post',
            url: url,
            data: $(this).serialize(),
            success: function(data){


                // removing post from DOM
                $(`#post-comment-${data.data.commentId}`).remove();

                // display flash message
                displayFlashMessage(data.message,'error');
            },
            error: function(err){
                console.log(err);
            }
        });


    });
    }
    deletePostComment();
}


