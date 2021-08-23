import "./Space.scss";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { isAuthenticated } from "../../auth";
import { getSpaces, removeSpace } from "./apiSpace";

const List = ({activeSpaceId}) => {
  const [spaces, setSpaces] = useState([]);

  //get user and the toke to do a request after
  const { user, token } = isAuthenticated();


  //load all spaces to displayed after
  const loadSpaces = () => {
    getSpaces(user.id, token).then((data) => {
      if (data.error) console.log(data.error);
      else setSpaces(data);
    });
  };


  //delete one
  const removeItem = (id) => {
    removeSpace(id, user.id, token).then((data) => {
      if (data.error) console.log(data.error);
      else setSpaces(data);
    });
  };

  useEffect(() => {
    loadSpaces();
  }, []);


  //space item showing name and delete and update data
  const ListItem = ({ space , active }) => {
    return (
      <li className={`list-group-item d-flex justify-content-between align-items-center ${active && " active"}`}>
        <Link to={`/space/${space.id}`}  className={`${active && " text-white"}`}>{space.name}</Link>
        <div>
          <button className="btn btn-danger mr-1" onClick={() => removeItem(space.id)}>
          <i class="bi bi-trash-fill"></i>
          </button>
          <Link to={`/update-space/${space.id}`}>
            <button className="btn btn-info">
            <i class="bi bi-pencil-fill"></i>
            </button>
          </Link>
        </div>
      </li>
    );
  };
  return (
    <div className="list-space">
      <ul className="list-group">
        {spaces.map((s, index) => (
          <ListItem active={activeSpaceId == s.id} space={s} key={index} />
        ))}
      </ul>
    </div>
  );
};

export default List;
