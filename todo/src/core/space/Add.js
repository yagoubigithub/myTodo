import "./Space.scss";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import { isAuthenticated } from "../../auth";
import { create } from "./apiSpace";

const Add = () => {
  //space  data name and date
  const [values, setValues] = useState({
    name: "",
    date : new Date().toISOString().split("T")[0],
    success: false,
    error: false,
  });

  const { name,date, error, success } = values;

  //get user and the toke to do a request after
  const { user, token } = isAuthenticated();

  //handlechange changin the sate after the user write somthing
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };



//handle submit the form
  const clickSubmit = (event) => {
    event.preventDefault();
  
   
    setValues({ ...values, error: false });

    //call create method to do a request
    create({ userId: user.id, token, space :  {name,date} }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          date :  "",
          name: "",
          error: "",
          success: true,
        });
      }
    });
  };

  //category form to add new one
  const categoryForm = () => (
    <form>
      <div className="from-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          value={name}
          onChange={handleChange("name")}
          className="form-control mb-2"
          placeholder="name.."
        />
      </div>
      <div className="from-group">
        <label className="text-muted">Date</label>
        <input
          type="date"
          value={date}
          onChange={handleChange("date")}
          className="form-control mb-2"
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

  const showSuccess = () => success && <Redirect to="/" />;

  return (
    <div className="jumbotron">
    <div className="container">
      <div className="row">
        <div className="col-6 offset-3">
        <div className="space-form">
      <h1>Create Space</h1>
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
