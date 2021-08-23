import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";

import { signout, isAuthenticated } from "../auth";

const Header = ({ history }) => {

  //return active if the nav-item link is the same as the url pathname
  const isActive = (history, path) =>
    history.location.pathname === path ? "active" : "";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        Todo
      </Link>
      <button
        className="navbar-toggler "
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ">
          {isAuthenticated() && (
            <li className={`nav-item ${isActive(history, "/")}`}>
              <Link className="nav-link" to="/">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
          )}

          {!isAuthenticated() && (
            <Fragment>
              <li className={`nav-item ${isActive(history, "/signup")}`}>
                <Link className="nav-link" to="/signup">
                  SingUp <span className="sr-only">(current)</span>
                </Link>
              </li>

              <li className={`nav-item ${isActive(history, "/signin")}`}>
                <Link className="nav-link" to="/signin">
                  Signin <span className="sr-only">(current)</span>
                </Link>
              </li>
            </Fragment>
          )}

          {isAuthenticated() && (
            <Fragment>
              <li className={`nav-item ${isActive(history, "/add-category")}`}>
                <Link className="nav-link" to="/add-category">
                  Add Category <span className="sr-only">(current)</span>
                </Link>
              </li>

              <li className={`nav-item ${isActive(history, "/add-space")}`}>
                <Link className="nav-link" to="/add-space">
                  Add space <span className="sr-only">(current)</span>
                </Link>
              </li>
            </Fragment>
          )}
        </ul>
        {isAuthenticated() && (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item ">
              <span
                className="nav-link"
                onClick={() => {
                  signout(() => {
                    history.push("/");
                  });
                }}
                style={{cursor : "pointer"}}
              >
                Signout
              </span>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default withRouter(Header);
