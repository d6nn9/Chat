
const nodemailer = require('nodemailer');

module.exports = async function (options) {

  // const { mail, verifyEmailToken, } = options;

  // const transporter = nodemailer.createTransport({
  //   host: "smtp.gmail.com",
  //   port: 587,
  //   secure: false, // upgrade later with STARTTLS
  //   auth: {
  //     user: "ryabkov199",
  //     pass: "458911lfybk",
  //   }
  // });

  // const message = {
  //   from: "myfirstprojekt@gmail.com",
  //   to: mail,
  //   subject: "Message title",
  //   text: "Plaintext version of the message",
  //   get html() {

  //     return `<p>Go from here link</p>
  //           <a href="http://localhost:3000/verification/${verifyEmailToken}">http://localhost:3000/verification/${verifyEmailToken}</a>`;
  //   }
  // };
  // // defer()
  // return await transporter.sendMail(message);
};