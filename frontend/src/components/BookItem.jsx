import { useState, useEffect } from "react";
import axios from 'axios';


export default function BookItem (props) {
  const { book } = props;
  const [bookItem, setBookItem] = useState([]);

  // useEffect(()=> {
  //   axios.get()
  //     .then( res => )
  //     .catch(err => console.log(err))
  // })


  return (
    <div> {book.title.rendered} {book.excerpt.rendered}</div>

  )
}