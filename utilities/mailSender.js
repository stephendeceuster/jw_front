const mail = require("@sendgrid/mail");

mail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendMail = async (fullName, email, message) => {
  const msg = `
      Name: ${fullName} \r\n
      Email: ${email} \r\n
      Message: ${message}
    `;

  const resp = await mail.send({
    to: "stephen@sidebury.com",
    from: "stephen@sidebury.com",
    subject: "New Message! from contactform",
    text: msg,
    html: msg.replace(/\r\n/g, "<br>"),
  });

  console.log('resp in mailSender', resp);

  return {message: "send"};
};
