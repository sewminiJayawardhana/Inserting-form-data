import React, { useEffect, useState } from "react";
import axios from "axios";

const BookList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/books")
            .then(response => setBooks(response.data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="view-book-container">
            <h2>Library Books</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td style={{ color: book.status === "borrowed" ? "red" : "green" }}>
                                {book.status}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookList;
