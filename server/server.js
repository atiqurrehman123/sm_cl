import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Chat gpt server running");
});

const PORT=5000 || process.env.PORT
app.listen(PORT, () => {
  console.log("Server ruining on Port 3000");
});
