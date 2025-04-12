const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Import the connectDB function
const connectDB = require('./config/db');

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies


// Sample route
app.get('/', (req, res) => res.send('API is running'));

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start the server
connectDB(); // Call the function to connect to the database

// Start the server after connecting to the database
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use("/api/music", require("./routes/music"));