import "./Space.scss";
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import { isAuthenticated } from "../../auth";
import { update, getSpace } from "./apiSpace";

const Update = ({ match }) => {

  const [values, setValues] = useState({
    id: 0,
    date: "",
    name: "",
    success: false,
    error: false,
  });

  const { id, name, date, error, success } = values;

  //get user and the toke to do a request after
  const { user, token } = isAuthenticated();

  //handlechange changin the sate after the user write somthing
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();

    //show error if name is empty
    if (name.trim() === "") {
      alert("name required");
      return;
    }

    setValues({ ...values, error: false });
    //call update request
    update({ userId: user.id, token, space: { id, name, date } }).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            date: "",
            name: "",
            error: "",
            success: true,
          });
        }
      }
    );
  };

  //get one  space using id
  const init = (spaceId) => {
    getSpace(spaceId, user.id, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...data,
          date: data.date.split("T")[0],
        });
      }
    });
  };

  useEffect(() => {
    init(match.params.spaceId);
  }, []);

  const spaceForm = () => (
    <form>
      <div className="from-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          value={name}
          onChange={handleChange("name")}
          className="form-control"
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
              {showSuccess()}
              {showError()}
              {spaceForm()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;
