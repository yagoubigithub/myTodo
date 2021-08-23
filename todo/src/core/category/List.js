import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { isAuthenticated } from "../../auth";
import { getCategories, removeCategory } from "./apiCategory";

const List = () => {

  const [categories, setCategories] = useState([]);
  const { user, token } = isAuthenticated();


  //get all categorie when the the component mount
  const loadCategories = () => {
    getCategories(user.id, token).then((data) => {
      if (data.error) console.log(data.error);
      else setCategories(data);
    });
  };

  //delete category
  const removeItem = (id) => {
    removeCategory(id, user.id, token).then((data) => {
      if (data.error) console.log(data.error);
      else setCategories(data);
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  //category item to show data
  const ListItem = ({ category }) => {
    return (
      <li className="list-group-item d-flex justify-content-between align-items-center">
        {category.name}
        <div>
          <button
            className="btn btn-danger mr-1"
            onClick={() => removeItem(category.id)}
          >
            <i class="bi bi-trash-fill"></i>
          </button>
          <Link to={`/update-category/${category.id}`}>
            <button className="btn btn-info">
              <i class="bi bi-pencil-fill"></i>
            </button>
          </Link>
        </div>
      </li>
    );
  };
  return (
    <div>
      <ul className="list-group">
        {categories.map((c, index) => (
          <ListItem category={c} key={index} />
        ))}
      </ul>
    </div>
  );
};

export default List;
