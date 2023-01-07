import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
// import DeleteBook from "./DeleteBook";
// import Books from "./Books";

export default function BookItem(props) {
  const { book, setBooks, books } = props;
  // console.log("test", book.featured_media)

  const [author, setAuthor] = useState([]);
  const [image, setImage] = useState("");

    const config = {
    headers:{
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.REACT_APP_AUTHORIZATION}`,
      // "Authorization": process.env.AUTHORIZATION
    }
  };

  console.log(process.env)

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
      .get(`/wp-json/wp/v2/media/${book.featured_media}`)
      .then(function (res) {
        console.log("media res", res);
        // console.log(image)
        setImage(res.data.media_details.sizes.large.source_url);
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
        <button type="button" class="btn btn-danger" onClick={()=> deleteBook(book.id)}>Delete a book</button>
      </div>
    </>
  );
}
