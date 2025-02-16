// Handles User Registration 

// loginServer.js
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

// Create an Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON data
app.use(bodyParser.json());

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost', // Your MySQL host
  user: 'root', // Your MySQL username
  password: 'Alaska2024!!', // Your MySQL password
  database: 'user_info', // The database you want to use
});

// Connect to MySQL database
connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL!');
});

// Handle user registration
app.post('/register', (req, res) => {
  const { firstName, lastName, city, state, email, password } = req.body;

  if (!firstName || !lastName || !city || !state || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Insert the user data into the database
  const query = 'INSERT INTO users (firstName, lastName, city, state, email, password) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(query, [firstName, lastName, city, state, email, password], (err, results) => {
    if (err) {
      console.error('Error inserting user:', err);
      return res.status(500).json({ error: 'An error occurred while creating the account' });
    }
    res.status(201).json({ message: 'Account created successfully' });
  });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
