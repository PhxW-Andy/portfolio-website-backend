const express = require("express");
const app = express();
require("dotenv").config();
const PORT = 5000;
const cors = require("cors");

const nodemailer = require("nodemailer");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("is running");
});

app.post("/send_mail", cors(), async (req, res) => {
  // create reusable transporter object using the default SMTP transport

  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });

  // send mail with defined transport object
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "Portfolio - Kontaktformular",
    text: "Hello world?",
    html: `<p>Name: ${name}<br>
           Email: ${email}</p>
           <p>Nahricht: ${message}</p>`,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
