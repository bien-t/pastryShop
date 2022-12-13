import { Handler } from "@netlify/functions";
import nodemailer from 'nodemailer';

//create email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 587,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});


const handler: Handler = async (event, context) => {
  const body = event.body ? JSON.parse(event.body) : '';

  //Check required fields
  const requiredFields = ["name", "email", "phone", "message"];
  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: `You have forgotten about the ${field} field. Try again.` })
      }
    }
  }

  //Send email
  const info = await transporter.sendMail({
    from: `${body.name} <${body.email}> via Pastry Shop contact form `,
    to: `o@example.com`,
    subject: `New contact request from ${body.name}`,
    text: 'test' ,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Your message has been sent" })
  }
};

export { handler };
