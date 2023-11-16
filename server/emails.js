// SMTP CONNECTION
const { createTransport } = require('nodemailer');
require('dotenv').config();


const transporter = createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});


const sendMail = (email, subject, id) => {
    const mailOptions = {
        from: 'do-not-reply@spendsmart.com',
        to: email,
        subject: subject,
        
        html: `Please click this email to confirm your email: <a href="http://localhost:3001/confirmation/?token=${id}">Confirmation Link</a>`
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}


//sendMail("addirm@yahoo.com", "test sub", "body of email")
module.exports = {
    sendMail
}
