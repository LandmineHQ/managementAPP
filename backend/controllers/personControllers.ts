import Person from "@models/Person";

async function getAllPeople() {
  const people = await Person.findAll();
  return people;
}

export default {
  getAllPeople,
};
