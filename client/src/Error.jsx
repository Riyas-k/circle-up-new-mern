import React from "react";
import { Link } from "react-router-dom";
import "./Error.css";

function Error() {
  const errorImageUrl =
    "https://img.freepik.com/free-vector/404-error-lost-space-concept-illustration_114360-7891.jpg?w=740&t=st=1686674003~exp=1686674603~hmac=7c480e0660deb95c4e07c9acb9d0a835d636ab2ec0b38acfadb9d01f79ed50de"; // Replace with your image URL

  return (
    <main className="main page-404">
      <div className="container">
        <div className="row align-items-center height-100vh text-center">
          <div className="col-lg-8 m-auto">
            <p className="mb-50">
              <img
                src={errorImageUrl}
                alt="Error"
                className="error-image hover-up"
              />
            </p>
            <h2 className="mb-30">Page Not Found</h2>
            <p className="font-lg text-grey-700 mb-30">
              The link you clicked may be broken or the page may have been
              removed.
              <br /> Visit the <a href="/">Homepage</a> or{" "}
              <a href="/contact">Contact us</a> about the problem.
            </p>
            <form
              className="contact-form-style text-center"
              id="contact-form"
              action="#"
              method="post"
            >
              <Link
                className="btn btn-default submit-auto-width font-xs hover-up"
                to="/"
              >
                Back To Home Page
              </Link>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Error;
