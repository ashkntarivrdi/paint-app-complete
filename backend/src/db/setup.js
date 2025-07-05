const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Path to the database file
const dbPath = path.resolve(__dirname, 'drawings.db');

// Create or open the database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

// Create the drawings table if it doesn't exist
db.run(`
    CREATE TABLE IF NOT EXISTS drawings (
        user_id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        shapes TEXT NOT NULL
    )
`, (err) => {
    if (err) {
        console.error('Error creating table:', err.message);
    } else {
        console.log('Drawings table initialized.');
    }
});

module.exports = db;