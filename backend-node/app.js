const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const protectedRoute = require('./routes/protectedRoute');
const api = require('./routes/api');
const cors = require('cors');
// const bodyParser = require('body-parser');

// Configure CORS middleware with options
const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your Vue.js app's origin
    optionsSuccessStatus: 200, // Some legacy browsers choke on 204
}

// Apply CORS middleware to all routes (or specific routes as needed)
app.use(cors(corsOptions));

app.use(express.json());
// app.use(express.urlencoded({extended: true})); 
app.use('/api/auth', authRoutes);
app.use('/api', protectedRoute);
const PORT = 5000;
const HOST = "192.168.1.110";
app.listen(PORT, HOST, function () {
    console.log(`Listening on port ${PORT}`);
    console.log(`http://${HOST}:${PORT}`);
});

