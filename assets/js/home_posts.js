{   
    // method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }


    // method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
                    <p>
                        
                        <small>
                            <a class="delete-post-button"  href="/posts/destroy/${ post._id }">X</a>
                        </small>
                       
                        ${ post.content } by
                        
                        <small>
                        ${ post.user.name }
                        </small>
                    </p>
                    <div class="post-comments">
                        
                            <form action="/comments/create" method="POST">
                            <textarea name="content" cols="30" rows="3" required></textarea>
                                <input type="hidden" name="post" value="${ post._id }" >
                                <br>
                                <input type="submit" value="Add Comment">
                            </form>
               
                
                        <div class="post-comments-list">
                            <ul id="post-comments-${ post._id }">
                                
                            </ul>
                        </div>
                    </div>
                    
                </li>`)
    }



    // To give functionality of deleting the post using ajax without page refresh
    // Attach a click event listener to the parent container of posts (static element)
    $('#posts-list-container').on('click', '.delete-post-button', function(e) {
        e.preventDefault();
        // Get the URL from the clicked link
        let deleteLink = $(this).prop('href');
        
        // AJAX request to delete the post
        $.ajax({
            type: 'get',
            url: deleteLink,
            success: function(data) {
                // Handle success response (post deleted)
                $(`#post-${data.data.post_id}`).remove();

                if (data.message) {
                    // Display the flash message to the user
                    displayFlashMessage(data.message, 'error');
                }
            },
            error: function(error) {
                // Handle error response
                console.log(error.responseText);
            }
        });
    });


    // Function to create a flash message
    function displayFlashMessage(message, type) {
        new Noty({
            text: message,
            type: type, // Change this to match your message type (success, error, warning, etc.)
            timeout: 3000, // Adjust the timeout as needed
            progressBar: true, // Display a progress bar
            closeWith: ['click', 'button'], // Close the notification when clicked or using the close button
        }).show();
    }

    createPost();
}