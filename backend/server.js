const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());

const authRouter = require('./routes/auth');
const crimeRouter = require('./routes/crime');
app.use('/auth', authRouter);
app.use('/api/crime', crimeRouter);

app.get('/', (req, res) => {
  res.send('API is running!');
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});