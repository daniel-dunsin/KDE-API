const nodemailer = require('nodemailer');
require("dotenv").config()

const transporter = nodemailer.createTransport({
    service:"gmail",
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_TEST_PASSWORD
    }
  });

const sendMail = async (receiver, sender, subject, html, res)=>{
    const mailOptions = {
        from: `${sender}<${process.env.EMAIL_ADDRESS}>`,
        to: receiver,
        subject: subject,
        html: html
      };
      

     await transporter.sendMail(mailOptions, (error, info) => {
      console.log("sending...")
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        res.json({message: "Successful"})
        }
    });
}

// sendMail("eolaosebikan60@gmail.com", "Emmanuel", "Test Mail", ``);

module.exports = {
    sendMail
}