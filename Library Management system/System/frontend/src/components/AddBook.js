import React, { useState } from "react";
import axios from "axios";

const AddBook = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/books", { title, author })
            .then(() => alert("Book added successfully!"))
            .catch(error => console.log(error));
    };

    return (
        <div className="add-book-container">
            <h2>Add New Book</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Book Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                <button type="submit">Add Book</button>
            </form>
        </div>
    );
};

export default AddBook;
