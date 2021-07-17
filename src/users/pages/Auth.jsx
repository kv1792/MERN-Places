import React, { useState, useContext } from "react";
import Input from "../../shared/components/FormElements/Input/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button/Button";
import { useForm } from "../../shared/hooks/form-hook";
import "./Auth.css";
import Card from "../../shared/components/UIElements/Card/Card";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ImageUpload from "../../shared/components/FormElements/ImageUpload/ImageUpload";

const Authenticate = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formState, inputChangeHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { login } = useContext(AuthContext);

  const authFormHandler = async (event) => {
    event.preventDefault();
    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_API_URL}/users/login`,
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        login(responseData.userId, responseData.token);
      } catch (err) {}
    } else {
      try {
        const formData = new FormData();
        formData.append("email", formState.inputs.email.value);
        formData.append("name", formState.inputs.name.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("image", formState.inputs.image.value);

        const responseData = await sendRequest(
          `${process.env.REACT_APP_API_URL}/users/signup`,
          "POST",
          formData
        );
        login(responseData.userId, responseData.token);
      } catch (err) {}
    }
  };

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
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
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form action="" onSubmit={authFormHandler}>
          {!isLoginMode && (
            <Input
              id="name"
              label="Name"
              type="text"
              element="input"
              validators={[VALIDATOR_REQUIRE()]}
              placeholder="Enter your name here"
              errorText="Please enter a valid name"
              onInput={inputChangeHandler}
            />
          )}
          {!isLoginMode && (
            <ImageUpload id="image" center onInput={inputChangeHandler} />
          )}
          <Input
            id="email"
            label="Email"
            type="email"
            element="input"
            validators={[VALIDATOR_EMAIL(), VALIDATOR_MINLENGTH(8)]}
            placeholder="Enter email here"
            errorText="Please enter a valid email address"
            onInput={inputChangeHandler}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            element="input"
            validators={[VALIDATOR_MINLENGTH(6)]}
            placeholder="Enter password here"
            errorText="Please enter a valid password"
            onInput={inputChangeHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "LOGIN" : "SIGN UP"}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? "SIGN UP" : "LOGIN"}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Authenticate;
