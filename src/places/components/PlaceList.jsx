import React from "react";
import "./PlaceList.css";
import PlaceItem from "./PlaceItem";
import Card from "../../shared/components/UIElements/Card/Card";
import Button from "../../shared/components/FormElements/Button/Button";

const PlaceList = (props) => {
  const { items, onDelete } = props;
  return !!items.length ? (
    <ul className="place-list">
      {items.map((place) => {
        return (
          <PlaceItem
            id={place.id}
            key={place.id}
            name={place.name}
            image={place.image}
            title={place.title}
            description={place.description}
            address={place.address}
            creatorId={place.creator}
            coordinates={place.location}
            onDelete={onDelete}
          />
        );
      })}
    </ul>
  ) : (
    <div className="place-list center">
      <Card>
        <h2>No Places found. Maybe share one ?</h2>
        <Button to="places/new">Share Place</Button>
      </Card>
    </div>
  );
};

export default PlaceList;
