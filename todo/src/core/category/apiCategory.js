import { API } from "../../Config";

//create new category (send request to the serveer)
export const create = (data) => {
  const { userId, token, name } = data;

  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ category: name }),
  })
    .then((responce) => {
      return responce.json();
    })
    .catch((err) => console.log(err));
};

//get all categories for the user

export const getCategories = (userId, token) => {
  return fetch(`${API}/categories/${userId}`, {
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


//delete category
export const removeCategory = (categoryId, userId, token) => {
  return fetch(`${API}/category/${categoryId}/${userId}`, {
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

//get one category with a specific id
export const getCategory = (categoryId, userId, token) => {
  return fetch(`${API}/category/${categoryId}/${userId}`, {
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


//update
export const update = (data) => {
  const { userId, token, category } = data;

  return fetch(`${API}/category/update/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...category }),
  })
    .then((responce) => {
      return responce.json();
    })
    .catch((err) => console.log(err));
};
