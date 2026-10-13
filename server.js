
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Load environment variables FIRST
require('dotenv').config();

// Import database AFTER dotenv
const mySqlPool = require('./config/db');

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/student', require('./routes/studentsRoutes'));
app.use('/api/v1/dashboard', require('./routes/dashboardRoutes'));

// Test route
app.get('/test', (req, res) => {
    res.status(200).send('<h1>Welcome</h1>');
});

// Port
const PORT = process.env.PORT || 8000;

// Test database connection and start server
mySqlPool.query('SELECT 1')
    .then(() => {
        console.log('MYSQL DB Connected');

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Database connection failed:', error.message);
    });
