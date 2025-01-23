import { ErrorMessage, Field } from "formik";
import "../styles/Step.css";
import { useRef, useState } from "react";

function Step1({
  touched,
  errors,
  setIsDragging,
  isDragging,
  setFieldValue,
  getBase64,
}) {
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);

  const handleFileUpload = (file) => {
    setFileName(file.name);
    getBase64(file)
      .then((base64) => {
        setFieldValue("avatar", base64);
      })
      .catch((err) => {
        setFieldValue("avatar", "");
        setFieldValue("error", err.message);
      });
  };

  //handle select file click
  const handleSelectFileClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  return (
    <div className="step-container">
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <Field
          id="name"
          type="text"
          name="name"
          className={`form-input ${
            touched.name && errors.name ? "input-error" : ""
          }`}
        />
        <ErrorMessage name="name" component="div" className="error-message" />
      </div>

      <div className="form-group">
        <label htmlFor="dob">DOB:</label>
        <Field
          id="dob"
          type="text"
          name="dob"
          className={`form-input ${
            touched.dob && errors.dob ? "input-error" : ""
          }`}
        />
        <ErrorMessage name="dob" component="div" className="error-message" />
      </div>

      {/* File Upload with Drag-and-Drop */}
      <div
        className={`form-group drop-zone ${isDragging ? "dragging" : ""} ${
          fileName ? (errors.avatar ? "red-border" : "green-border") : ""
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);

          const droppedFile = e.dataTransfer.files[0];
          if (droppedFile) {
            handleFileUpload(droppedFile);
          }
        }}
      >
        <label htmlFor="avatar">Upload File:</label>
        <div>
          <button className="btn-select-file" onClick={handleSelectFileClick}>
            {fileName ? "Change file" : "Select file"}
          </button>
        </div>
        <div
          className={`selected-file ${
            !fileName
              ? "no-file-name"
              : errors.avatar
              ? "red-file-name"
              : "green-file-name"
          }`}
        >
          {fileName ? fileName : "No file selected"}
        </div>
        {/* </div> */}
        <input
          id="avatar"
          type="file"
          name="avatar"
          ref={fileInputRef}
          className={`form-input ${
            touched.avatar && errors.avatar ? "input-error" : ""
          }`}
          onChange={(e) => {
            const selectedFile = e.target.files[0];
            if (selectedFile) {
              handleFileUpload(selectedFile);
            }
          }}
        />
        <ErrorMessage name="avatar" component="div" className="error-message" />
        <p className="drop-instructions">
          Drag and drop a file here, or click to{" "}
          {fileName ? "change" : "select a"} file.
        </p>
      </div>
    </div>
  );
}

export default Step1;
