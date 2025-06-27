const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/roadsafety')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

// Routes
const authRouter = require('./routes/auth');
const crimeRouter = require('./routes/crime');
const incidentRoutes = require('./routes/incidents');
const newsRoutes = require('./routes/news');
const userRoutes = require('./routes/users');

app.use('/auth', authRouter);
app.use('/api/crime', crimeRouter);
app.use('/api/incidents', incidentRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('API is running!');
});

// Error handling middleware (should be after routes)
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  // Handle multer errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      message: 'File size too large. Maximum size is 5MB.'
    });
  }
  
  if (err.code === 'INVALID_FILE_TYPE') {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }

  // Handle other errors
  res.status(err.status || 500).json({ 
    success: false,
    message: err.message || 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});