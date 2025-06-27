const express = require('express');
const router = express.Router();

// Example: Get current user (protected route)
router.get('/me', (req, res) => {
  // In a real app, you'd use authentication middleware
  res.json({ message: 'User route working!' });
});

module.exports = router;
