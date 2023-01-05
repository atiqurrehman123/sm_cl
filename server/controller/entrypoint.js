import tolls from "../models/tolls.js";

const entrypoint = async (req, res) => {
  // Extract the required information from the request body
  const { entryPoint, numberPlate, entryTime } = req.body;
  if (!entryPoint || !numberPlate || !entryTime) {
    res.status(403).json("Plz fill all fields");
  }
  // Insert the toll information into the database
  const tollCalculation = await new tolls({
    numberPlate,
    entryPoint,
    entryTime,
  });
  await tollCalculation.save();

  res.status(200).send(tollCalculation);
};
export { entrypoint };
