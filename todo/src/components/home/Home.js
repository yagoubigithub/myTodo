import React from "react";
import ListCategory from "../../core/category/List";
import ListSpaces from "../../core/space/List";


import { isAuthenticated } from "../../auth";
import { Redirect } from "react-router-dom";

const Home = () => {
  return (
    
    <div className="container-fluid">
      {!isAuthenticated() &&  <Redirect to="/signin" /> }
      <div className="row">
        <div className="col-4 ">
        <div className="card p-3">
        <h2>Category List</h2>
         {isAuthenticated() &&  <ListCategory /> }
         </div>
        </div>

        <div className="col-6 offset-1   ">
        <div className="card p-3">
        <h2>Space List</h2>
         {isAuthenticated() &&  <ListSpaces /> }
        </div>
       
        </div>
      </div>
    </div>
  );
};

export default Home;
