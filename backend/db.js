const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create or open the database
const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'));

// Create Users table
const userTable = `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    phone TEXT
);`;

// Create CrimeReports table
const crimeTable = `CREATE TABLE IF NOT EXISTS crime_reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    crimeType TEXT NOT NULL,
    description TEXT,
    latitude REAL NOT NULL,
    longitude REAL NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    userId INTEGER,
    FOREIGN KEY(userId) REFERENCES users(id)
);`;

// Drop and recreate tables
db.serialize(() => {
    db.run("DROP TABLE IF EXISTS crime_reports");
    db.run("DROP TABLE IF EXISTS users");
    db.run(userTable);
    db.run(crimeTable);
    console.log('Database tables have been reset and recreated');
});

module.exports = db;