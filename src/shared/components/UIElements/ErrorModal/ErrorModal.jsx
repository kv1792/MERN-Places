import React from "react";

import Modal from "../Modal/Modal";
import Button from "../../FormElements/Button/Button";

const ErrorModal = (props) => {
  const { error, onClear } = props;
  return (
    <Modal
      onCancel={onClear}
      header="An Error Occured!"
      show={!!error}
      footer={<Button onClick={onClear}>Okay</Button>}
    >
      <p>{error}</p>
    </Modal>
  );
};

export default ErrorModal;
