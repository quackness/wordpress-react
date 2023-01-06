import axios from 'axios';
import { useEffect, useState } from "react";
import { useParams } from 'react-router';
//for the Router to pass params from the link to the component 


export default function BookPage (props) {
const { id } = useParams();

  const [bookPage, setBookPage] = useState({});
  // console.log(bookPage.id)

  useEffect(() => {
    axios.get(`/wp-json/wp/v2/books/${id}`)
      .then(function(res) {
        console.log("res", res)
        setBookPage(res.data)
      })
  }, []);

  return (
    <div> {bookPage.id} </div>
  )
}