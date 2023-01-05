import express from "express";
import {entrypoint} from "../controller/entrypoint.js"
import { exitPoint } from "../controller/exitpoint.js";
const router = express.Router();

// POST route to record the entry of a vehicle onto the ring road
router.post("/entry", 
entrypoint
);
// POST route to record the exit of a vehicle from the ring road
router.post("/exit",
exitPoint
);

export default router;
