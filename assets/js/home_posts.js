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
                    // Handle the success response here
                    console.log(data);
                },
                error: function(err) {
                    // Handle the error response here
                    console.log(err.responseText);
                }
            });
        });
    };

    createPost();
}
