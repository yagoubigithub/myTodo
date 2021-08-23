import { API } from "../../Config";


//create new todo
export const create = (data) => {
  const {spaceId, userId, token, todo } = data;

  
  return fetch(`${API}/todo/create/${spaceId}/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ todo }),
  })
    .then((responce) => {
      return responce.json();
    })
    .catch((err) => console.log(err));
};



//update the todo data {text, category, time}
export const update = (data) => {
  const { userId, token, todo } = data;
  
  return fetch(`${API}/todo/update/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...todo }),
  })
    .then((responce) => {
      return responce.json();
    })
    .catch((err) => console.log(err));
};


//get all todo in one space
export const getTodos = (spaceId,userId, token) => {
  return fetch(`${API}/todos/${spaceId}/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((responce) => {
      return responce.json();
    })
    .catch((err) => console.log(err));
};



//delete todo by using his id
export const removeTodo = (spaceId,todoId, userId, token) => {
  return fetch(`${API}/todo/${spaceId}/${todoId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((responce) => {
      return responce.json();
    })
    .catch((err) => console.log(err));
};
