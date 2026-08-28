import { PGlite } from '@electric-sql/pglite';
import fs from 'fs';

const userInput = `Ford`;

(async () => {
  const db = new PGlite();

  // Set up the database
  const databaseSetup = fs.readFileSync('database-setup.sql', 'utf8');
  const seedData = fs.readFileSync('seed-data.sql', 'utf8');
  await db.exec(databaseSetup);
  await db.exec(seedData);

  // Load the SQL query file
  let query = fs.readFileSync('query.sql', 'utf8');

  // Replace placeholder with user input
  // query = query.replace('<<BRAND>>', userInput);


  // Run the query from the query file
  const response = await db.query(query, [userInput]);

  console.clear();
  console.table(response.rows);
})();
