import { Router } from "express";
import fs from "fs";
import path from "path";

const router = Router();

const dataFolder = path.join(__dirname, "../../data");

router.get("/:fileName", (req, res) => {
  const { fileName } = req.params;

  // Only allow JSON files
  if (!fileName.endsWith(".json")) {
    return res.status(400).send("Invalid file requested");
  }

  const filePath = path.join(dataFolder, fileName);
  if (!fs.existsSync(filePath)) {
    return res.status(404).send("File not found");
  }

  // Parse JSON
  try {
    const rawData = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(rawData);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to read JSON file");
  }
});

export default router;
