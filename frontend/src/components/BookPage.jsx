import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
//for the Router to pass params from the link to the component

export default function BookPage(props) {
  const { id } = useParams();

  const [bookPage, setBookPage] = useState({
    // title: { rendered: "Loading" },
    // acf: { publisher: "Loading" },
    // content: { rendered: "Loading" },
  });
  const [loaded, setLoaded] = useState("");

  // console.log(bookPage.title.rendered)

  useEffect(() => {
    axios
      .get(`/wp-json/wp/v2/books/${id}`)
      .then(function (res) {
        console.log("res", res);
        setBookPage(res.data);
        setLoaded(true);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!loaded) {
    return <>Loading...</>;
  }
  return (
    <>
      <Link to={"/"}> Go back </Link>
      <hr></hr>
      <h1>{bookPage.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: bookPage.content.rendered }} />
      <h4>Publisher: {bookPage.acf.publisher}</h4>
      {console.log(bookPage.acf.publisher)}
    </>
  );
}
