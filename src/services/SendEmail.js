const nodemailer = require('nodemailer');
const process = require('process');

const sendEmail = (receiverEmail, otp) => {
    const senderEmail = process.env.SENDER_EMAIL;
    const smtpConfig = {
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    };

    const transporter = nodemailer.createTransport(smtpConfig);
    const mailOption = {
        from: senderEmail,
        to: receiverEmail,
        subject: "Activate Your Account",
        text: ` Hi there, Thank you for signing up for cream-car ,
        kindly copy the Code below to verify your email ${otp} 
        The link will expire in the next 2 minutes. if you did not sign 
        up for a cream-car account you can safely ignore the mail `,
    };

    transporter.sendMail(mailOption, (error, info) => {
        if (error) {
            return console.log("Error:", error.message);
        }
        console.log("Email sent:", info.response);
    });
};

module.exports = sendEmail;