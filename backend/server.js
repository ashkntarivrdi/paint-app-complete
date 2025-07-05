const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // For cross-origin requests during development

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const users = {
    'user1': { id: 'user1', username: 'user1', password_hash: 'hashed_password_for_user1' },
    'user2': { id: 'user2', username: 'user2', password_hash: 'hashed_password_for_user2' },
    'user3': { id: 'user3', username: 'user3', password_hash: 'hashed_password_for_user3' }
};


// Middleware for basic "authentication"
const authenticateUser = (req, res, next) => {
    req.userId = 'user2'; // Hardcode for now as per simplicity requirement 
    next();
};

const db = require('./src/db/setup'); // Import the database

// REST endpoint to save a drawing
app.post('/api/drawings', authenticateUser, (req, res) => {
    const userId = req.userId;
    const { title, shapes } = req.body;

    if (!title || !shapes) {
        return res.status(400).json({ message: 'Title and shapes are required.' });
    }

    const shapesString = JSON.stringify(shapes); // Convert shapes to a string for storage

    db.run(
        `INSERT INTO drawings (user_id, title, shapes) VALUES (?, ?, ?)
        ON CONFLICT(user_id) DO UPDATE SET title = excluded.title, shapes = excluded.shapes`,
        [userId, title, shapesString],
        (err) => {
            if (err) {
                console.error('Error saving drawing:', err.message);
                return res.status(500).json({ message: 'Failed to save drawing.' });
            }
            console.log(`Drawing saved for user ${userId}:`, { title, shapes });
            res.status(200).json({ message: 'Drawing saved successfully!' });
        }
    );
});

// REST endpoint to load a drawing
app.get('/api/drawings', authenticateUser, (req, res) => {
    const userId = req.userId;

    db.get(
        `SELECT title, shapes FROM drawings WHERE user_id = ?`,
        [userId],
        (err, row) => {
            if (err) {
                console.error('Error loading drawing:', err.message);
                return res.status(500).json({ message: 'Failed to load drawing.' });
            }
            if (row) {
                const shapes = JSON.parse(row.shapes); // Convert shapes back to JSON
                res.status(200).json({ title: row.title, shapes });
            } else {
                res.status(404).json({ message: 'No drawing found for this user.' });
            }
        }
    );
});

app.get('/api/user', authenticateUser, (req, res) => {
    const userId = req.userId;
    const user = users[userId];
    if (user) {
        res.status(200).json({ username: user.username });
    } else {
        res.status(404).json({ message: 'User not found.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});