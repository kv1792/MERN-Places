import React from "react";
import Avatar from "../../shared/components/UIElements/Avatar/Avatar";
import "./UserItem.css";
import { Link } from "react-router-dom";
import Card from "../../shared/components/UIElements/Card/Card";

const UserItem = (props) => {
  const { id, name, image, placeCount } = props;
  return (
    <li className="user-item" id={id}>
      <Card className="user-item__content">
        <Link to={`/${id}/places`}>
          <div className="user-item__image">
            <Avatar
              image={`${process.env.REACT_APP_ASSET_URL}/${image}`}
              alt={name}
              height={70}
              width={70}
            />
          </div>
          <div className="user-item__info">
            <h2>{name}</h2>
            <h3>
              {placeCount} {placeCount === 1 ? "Place" : "Places"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
