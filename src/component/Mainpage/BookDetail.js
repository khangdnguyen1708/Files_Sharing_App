import React from "react";
import { useLocation } from "react-router-dom";
import { FaStar } from "react-icons/fa";

function BookDetail(props) {
  const location = useLocation();
  const book = location.state;

  return (
    <div className="container pt-5">
      <div className="d-flex justify-content-center mb-5">
        <div class="col-md-12">
          <div className="row">
            <div className="col-md-4">
              <img
                src={book.image}
                className="img-fluid mx-auto d-block "
                alt="file_thumbnail"
              />
            </div>
            <div className="col-md-8">
              <ul class="list-group list-group-flush">
                <h3>{book.name}</h3>
                <h5>{book.author}</h5>
                <p>{book.description}</p>
                <span className="mb-3">${book.price}</span>
                <span className="mb-5">{book.category}</span>
                <a href={book.image}>
                  <input type="button" className="btn btn-warning btn-lg btn-block col-6" value='Download' target="_blank"/>
                </a>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
