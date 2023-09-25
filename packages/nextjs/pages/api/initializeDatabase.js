// pages/api/initializeDatabase.js

import fs from 'fs';
import path from 'path';

export default (req, res) => {
  const dbPath = path.join(process.cwd(), 'data', 'database.json');

  // Create an empty JSON object
  const emptyDatabase = {};

  // Convert the JSON object to a string
  const jsonString = JSON.stringify(emptyDatabase, null, 2);

  try {
    // Write the JSON string to the file
    fs.writeFileSync(dbPath, jsonString, 'utf-8');
    res.json({ message: 'Database initialized successfully' });
  } catch (error) {
    console.error('Error initializing database:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

