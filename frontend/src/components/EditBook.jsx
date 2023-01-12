import axios from "axios";
import { useState } from "react";

export default function EditBook(props) {
  const { book, setBooks, books } = props;
  console.log("id of the book", book.id);
  console.log("book", book);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");

  const headerConfig = {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_AUTHORIZATION}`,
    },
  };

  function onSubmitEditForm(e) {
    e.preventDefault();
    console.log(e.currentTarget);
    const bookData = {
      title: title,
      content: content,
      excerpt: excerpt,
      // featured_media: newImage.id,
      status: "publish",
    };
    return axios
      .post(`/wp-json/wp/v2/books/${book.id}`, bookData, headerConfig)
      .then((response) => {
        const editedBook = response.data;
        const newElement = [editedBook, ...books];
        setBooks(newElement);
      });
  }

  return (
    <>
      <div>
        <button
          type="button"
          class="btn btn-warning"
          data-bs-toggle="modal"
          data-bs-target={`#editBook${book.id}`}
        >
          Edit a book
        </button>
      </div>

      <div
        class="modal fade"
        id={`editBook${book.id}`}
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Edit book
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={onSubmitEditForm}>
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

                  {/* <label for="image" class="form-label">
                    Image
                  </label>
                  <input type="file" class="form-control" id="file" /> */}
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
                <button type="submit" class="btn btn-primary">
                  Edit a book
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
