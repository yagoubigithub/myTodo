import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";



import Home from "./components/home/Home"
import Signin from "./components/signin/Signin"
import Signup from "./components/signup/Signup"

import Header from "./header/Header";

import Add from "./core/category/Add";
import Update from "./core/category/Update";


import AddSpace from "./core/space/Add";
import UpdateSpace from "./core/space/Update";
import Space from "./core/space";

const Routes = () => {
  return (
    <BrowserRouter>
    <Header />
    <div className="content">
       <Switch>
        <Route path="/" exact component={Home} />

        <Route path="/signin"  component={Signin} />
        <Route path="/signup"  component={Signup} />
        <PrivateRoute path="/add-category" component={Add} />
        <PrivateRoute path="/update-category/:categoryId" component={Update} />

        <PrivateRoute path="/add-space" component={AddSpace} />
        <PrivateRoute path="/update-space/:spaceId" component={UpdateSpace} />
        <PrivateRoute path="/space/:spaceId" component={Space} />
      </Switch>
    </div>
     
    </BrowserRouter>
  );
};

export default Routes;
