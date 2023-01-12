import { useState } from "react";
import axios from "axios";

export default function AddBook(props) {
  const { books, setBooks } = props;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [image, setImage] = useState([]);


  const headerConfig = {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_AUTHORIZATION}`,
    },
  };

  console.log("image", image);

  const onSubmitForm = function (e) {
    e.preventDefault();
    console.log(e.currentTarget);
    const file = e.currentTarget["file"].files[0];
    console.log("file", file);

    const formData = new FormData();
    formData.append("file", file);
    console.log("formData", formData);

    console.log(image);
    console.log(title);
    axios
      .post(
        `/wp-json/wp/v2/media`,
        formData,
        headerConfig
      )
      .then((response) => {
        const newImage = response.data;
        console.log("newImage", newImage);
        //setImage(newImage.id)
        //updatte book data with image id
        //post ot server book data
        //handle response from adding book

        const book = {
          title,
          content,
          excerpt,
          featured_media: newImage.id,
          status: "publish",
        };
        return axios
          .post(
            `/wp-json/wp/v2/books`,
            book,
            headerConfig
          )
          .then((response) => {
            const newBook = response.data;
            console.log("newBook", newBook);
            const newElement = [newBook, ...books];
            setBooks(newElement);
            // setBooks((oldState) => {
            //   return oldState.unshift(newBook);
            // });
          });
      });
    setTitle("");
    setContent("");
    setExcerpt("");

  };

  return (
    <>
    <div className="addBookButton">
      <button
        type="button"
        className="btn btn-success col-6"
        data-bs-toggle="modal"
        data-bs-target="#addBook"
      >
        Add a book
      </button>
      </div>

      <div
        class="modal fade"
        id="addBook"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel" >
                Add a new book
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={onSubmitForm}>
              <div class="modal-body">
                <div class="mb-3">
                  <label for="title" class="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />

                  <label for="content" class="form-label">
                    Content
                  </label>

                  <input
                    type="text"
                    class="form-control"
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />

                  <label for="excerpt" class="form-label">
                    Excerpt
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="excerpt"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                  />

                  <label for="image" class="form-label">
                    Image
                  </label>
                  <input type="file" class="form-control" id="file" />
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">
                  Add a book
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
