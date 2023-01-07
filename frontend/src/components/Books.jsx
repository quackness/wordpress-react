import { useState, useEffect } from "react";
import axios from "axios";
import BookItem from "./BookItem";
import AddBook from "./AddBook";

export default function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get(`/wp-json/wp/v2/books`)
      .then(function (res) {
        setBooks([...res.data]);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(books);
  return (
    <div>
       <AddBook />
      {books.map((book) => (
        <BookItem key={book.id} book={book} setBooks={setBooks} books={books}/>
      ))}
    </div>
  );
}
