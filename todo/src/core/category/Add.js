import "./Category.scss";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import { isAuthenticated } from "../../auth";
import { create } from "./apiCategory";

const Add = () => {

  //category data is just the name
  const [values, setValues] = useState({
    name: "",
    success: false,
    error: false,
  });

  const { name, error, success } = values;

  //get user and the toke to do a request after
  const { user, token } = isAuthenticated();

  //handlechange changin the sate after the user write somthing
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();

    //do not do a request if the name is empty
    if (name.trim() === "") {
      alert("category required");
      return;
    }

    setValues({ ...values, error: false });
    create({ userId: user.id, token, name }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          error: "",
          success: true,
        });
      }
    });
  };

  //form
  const categoryForm = () => (
    <form>
      <div className="from-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          value={name}
          onChange={handleChange("name")}
          className="form-control mb-2"
          placeholder="name"
        />
      </div>

      <button onClick={clickSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  //if success  redirect to home
  const showSuccess = () => success && <Redirect to="/" />;

  return (
    <div className="jumbotron">
      <div className="container">
        <div className="row">
          <div className="col-6 offset-3">
            <div className="cattegory-form">
              <h1>Create Category</h1>
              {showSuccess()}
              {showError()}
              {categoryForm()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
