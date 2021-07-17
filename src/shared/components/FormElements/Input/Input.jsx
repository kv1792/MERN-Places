import React, { useEffect, useReducer } from "react";

import "./Input.css";
import { validate } from "../../../util/validators";

const InputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        isValid: validate(action.val, action.validators),
        value: action.val,
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const {
    id,
    label,
    element,
    type,
    rows,
    placeholder,
    errorText,
    validators,
    onInput,
    initialValue,
    initialValidity,
  } = props;
  const [inputState, dispatch] = useReducer(InputReducer, {
    isValid: initialValidity || false,
    value: initialValue || "",
    isTouched: false,
  });

  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [onInput, id, value, isValid]);

  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  const inputElement =
    element === "input" ? (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={changeHandler}
        value={inputState.value}
        onBlur={touchHandler}
      />
    ) : (
      <textarea
        id={id}
        rows={rows || 3}
        onChange={changeHandler}
        value={inputState.value}
        onBlur={touchHandler}
      />
    );
  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={id}>{label}</label>
      {inputElement}
      {!inputState.isValid && inputState.isTouched && (
        <p className="">{errorText}</p>
      )}
    </div>
  );
};

export default Input;
