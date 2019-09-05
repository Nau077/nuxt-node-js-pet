const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
const nodemailer = require('nodemailer');

const { secret, expireIn } = require ('../../config/config').jwtEmail;

const sendEmail = userData => {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'romaguitar077@gmail.com',
        pass: 'Dialog!1313'
      }
    });
    
    const emailToken = jwt.sign(
        { 
            id: userData._id,
        },
        secret,
        {
            expiresIn: expireIn,
        })
    //url_change *fix
      const url = `http://localhost:3000/confirmation/${emailToken}`;
     
      transporter.sendMail({
        to: userData.email,
        subject: 'Confirm Email',
        html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
      });
    }



module.exports = {
    sendEmail,
}