import { API } from "../../Config";


//create new space 
export const create = (data) => {
  const { userId, token, space } = data;

  
  return fetch(`${API}/space/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...space }),
  })
    .then((responce) => {
      return responce.json();
    })
    .catch((err) => console.log(err));
};


//update the sapce 
export const update = (data) => {
  const { userId, token, space } = data;

  
  return fetch(`${API}/space/update/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...space }),
  })
    .then((responce) => {
      return responce.json();
    })
    .catch((err) => console.log(err));
};


//get all spaces 
export const getSpaces = (userId, token) => {
  return fetch(`${API}/spaces/${userId}`, {
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

//delete spaces

export const removeSpace = (spaceId, userId, token) => {
  return fetch(`${API}/space/${spaceId}/${userId}`, {
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


//get one space
export const getSpace = (spaceId, userId, token) => {
  return fetch(`${API}/space/${spaceId}/${userId}`, {
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
