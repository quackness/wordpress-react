import axios from 'axios';
import { useEffect, useState } from "react";
import { useParams } from 'react-router';
//for the Router to pass params from the link to the component 


export default function BookPage (props) {
const { id  } = useParams();

  const [bookPage, setBookPage] = useState({
    title: {rendered:'Loading'}
  });

  // console.log(bookPage.title.rendered)

  useEffect(() => {
    axios.get(`/wp-json/wp/v2/books/${id}`)
      .then(function(res) {
        console.log("res", res)
        setBookPage(res.data)
        // setLoaded(true)
      })
      .catch((err) => console.log(err));
  }, []);

  // if (!loaded) {
  //   return (<>loading...</>)
  // }
  return (
    <div> 
      {bookPage.title.rendered} 
    </div>
  )
}