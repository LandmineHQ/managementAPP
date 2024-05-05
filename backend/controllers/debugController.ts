import database from "@database";
import initSeeds, { testSeeds as databaseTestSeeds } from "@database/seeds";

async function rebuildDatabase() {
  await database.syncDatabase({ force: true });
  await initSeeds();
}

async function testSeeds() {
  await databaseTestSeeds();
}

export default { rebuildDatabase, testSeeds };
