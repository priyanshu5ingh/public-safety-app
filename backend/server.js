const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.log(err));

const crimeReportsRouter = require('./routes/crime');
app.use('/reports', crimeReportsRouter);

const authRouter = require('./routes/auth'); // Import auth routes
app.use('/auth', authRouter); // Mount auth routes at /auth

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});