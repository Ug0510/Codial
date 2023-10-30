const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service:'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "uditgg0510@gmail.com",
      pass: "8393934117",
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