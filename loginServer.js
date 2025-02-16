const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs'); // For password hashing
const { check, validationResult } = require('express-validator'); // For validation

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for local development
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Alaska2024!!',
  database: 'user_info',
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL!');
});

// ✅ REGISTER USER
app.post(
  '/register',
  [
    check('firstName').notEmpty().withMessage('First name is required'),
    check('lastName').notEmpty().withMessage('Last name is required'),
    check('city').notEmpty().withMessage('City is required'),
    check('state').notEmpty().withMessage('State is required'),
    check('email').isEmail().withMessage('Invalid email'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, city, state, email, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      connection.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
          console.error('Error checking email:', err);
          return res.status(500).json({ error: 'Server error' });
        }

        if (results.length > 0) {
          return res.status(400).json({ error: 'Email is already in use' });
        }

        const query = 'INSERT INTO users (firstName, lastName, city, state, email, password) VALUES (?, ?, ?, ?, ?, ?)';
        connection.query(query, [firstName, lastName, city, state, email, hashedPassword], (err, results) => {
          if (err) {
            console.error('Error inserting user:', err);
            return res.status(500).json({ error: 'Account creation failed' });
          }
          res.status(201).json({ message: 'Account created successfully' });
        });
      });
    } catch (error) {
      console.error('Error hashing password:', error);
      return res.status(500).json({ error: 'Server error' });
    }
  }
);

// ✅ LOGIN USER
app.post(
  '/login',
  [
    check('email').isEmail().withMessage('Invalid email'),
    check('password').notEmpty().withMessage('Password is required'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Check if user exists
    connection.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Server error' });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Compare entered password with hashed password
      const user = results[0];
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      res.json({ message: 'Login successful', user: { email: user.email, firstName: user.firstName, lastName: user.lastName } });
    });
  }
);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
