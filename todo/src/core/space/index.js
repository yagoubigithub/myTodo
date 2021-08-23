import React, { useState, useEffect, useRef } from "react";

import { isAuthenticated } from "../../auth";

import ListSpaces from "../../core/space/List";
import TodoNav from "../todo/TodoNav";

//apis
import { getTodos, removeTodo, update } from "../todo/apiTodo";
import { getSpace } from "../space/apiSpace";
import { getCategories } from "../category/apiCategory";

const Space = (props) => {
  //close btn of the modal
  const closeModalBtn = useRef();

  //todo list
  const [todos, setTodos] = useState([]);

  const [todo, setTodo] = useState({
    todoId: 0,
    text: "",
    categoryId: 0,
    beginTime: "12:00",
    endTime: "12:00",
    suceess: false,
    error: false,
  });
  const [space, setSpace] = useState({
    id: 0,
    date: "",
    name: "",
  });
  const [categories, setCategories] = useState([]);

  //get user and the toke to do a request after
  const { user, token } = isAuthenticated();

  const { todoId, text, categoryId, beginTime, endTime, error, success } = todo;

  //load all todos after create one or update one
  const newTodo = () => {
    loadTodos();
  };

  //get all todo in the space
  const loadTodos = () => {
    getTodos(props.match.params.spaceId, user.id, token).then((data) => {
      if (data.error) {
        props.history.push("/");
      } else setTodos(data);
    });
  };

  //get the current space data by using spaceId params
  const loadSpace = () => {
    getSpace(props.match.params.spaceId, user.id, token).then((data) => {
      if (data.error) {
        props.history.push("/");
      } else setSpace(data);
    });
  };

  //get all categories for select element
  const loadCategories = () => {
    getCategories(user.id, token).then((data) => {
      if (data.error) console.log(data.error);
      else setCategories(data);
    });
  };

  //load data after component mount
  useEffect(() => {
    loadTodos();
    loadSpace();
    loadCategories();
  }, []);

  //load data after spaceId params change
  useEffect(() => {
    loadTodos();
    loadSpace();
  }, [props.match.params.spaceId]);

  //delete todo from database
  const removeItem = (id) => {
    removeTodo(props.match.params.spaceId, id, user.id, token).then((data) => {
      if (data.error) console.log(data.error);
      else setTodos(data);
    });
  };
  //
  //handlechange changin the sate after the user write somthing
  const handleChange = (name) => (event) => {
    setTodo({ ...todo, error: false, [name]: event.target.value });
  };

  //update form with all inputs
  const udpateForm = () => {
    return (
      <form className="card mb-2 mt-2 p-2">
        <select
          className="form-control mb-1"
          onChange={handleChange("categoryId")}
          value={categoryId}
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
            <span className="input-group-text" id="">
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
            <span className="input-group-text" id="">
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
      </form>
    );
  };

  //todo item with text and delete and update button
  const ListItem = ({ todo }) => {
    return (
      <li className="list-group-item d-flex justify-content-between align-items-center mb-3">
        <div>
          <h3>{todo.text}</h3>

          <h6 className="text-muted">Category : {todo.name}</h6>
          <small>
            <h6 className="text-muted">
              {todo.beginTime} To {todo.endTime}{" "}
            </h6>
          </small>
        </div>

        <div>
          <button
            className="btn btn-danger mr-1"
            onClick={() => removeItem(todo.id)}
          >
            <i className="bi bi-trash-fill"></i>
          </button>

          <button
            className="btn btn-info"
            onClick={() => setTodo({ ...todo, todoId: todo.id })}
            data-toggle="modal"
            data-target="#updateModal"
          >
            <i className="bi bi-pencil-fill"></i>
          </button>
        </div>
      </li>
    );
  };

  //submit the form
  const clickSubmit = () => {
    //select category is required
    if (categoryId === 0) {
      alert("select category");
      return;
    }

    setTodo({ ...todo, error: false });

    //update the todo by doing a request
    update({
      spaceId: props.match.params.spaceId,
      userId: user.id,
      token,
      todo: { id: todoId, text, categoryId, beginTime, endTime },
    }).then((data) => {
      if (data.error) {
        setTodo({ ...todo, error: data.error, success: false });
      } else {
        setTodo({
          ...todo,
          text: "",
          categoryId: 0,
          beginTime: "12:00",
          endTime: "12:00",
          suceess: true,
          error: false,
        });

        //clsoe the modal
        closeModalBtn.current.click();
        //load data to refresh the view
        loadTodos();
      }
    });
  };

  //the modal
  const updateModal = () => {
    return (
      <div
        className="modal fade"
        id="updateModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update Todo
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">{udpateForm()}</div>
            <div className="modal-footer">
              <button
                type="button"
                ref={closeModalBtn}
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                onClick={clickSubmit}
                className="btn btn-primary"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container-fluid">
      {updateModal()}
      <div className="row">
        <div className="col-4">
          {isAuthenticated() && (
            <ListSpaces activeSpaceId={props.match.params.spaceId} />
          )}
        </div>

        <div className="col-6">
          <TodoNav
            userId={user.id}
            spaceId={props.match.params.spaceId}
            newTodo={newTodo}
            categories={categories}
          />

          <div className="card p-3 mb-2">
            <h2 className="text-muted">Todolist : {space.name}</h2>
            <p className="text-muted">Date : {space.date.split("T")[0]}</p>
          </div>

          <div>
            <ul className="list-group">
              {todos.map((todo, index) => {
                return <ListItem todo={todo} key={index} />;
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Space;
