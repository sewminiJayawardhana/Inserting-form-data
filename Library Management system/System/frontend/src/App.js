import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import UpdateStatus from "./components/UpdateStatus";
import "./App.css";

const App = () => {
    return (
        <Router>
            <div>
            <header className="app-header">
            <h1 className="header-title">E-book System</h1>
                <nav>
                    <Link to="/">View Books</Link> | 
                    <Link to="/add">Add Book</Link> | 
                    <Link to="/update">Update Status</Link>
                </nav>
            </header>
                <Routes>
                    <Route path="/" element={<BookList />} />
                    <Route path="/add" element={<AddBook />} />
                    <Route path="/update" element={<UpdateStatus />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

