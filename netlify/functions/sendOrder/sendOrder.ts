import { Handler } from "@netlify/functions";
import nodemailer from 'nodemailer';
import formatMoney from '../../../src/utils/formatMoney'
//create email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 587,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

const orderTemplate = ({ basket, total }) => {
  return `
  <div>
  <h3>Your recent order at the Pastry Shop</h3>
  <ul>
    ${basket.map((product) => {
    return `
          <li>
            ${product.name},${product.quantity},${formatMoney(product.quantity * product.price)}
          </li>
        `
  })
    }
  </ul>
    <p>Order sum:${formatMoney(total)}</p>
  </div>
  `
}


const handler: Handler = async (event, context) => {
  const body = event.body ? JSON.parse(event.body) : '';
console.log('api',process.env.DATOCMS_API)
  //Check if order is empty
  if (body.basket.length === 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: `You order is empty` })
    }
  }

  //Send email
  const info = await transporter.sendMail({
    from: `Pastry Shop order form `,
    to: `o@example.com`,
    subject: `New order`,
    html:orderTemplate({basket:body.basket,total:body.total})
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "You have placed your order successfully." })
  }
};

export { handler };
