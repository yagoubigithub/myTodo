
import { API } from "../Config";



// request to the server for signup
//@params user = {name,email, password}
export const signup = (user) => {
    return fetch(`${API}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify(user),
    })
      .then((responce) => {
        return responce.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };


// request to the server for signin
//@params user = {email, password}
export const signin = (user) => {
    return fetch(`${API}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify(user),
    })
      .then((responce) => {
        return responce.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };



  //signout delete the jwt from the localstorage
  //delete coockie

  export const signout = (next) =>{

    if(typeof window !== "undefined"){
      localStorage.removeItem('jwt')
      next();
      return fetch(`${API}/signout`, {
        method  : "GET"
      }).then(responce =>{

        console.log("signout", responce)
      }).catch(err=>{
        console.log(err)
      })

  }
  }

  //set jwt to the local storage
  export const authenticate = (data, next) => {

    if(typeof window !== "undefined"){
        localStorage.setItem('jwt',JSON.stringify(data))
        next()

    }
  }

  

  export const isAuthenticated = () =>{
    if(typeof window === undefined){
      return false;
    }
    if(localStorage.getItem("jwt")){
      return JSON.parse(localStorage.getItem("jwt"))
    }else{
      return false;
    }
  }