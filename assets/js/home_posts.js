{
    // method to submit the form data using AJAX
    let createPost = function() {
        let newPostForm = $('#new-post-form');
        console.log(newPostForm);
        newPostForm.submit(function(e) {
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data) {
                    // creating new post 
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                },
                error: function(err) {
                    // Handle the error response here
                    console.log(err.responseText);
                }
            });
        });
    };


    // method to create a post in DOM
    let newPostDom = function(post){
        return `<li id="post-<%= post._id%>">
        <p>
                <small>
                    <a class="delete-post-button" href="/posts/destroy/<%= post.id %>">X</a>
                </small>
            
            ${post.content} by
        <small>
            ${post.user.name}
        </small>
        <br>
        <br>
        <form action="/comments/create" method="POST" id="new-comment-form">
            <textarea name="content" cols="30" rows="3" required></textarea>
            <input type="hidden" name="post" value="${post._id }">
            <input type="submit" value="Comment">
        </form>
        </p>
        <div id="post-comments-list">
            <ul id="post-comments-${post._id}"> Comments:
                
            </ul>
        </div>
    </li>`;
    }
    createPost();
}
