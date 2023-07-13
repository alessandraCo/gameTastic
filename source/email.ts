//email settings
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'thalia.kuhlman82@ethereal.email',
        pass: 'eCRAkt1mtPBHwmtwWT'
    }
  });

  function sendEmail(fromUser : string, toUser : string) {
    let mailOptions = {
      from: fromUser,
      to: toUser,
      subject: "Sending Email using Node.js",
      text: `Hi  from my newsletter application!`,
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return;
      } else {
        console.log("Email sent: " + info.response);
        return;
      }
    });
    return;
  }

  sendEmail("user1@mail.com", "user2@mail.com");