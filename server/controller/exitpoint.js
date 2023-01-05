import tolls from "../models/tolls.js";
import { getDistance } from "../utils/utils.js";
import moment from "moment";
const exitPoint= async (req, res) => {
    // Extract the required information from the request body
    const { exitPoint, numberPlate, exitTime } = req.body;
    // Find the toll information for the vehicle in the database
    try {
      const toll = await tolls.findOne({ numberPlate: numberPlate });
  
      if (toll) {
        // Calculate the total cost of the toll based on the rules
  
        let totalCost = 20; // base rate
        const distance = getDistance(toll.entryPoint, exitPoint);
        totalCost += distance * 0.2; // distance rate
        if (moment(exitTime).day() === 0 || moment(exitTime).day() === 6) {
          totalCost *= 1.5; // weekend rate
        }
  
        if (
          (moment(toll.entryTime).day() === 1 ||
            moment(toll.entryTime).day() === 3) &&
          toll.numberPlate % 2 === 0
        ) {
          totalCost *= 0.9; // Mon/Wed even number plate discount
        }
  
        if (
          (moment(toll.entryTime).day() === 2 ||
            moment(toll.entryTime).day() === 4) &&
          toll.numberPlate % 2 === 1
        ) {
          totalCost *= 0.9; // Tues/Thurs odd number plate discount
        }
  
        if (
          moment(exitTime).isSame(moment("23-03-2022"), "day") ||
          moment(exitTime).isSame(moment("14-08-2022"), "day") ||
          moment(exitTime).isSame(moment("25-12-2022"), "day")
        ) {
          totalCost *= 0.5; // national holiday discount
        }
        await tolls.findOneAndUpdate(
          { numberPlate },
          {
            $set: {
              exitPoint,
              exitTime,
              totalCost,
            },
          }
        );
        // Return the total cost to the frontend
        res.status(201).send({ totalCost,exitPoint,exitTime });
      } else {
        res.status(403).send("Number Plate does not exist in our records");
      }
    } catch (err) {
      res.status(403).send(err);
    }
  }
  export {exitPoint}