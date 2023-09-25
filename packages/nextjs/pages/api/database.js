// pages/api/database.js

import fs from 'fs';
import path from 'path';

export default (req, res) => {
  const dbPath = path.join(process.cwd(), 'data', 'database.json');

  if (req.method === 'GET') {
    // Read the JSON file and send it as a response
    const data = fs.readFileSync(dbPath, 'utf-8');
    res.json(JSON.parse(data));
  } else if (req.method === 'POST') {
    // Example: Write to the JSON file
    fs.writeFileSync(dbPath, JSON.stringify(req.body), 'utf-8');
    res.json({ message: 'Data written to the database' });
  }
};

