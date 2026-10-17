import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import records from "./routes/record.js";

const PORT = process.env.PORT || 5050;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

app.use("/record", records);

// Serve React frontend
app.use(express.static(path.join(__dirname, "dist")));

// React Router fallback
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/record")) {
    return res.sendFile(path.join(__dirname, "dist", "index.html"));
  }
  next();
});

// Start Express
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
