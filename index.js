const express = require('express');
const app = express();
const port = 8000;

app.listen(port , function(err){
    if(err)
    {
        //equivalent to console.log('Error',err);
        //this is called interpolation
        console.log(`Error in running the server: ${err}`);
    }

    //if server runs 
    console.log(`Server is running on port ${port}`);
})