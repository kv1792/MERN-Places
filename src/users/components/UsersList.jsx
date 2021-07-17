import React from "react";
import "./UsersList.css";
import UserItem from "./UserItem";
import Card from "../../shared/components/UIElements/Card/Card";

const UsersList = (props) => {
  const { items } = props;
  return !!items.length ? (
    <ul className="users-list">
      {items.map((user) => {
        return (
          <UserItem
            id={user.id}
            name={user.name}
            image={user.image}
            key={user.id}
            placeCount={user.places.length}
          />
        );
      })}
    </ul>
  ) : (
    <div className="center">
      <Card>
        <h2>No Users Found</h2>
      </Card>
    </div>
  );
};

export default UsersList;
