import { promises } from "fs";
import faker from "faker";

import { query, end } from "./lib/db.js";

const SCHEMAFILE = "./sql/schema.sql";
const DROPFILE = "./sql/drop.sql";
const INSERT = "./sql/insert.sql";

function createFakeData(n) {
  const fake = [];

  while (fake.length < n) {
    const randomPastDate = new Date();
    randomPastDate.setDate(randomPastDate.getDate() - 30);

    let name = faker.name.findName();
    fake.push({
      name: name,
      slug: name.replaceAll(" ", "-"),
      description: faker.lorem.sentence(),
      created: randomPastDate,
      modified: faker.date.between(randomPastDate, new Date()),
    });
  }

  return fake;
}

async function create() {
  const dropData = await promises.readFile(DROPFILE);
  await query(dropData.toString("utf-8"));

  const schemeData = await promises.readFile(SCHEMAFILE);
  await query(schemeData.toString("utf-8"));

  const insertData = await promises.readFile(INSERT);
  await query(insertData.toString('utf-8'))

  const fakes = createFakeData(1);

  for (let i = 0; i < fakes.length; i += 1) {
    const fake = fakes[i];

    try {
      // eslint-disable-next-line no-await-in-loop
      await query(
        `
            INSERT INTO
              events (name, slug, description, created, modified)
            VALUES
              ($1, $2, $3, $4, $5)`,
        [fake.name, fake.slug, fake.description, fake.created, fake.modified]
      );
    } catch (e) {
      console.error("Error inserting", e);
      return;
    }
  }

  try {
    
  } catch (error) {
    
  }

  await end();

  console.info("Schema & fake data created");
}

create().catch((err) => {
  console.error("Error creating schema", err);
});
