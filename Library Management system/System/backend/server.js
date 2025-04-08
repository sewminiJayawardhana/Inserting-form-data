require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL");
    }
});

// Get all books
app.get("/books", (req, res) => {
    db.query("SELECT * FROM books", (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

// Add a new book
app.post("/books", (req, res) => {
    const { title, author } = req.body;
    db.query("INSERT INTO books (title, author) VALUES (?, ?)", [title, author], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Book added successfully", bookId: result.insertId });
    });
});

// Update book status (borrowed/returned)
app.put("/books/:id", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    db.query("UPDATE books SET status = ? WHERE id = ?", [status, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Book status updated successfully" });
    });
});

// Delete a book
app.delete("/books/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM books WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Book deleted successfully" });
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
