// filepath: c:\Users\priya\Downloads\IDEASHROOMS-NammaSuraksha\index.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const crimeRoutes = require('./backend/routes/crime'); // Adjusted path

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/yourDatabaseName', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
});

// Middleware
app.use(express.json());

// Routes
app.use('/api/crime', crimeRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
