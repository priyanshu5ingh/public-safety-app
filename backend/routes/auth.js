const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
const multer = require('multer');
const path = require('path');

// Set up multer for photo uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Registration route
router.post('/register', async (req, res) => {
  const { email, username, password, name, phone } = req.body;

  // Validate required fields
  if (!email || !username || !password || !name) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all required fields: email, username, password, and name'
    });
  }

  try {
    // Check if email already exists
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, row) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({
          success: false,
          message: 'Registration failed. Please try again.'
        });
      }

      if (row) {
        return res.status(400).json({
          success: false,
          message: 'Email already registered'
        });
      }

      // Check if username already exists
      db.get('SELECT * FROM users WHERE username = ?', [username], async (err, row) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({
            success: false,
            message: 'Registration failed. Please try again.'
          });
        }

        if (row) {
          return res.status(400).json({
            success: false,
            message: 'Username already taken'
          });
        }

        try {
          // Hash password
          const hashedPassword = await bcrypt.hash(password, 10);

          // Insert new user
          db.run(
            'INSERT INTO users (email, username, password, name, phone) VALUES (?, ?, ?, ?, ?)',
            [email, username, hashedPassword, name, phone || null],
            function(err) {
              if (err) {
                console.error('Database error:', err);
                return res.status(500).json({
                  success: false,
                  message: 'Registration failed. Please try again.'
                });
              }

              res.json({
                success: true,
                message: 'Registration successful'
              });
            }
          );
        } catch (error) {
          console.error('Registration error:', error);
          res.status(500).json({
            success: false,
            message: 'Registration failed. Please try again.'
          });
        }
      });
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed. Please try again.'
    });
  }
});

// Login route
router.post('/login', (req, res) => {
  const { emailOrUsername, password } = req.body;

  if (!emailOrUsername || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide both email/username and password'
    });
  }

  // Check if user exists by email or username
  db.get(
    'SELECT * FROM users WHERE email = ? OR username = ?',
    [emailOrUsername, emailOrUsername],
    async (err, user) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({
          success: false,
          message: 'Login failed. Please try again.'
        });
      }

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'User not found. Please register first.'
        });
      }

      try {
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
          return res.status(401).json({
            success: false,
            message: 'Invalid password'
          });
        }

        // Send user data (excluding password)
        const { password: _, ...userData } = user;
        res.json({
          success: true,
          message: 'Login successful',
          user: userData
        });
      } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
          success: false,
          message: 'Login failed. Please try again.'
        });
      }
    }
  );
});

// TEMPORARY: List all users (for debugging only)
router.get('/all-users', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(rows);
  });
});

// Add to backend/routes/auth.js (for debugging only)

module.exports = router;