const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

const nodemailer = require("nodemailer");
const { response } = require("express");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("is running");
});

app.post("/", cors(), async (req, res) => {
  // create reusable transporter object using the default SMTP transport

  const { name, email, message } = req.body.formData;

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
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "Portfolio - Kontaktformular",
    text: "Hello world?",
    html: `<p>Name: ${name}<br>
           Email: ${email}</p>
           <p>Nahricht: ${message}</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("error", { message: error });
    } else {
      console.log("Email sent:" + info.response);
      res.send("succes");
    }
  });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running `);
});
