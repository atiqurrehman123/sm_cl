import mongoose from "mongoose";
import moment from "moment";
//Creating Tolls Schema
const tolls = new mongoose.Schema({
  entryPoint: {
    type: String,
    required: true,
  },
  exitPoint: {
    type: String,
  },
  numberPlate: {
    type: String,
    required: true,
  },
  entryTime: {
    type: Date,
  },
  exitTime: {
    type: Date,
  },

  totalCost: {
    type: Number,
  },
});
//Created Tolls Model
export default mongoose.model("tolls", tolls);
