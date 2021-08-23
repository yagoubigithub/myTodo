import React, { useState, useEffect } from "react";

import { isAuthenticated } from "../../auth";



import { create } from "./apiTodo";
const TodoNav = ({ spaceId, newTodo , categories}) => {

  //todo data
  const [values, setValues] = useState({
    text: "",
    categoryId: 0,
    beginTime: "12:00",
    endTime: "12:00",
    suceess: false,
    error: false,
  });
 

  //user credential
  const { user, token } = isAuthenticated();

  const { text, categoryId, beginTime, endTime, error, success } = values;

  

  //change the state
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };


  //handle the submit
  const clickSubmit = (event) => {
    event.preventDefault();
    //doing nothing if user not choose a category
    if (categoryId === 0) {
      alert("select category");
      return;
    }

    setValues({ ...values, error: false });

    //create a todo
    create({
      spaceId,
      userId: user.id,
      token,
      todo: { text, categoryId, beginTime, endTime },
    }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          text: "",
          categoryId: 0,
          beginTime: "12:00",
          endTime: "12:00",
          suceess: true,
          error: false,
        });
        //load all todo  again to refresh the view
        newTodo();
      }
    });
  };


  //todo form
  const addForm = () => {
    return (
      <form className="card mb-2 mt-2 p-2">
        <select
          className="form-control mb-1"
          onChange={handleChange("categoryId")}
        >
          <option>select category</option>
          {categories.map((c, index) => (
            <option value={c.id} key={index}>
              {c.name}
            </option>
          ))}
        </select>
        <div className="input-group mb-1">
          <div className="input-group-prepend">
            <span className="input-group-text" >
              From
            </span>
          </div>
          <input
            type="time"
            value={beginTime}
            onChange={handleChange("beginTime")}
            className="form-control"
          />

          <div className="input-group-prepend">
            <span className="input-group-text" >
             To
            </span>
          </div>
          <input
            type="time"
            value={endTime}
            onChange={handleChange("endTime")}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <textarea
            className="form-control"
            placeholder="Text"
            value={text}
            onChange={handleChange("text")}
            rows="3"
          ></textarea>
        </div>
        <button onClick={clickSubmit} className="btn btn-primary mb-1">
          create todo
        </button>
      </form>
    );
  };

  return <nav>{addForm()}</nav>;
};

export default TodoNav;
