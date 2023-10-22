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
        return $(`<li>
         ${comment.content} by ${comment.user.name}
            <form action="/comments/destroy/${comment.id}" method="POST">
                <small>
                    <input type="submit" value="Delete">
                </small>
            </form>
    
    </li>`);
    }


    createPostComment();
}


