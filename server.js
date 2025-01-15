const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for cross-origin requests

// MySQL Connection
const db = mysql.createConnection({
    host: '127.0.0.1',
    port: 3310,
    user: 'root',
    password: 'or02r5780',
    database: 'user_database',
});

db.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Sign Up Endpoint
app.post('/signup', async (req, res) => {
    const { aadhar, username, email, phone, password } = req.body;

    if (!aadhar || !username || !email || !phone || !password) {
        return res.status(400).json({ message: 'All fields are required!' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query =
            'INSERT INTO users (aadhar, username, email, phone, password) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [aadhar, username, email, phone, hashedPassword], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ message: 'User already exists!' });
                }
                console.error(err);
                return res.status(500).json({ message: 'Database error' });
            }
            res.status(200).json({ message: 'Sign up successful! Please sign in.' });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Sign In Endpoint
app.post('/signin', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], async (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Database error' });
        }
        if (results.length === 0) {
            return res.status(400).json({ message: 'User not found' });
        }

        const user = results[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful!' });
    });
});

// Join Us Endpoint
app.post('/join-us', async (req, res) => {
    const { fullName, email, phone, address, dob, aadhar, skills, previousEmployment, highestEducation, experience } = req.body;

    if (!fullName || !email || !phone || !address || !dob || !aadhar || !skills || !previousEmployment || !highestEducation || !experience) {
        return res.status(400).json({ message: 'All fields are required!' });
    }

    const query = `
        INSERT INTO captains (full_name, email, phone_number, address, date_of_birth, aadhar_number
, skills, previous_employment, highest_education, experience_years)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(query, [fullName, email, phone, address, dob, aadhar, skills, previousEmployment, highestEducation, experience], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Database error' });
        }
        res.status(200).json({ message: 'Join us details submitted successfully!' });
    });
});


// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
