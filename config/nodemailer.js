const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

const transporter = nodemailer.createTransport({
    service:'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "uditg0510@gmail.com",
      pass: "xswl dbfa qwxy jiov",
    }
  });
  
  const renderTemplate = (data,relativePath) => {
    let mailHTML;
    
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err , template)
        {
            if(err){console.log(err); return;}

            mailHTML = template;
        }
    )
    return mailHTML;
  };

  module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
  };