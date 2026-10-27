require('dotenv').config();
const { initTables } = require('../src/db/mysql');
const { seedData } = require('../src/db/seed');

async function main() {
  console.log('--- NIRABI DESIGN STUDIO Database Initialization & Seeding ---');
  try {
    await initTables();
    await seedData();
    console.log('--- Database Initialization & Seeding Succeeded ---');
    process.exit(0);
  } catch (err) {
    console.error('--- Database Initialization Failed ---', err);
    process.exit(1);
  }
}

main();
