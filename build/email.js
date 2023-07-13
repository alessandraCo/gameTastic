// "use strict";
// import nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//         user: 'thalia.kuhlman82@ethereal.email',
//         pass: 'eCRAkt1mtPBHwmtwWT'
//     }
// });

// export function sendEmail(fromUser, toUser) {
//     let mailOptions = {
//         from: fromUser,
//         to: toUser,
//         subject: "Sending Email using Node.js",
//         text: `Hi  from my newsletter application!`,
//     };
//     transporter.sendMail(mailOptions, function (error, info) {
//         if (error) {
//             console.log(error);
//             return;
//         }
//         else {
//             console.log("Email sent: " + info.response);
//             return;
//         }
//     });
//     return;
// }

export function sendMail(fromName, toName, fromEmail, message) {
    let params = {
        from_name: fromName,
        to_name: toName,
        from_email: fromEmail,
        message: message
    };

    const serviceID = "service_528wtcm";
    const templateID = "template_ejm6xxa";

    emailjs.send(serviceID, templateID, params).then((res) => {
        //feedback
        console.log(res);
        console.log("your messages have been sent successfully!");
    }).catch((err) => console.log(err));
}

