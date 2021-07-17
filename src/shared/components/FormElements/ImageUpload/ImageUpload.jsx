import React, { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";
import "./ImageUpload.css";

const ImageUpload = (props) => {
  const { id, center, onInput, errorText } = props;
  const [pickedFile, setPickedFile] = useState();
  const [isValid, setIsValid] = useState(false);
  const [previewFileUrl, setPreviewFileUrl] = useState();
  const filePickerRef = useRef({});

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  useEffect(() => {
    if (!pickedFile) {
      return;
    }

    const fileReader = new FileReader();
    // onload function is required in case of using FileReader API to extract the uploaded file and its information
    // .result gives the information of the file
    fileReader.onload = () => {
      setPreviewFileUrl(fileReader.result);
    };
    fileReader.readAsDataURL(pickedFile);
  }, [pickedFile]);

  const pickedHandler = (event) => {
    let pickedFile;
    let validFile;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setPickedFile(pickedFile);
      setIsValid(true);
      validFile = true;
    } else {
      setIsValid(false);
      validFile = false;
    }
    onInput(id, pickedFile, validFile);
  };

  return (
    <div className="form-control">
      <input
        type="file"
        accept=".jpg, .jpeg, .png, .webp"
        id={id}
        style={{ display: "none" }}
        ref={filePickerRef}
        onChange={pickedHandler}
      />
      <div className={`image-upload ${center && "center"}`}>
        <div className="image-upload__preview">
          {previewFileUrl && <img src={previewFileUrl} alt="preview" />}
          {!previewFileUrl && <p>Please pick a file</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
      {!isValid && <p>{errorText}</p>}
    </div>
  );
};

export default ImageUpload;
