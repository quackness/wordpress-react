import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


export default function BookItem(props) {
  const { book, setBooks, books } = props;


  const [author, setAuthor] = useState([]);
  const [image, setImage] = useState("");

    const config = {
    headers:{
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.REACT_APP_AUTHORIZATION}`,
    }
  };


  function deleteBook(id) {
    console.log("Click")
    return axios.delete(`/wp-json/wp/v2/books/${book.id}`, config)
        .then(res => {
        setBooks(books.filter(book => book.id !== id));
        console.log("book deleted id", id);
      })
    };

    
  useEffect(() => {
    axios.get(`/wp-json/wp/v2/users/${author}`).then(function (res) {
      setAuthor([...res.data[0].name]);
      console.log("author res", res.data);
    });
    axios
      .get(`/wp-json/wp/v2/media/${book.featured_media}`, config)
      .then(function (res) {
        console.log("media res", res);
        setImage(res.data.source_url);
      });
      
  }, []);

  return (
    <>
        <small>
          Review by: <strong>{author}</strong>{" "}
        </small>
        <Link to={`/book/${book.id}`}> Read review </Link>
        <hr />
        <div className="bookBox">
        <img src={image}></img>
        <div dangerouslySetInnerHTML={{ __html: book.excerpt.rendered }} />
        <button type="button" className="btn btn-danger" onClick={()=> deleteBook(book.id)}>Delete a book</button>
      </div>
    </>
  );
}
