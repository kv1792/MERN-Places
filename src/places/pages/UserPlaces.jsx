import React, { useEffect, useState } from "react";
import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner/LoadingSpinner";

const UserPlaces = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlaces, setLoadedPlaces] = useState();
  const userId = useParams().userId;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_API_URL}/places/user/${userId}`
        );
        setLoadedPlaces(responseData.userPlaces);
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, userId]);

  const onDeleteHandler = (placeId) => {
    setLoadedPlaces(
      loadedPlaces.filter((prevPlace) => prevPlace.id !== placeId)
    );
  };

  return (
    <>
      <ErrorModal onClear={clearError} error={error} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDelete={onDeleteHandler} />
      )}
    </>
  );
};

export default UserPlaces;
