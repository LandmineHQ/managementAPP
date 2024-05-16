import Training from "@models/Training";

async function getAllTrainings() {
  const data = await Training.findAll();
  return data;
}

export default {
  /* methods */
  getAllTrainings,
};
