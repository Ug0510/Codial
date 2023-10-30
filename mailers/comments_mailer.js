const nodeMailer = require('../config/nodemailer');

// this is another way of exporting a method
exports.newComment = (comment) => {
    console.log('inside newComment mailer');

    nodeMailer.transporter.sendMail({
        from: 'uditg0510@gmail.com',
        to: comment.user.email,
        subject: "New Comment Published",
        html: `<h1> Yeyy! your new comment is been published! </h1>`
    }, (err, info) => {
        if(err)
        {
            console.log(err);
            return;
        }

        console.log("Message sent",info);
        return;
    });
}