const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database Connection
const db = mysql.createConnection({
    host: "localhost", // Change this if your database is remote
    user: "root", // Your MySQL username
    password: "Sew@1234", // Your MySQL password
    database: "mydatabase", // Your database name
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    console.log("Connected to MySQL Database.");
});

// Handle Form Submission
app.post("/submit", (req, res) => {
    const { name, email, phone } = req.body;
    const sql = "INSERT INTO form_data (name, email, phone) VALUES (?, ?, ?)";

    db.query(sql, [name, email, phone], (err, result) => {
        if (err) {
            res.status(500).send("Error inserting data.");
            return;
        }
        res.send("Data inserted successfully!");
    });
});

// Start Server
app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});
