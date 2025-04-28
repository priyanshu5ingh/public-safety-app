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

// User Registration
router.post('/register', upload.single('photo'), async (req, res) => {
  try {
    const { username, password, name, email, phone } = req.body;
    const photo = req.file ? req.file.filename : null;
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (username, password, name, email, phone, photo) VALUES (?, ?, ?, ?, ?, ?)';
    db.run(sql, [username, hashedPassword, name, email, phone, photo], function(err) {
      if (err) {
        if (err.message.includes('UNIQUE')) {
          return res.status(400).json({ message: 'Username or email already exists' });
        }
        return res.status(500).json({ message: 'Error registering user', error: err.message });
      }
      res.status(201).json({ message: 'User created successfully' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});

// User Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    db.get('SELECT * FROM users WHERE username = ? OR email = ?', [username, username], async (err, user) => {
      if (err) return res.status(500).json({ message: 'Error logging in', error: err.message });
      if (!user) return res.status(401).json({ message: 'Invalid username or password' });
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return res.status(401).json({ message: 'Invalid username or password' });
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET || 'your_jwt_secret',
        { expiresIn: '1h' }
      );
      res.json({ message: 'Login successful', token });
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
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