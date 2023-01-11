import {useState} from 'react';
import axios from 'axios';

export default function AddBook(props) {
  const { books } = props;

  const [image, setImage ] = useState([])

  const onSubmitForm = function(e){
    e.preventDefault();
    // const image = {
    //   image
    // };
    addImage(image);
  }

  function addImage(image){
    console.log(image)
    return axios.post(`http://localhost/wordpress/wp-json/wp/v2/media`, image)
    .then((response) => {
      const newImage = response.data
      setImage(newImage)
    })
  }
  

  return (
    <>
      <button
        type="button"
        className="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target="#addBook"
      >
        Add a book
      </button>

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
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Add a new book
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="image" class="form-label">
                    Image
                  </label>
                  <input type="file" class="form-control" id="file" value={image} onChange={ e => setImage(e.target.value)}/>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary" onClick={onSubmitForm}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
