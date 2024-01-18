// emailSender.js
const nodemailer = require("nodemailer");

const SendResetPasswordLink = (email, resetToken, PORT, receiverEmail) => {
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
    const resetLink = `http://localhost:${PORT}/reset-password/${resetToken}`;
    const mailOption = {
        from: senderEmail,
        to: receiverEmail,
        subject: "Complete Your Password Reset",
        text: ` Hi Useer, Lets reset Your password so that you can have access to your account 
        click here to reset ${resetLink}
        `,
    };

    transporter.sendMail(mailOption, (error, info) => {
        if (error) {
            return console.log("Error:", error.message);
        }
        console.log("Reset Password", info.response);
    });
};





module.exports = SendResetPasswordLink;