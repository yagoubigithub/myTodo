import "./Signin.scss"
import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import { signin, authenticate, isAuthenticated } from "../../auth";

const Signin = () => {
  //user credential
  const [values, setValues] = useState({
    email: "",
    password: "",
    loading: false,
    error: false,
    redirectToReferrer: false,
  });

  const { email, password, error, loading, redirectToReferrer } = values;
 

  //change the sate after user type somthing
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };


  //submit the form
  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });

    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        //after user success signin store jwt to local storage
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true,
          });
        });
      }
    });
  };

  //the signin form 
  const signInForm = () => (
    <form >
      <div className="from-group">
        <label className="text-muted">Email</label>
        <input
          type="email"
          value={email}
          onChange={handleChange("email")}
          className="form-control"
          placeholder="email"
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

  

  const redirectUser = () => {
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };
  return (
    <div className="jumbotron">
      <div className="container">
        <div className="row">
          <div className="col-6 offset-3">
          <div className="signin">
  <h1>Log-In</h1>
           
            {showError()}
            {signInForm()}
            {redirectUser()}
          </div>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
