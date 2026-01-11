require("dotenv").config();
import express from "express";
import cors from "cors";
import contactRouter from "./routes/contact";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(express.json());

// Routes
app.use("/api/contact", contactRouter);

// Listen for calls
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
