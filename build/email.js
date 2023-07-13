export function sendMail(fromName, toName, fromEmail, toEmail, message) {
    let params = {
        from_name: fromName,
        to_name: toName,
        from_email: fromEmail,
        to_email: toEmail,
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

