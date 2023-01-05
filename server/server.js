import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/conn.js"
import colors from "colors"
import tollCalculation from "./routes/tolls.js"

dotenv.config();

const app = express();

//middleware
dotenv.config();
connectDB()
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Smash Cloud server running");
});

//routes
app.use("/api", tollCalculation);

const PORT=5000 || process.env.PORT
app.listen(PORT, () => {
  console.log("Server ruining on Port 5000");
});
