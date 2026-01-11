import { Router } from "express";
import nodeMailer from "nodemailer";
import rateLimit from "express-rate-limit";

const email = process.env.EMAIL;
const password = process.env.PASSWORD;

const router = Router();

interface contactProps {
  user_name: string;
  user_email: string;
  user_message: string;
}

async function contact({ user_name, user_email, user_message }: contactProps) {
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

router.post("/", contactLimiter, async (req, res) => {
  const { user_name, user_email, user_message } = req.body;
  try {
    await contact({ user_name, user_email, user_message });
    res.status(200).send("Message sent successfully");
  } catch (error: any) {
    res.status(500).send("Failed to send message");
    console.log(error.message);
  }
});

export default router;
