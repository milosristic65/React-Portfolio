require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodeMailer = require("nodemailer");
const rateLimit = require("express-rate-limit");
const app = express();

const email = process.env.EMAIL;
const password = process.env.PASSWORD;

async function contact(user_name, user_email, user_message) {
  // Create the message
  const message = `
  <h3>Contact Info</h3>
  <b>Name:</b> ${user_name}<br>
  <b>Email:</b> ${user_email}<br>
  <h3>Message</h3>
  <p>${user_message.replace(/\n/g, "<br>")}
`;

  // Create the transporter
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: email,
      pass: password,
    },
  });

  // Send the message
  const info = await transporter.sendMail({
    to: email,
    subject: "Portfolio Contact Form Submission",
    html: message,
  });

  console.log("Message sent: " + info.messageId);
}

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: "Too many requests, please try again later.",
});

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(express.json()); // Middleware to parse JSON bodies

app.post("/api/contact", contactLimiter, async (req, res) => {
  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.status(200).end(); // End preflight request here
  }

  // Handle the post request
  const { user_name, user_email, user_message } = req.body;
  try {
    await contact(user_name, user_email, user_message);
    res.status(200).send("Message sent successfully");
  } catch (error) {
    res.status(500).send("Failed to send message");
    console.log(error.message);
  }
});

// Listen for calls
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
