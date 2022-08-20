const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

const nodemailer = require("nodemailer");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("is running");
});

app.post("/", cors(), async (req, res) => {
  // create reusable transporter object using the default SMTP transport
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.strato.de",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    // tls: {
    //   // do not fail on invalid certs
    //   rejectUnauthorized: false,
    // },
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

  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.header("Access-Control-Allow-Origin", "*");
      res.send("error" + error.message);
    } else {
      console.log("Email sent:" + info.response);
      res.header("Access-Control-Allow-Origin", "*");
      res.send("success");
    }
  });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running `);
});
