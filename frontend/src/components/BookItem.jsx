import axios from 'axios';
import { useEffect, useState } from 'react';


export default function BookItem (props) {
  const { book } = props;
  // console.log("test", book.featured_media)

  const [author, setAuthor] = useState([]);
  const [image, setImage] = useState("");

 useEffect(() => {
      axios.get(`/wp-json/wp/v2/users/${author}`)
      .then(function (res) {
        setAuthor([...res.data[0].name])
        console.log("author res", res.data)
      })
      axios.get(`/wp-json/wp/v2/media/${book.featured_media}`)
      .then(function(res) {
        console.log("media res", res)
        // console.log(image)
        setImage(res.data.media_details.sizes.large.source_url)
      })
  }, []);



  return (
    <>
    <small>Review by: <strong>{author}</strong> </small>
    <img src={image}></img>
   
    <div dangerouslySetInnerHTML={{__html: book.excerpt.rendered}}/> 
    </>
  )
}