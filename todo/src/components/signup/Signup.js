import "./Signup.scss"
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { signup } from "../../auth";

const Signup = () => {
  //user data
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    success: false,
    error: false,
  });

  const { name, email, password, error, success } = values;


  //change sate when user type somthing
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };


  //submit the form
  const clickSubmit = (event) => {
    event.preventDefault();

    setValues({ ...values, error: false });
    signup({ name, email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true,
        });
      }
    });
  };

  //the signup form 
  const signUpForm = () => (
    <form>
      <div className="from-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          value={name}
          onChange={handleChange("name")}
          className="form-control mb-2"
          placeholder="name..."
        />
      </div>

      <div className="from-group">
        <label className="text-muted">Email</label>
        <input
          type="email"
          value={email}
          onChange={handleChange("email")}
          className="form-control mb-2"
          placeholder="Email..."
        />
      </div>

      <div className="from-group">
        <label className="text-muted">Password</label>
        <input
          type="password"
          value={password}
          onChange={handleChange("password")}
          className="form-control mb-2"
          placeholder="password"
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

  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: success ? "" : "none" }}
    >
      New Account is created please <Link to="/signin">Signin</Link>
    </div>
  );
  return (
    <div className="jumbotron">
    <div className="container">
      <div className="row">
        <div className="col-6 offset-3">
        <div className="signup">
        <h1>Sign Up</h1>
          {showSuccess()}
          {showError()}
          {signUpForm()}

        </div>
         
        </div>
      </div>
    </div>
    </div>
  );
};

export default Signup;
