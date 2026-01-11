require("dotenv").config();
import express from "express";
import cors from "cors";
import path from "path";

import contactRouter from "./routes/contact";
import dataRouter from "./routes/data";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(express.json());

// Routes
app.use("/api/contact", contactRouter);
app.use("/api/data", dataRouter);

// Serve assets
app.use("/api/assets", express.static(path.join(__dirname, "../public")));

// Listen for calls
const PORT = 5000;
const port = process.env.PORT || PORT;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
