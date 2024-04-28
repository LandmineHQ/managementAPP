import database from "@database";

function rebuildDatabase() {
  database.syncDatabase({ force: true });
}

export default { rebuildDatabase };
