// Import necessary modules
const nodemailer = require('nodemailer');

// Create a function to send OTP email
const sendOtpThroughEmail = (receipientEmail, newOtp) => {
  const senderEmail = process.env.SENDER_EMAIL;
  const smtpConfig = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.PASSWORD,
    },
  };

  const transporter = nodemailer.createTransport(smtpConfig);

  const mailOptions = {
    from: senderEmail,
    to: receipientEmail,
    subject: "Resend OTP ",
    text: `OTP sent sucessfully ${newOtp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log("Error:", error.message);
    }
    console.log("Resend OTP Email sent:", info.response);
  });
};

module.exports = sendOtpThroughEmail ;