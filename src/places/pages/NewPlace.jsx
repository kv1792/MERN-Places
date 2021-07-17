import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import "./NewPlace.css";
import Input from "../../shared/components/FormElements/Input/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button/Button";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import ImageUpload from "../../shared/components/FormElements/ImageUpload/ImageUpload";

const NewPlace = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { userId, token } = useContext(AuthContext);
  const history = useHistory();
  const [formState, inputChangeHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("address", formState.inputs.address.value);
      formData.append("creator", userId);
      formData.append("image", formState.inputs.image.value);

      await sendRequest(
        `${process.env.REACT_APP_API_URL}/places`,
        "POST",
        formData,
        {
          Authorization: "Bearer " + token,
        }
      );
      history.push("/");
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <form action="" className="place-form" onSubmit={placeSubmitHandler}>
        <ImageUpload
          id="image"
          center
          errorText="Please upload a photo"
          onInput={inputChangeHandler}
        />
        <Input
          id="title"
          type="text"
          element="input"
          label="Title"
          errorText="Please enter a valid Title"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputChangeHandler}
        />
        <Input
          id="description"
          type="text"
          element="textarea"
          label="Description"
          errorText="Please enter a valid description (At least 5 characters)"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          onInput={inputChangeHandler}
        />
        <Input
          id="address"
          type="text"
          element="input"
          label="Address"
          errorText="Please enter a valid address"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputChangeHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewPlace;
