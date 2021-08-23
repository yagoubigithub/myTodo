import "./Category.scss";
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import { isAuthenticated } from "../../auth";
import { update, getCategory } from "./apiCategory";

const Update = ({ match }) => {

  const [values, setValues] = useState({
    id: 0,
    name: "",
    success: false,
    error: false,
  });

  //category data
  const { id, name, error, success } = values;

  //auth
  const { user, token } = isAuthenticated();

  //change the state after user type
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();

    setValues({ ...values, error: false });
    update({ userId: user.id, token, category: { id, name } }).then((data) => {
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


  //get all categories after the component mount

  const init = (categoryId) => {
    getCategory(categoryId, user.id, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        console.log(data);
        setValues({
          ...data,
        });
      }
    });
  };

  useEffect(() => {
   

    init(match.params.categoryId);
  }, []);


  //my form
  const categoryForm = () => (
    <form>
      <div className="from-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          value={name}
          onChange={handleChange("name")}
          className="form-control mb-2"
        />
      </div>

      <button onClick={clickSubmit} className="btn btn-primary ">
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

  const showSuccess = () => success && <Redirect to="/" />;

  return (
    <div className="jumbotron">
      <div className="container">
        <div className="row">
          <div className="col-6 offset-3">
            <div className="cattegory-form">
              <h1>Update Category</h1>
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

export default Update;
