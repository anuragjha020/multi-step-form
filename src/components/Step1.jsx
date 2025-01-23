import { ErrorMessage, Field } from "formik";
import "../styles/Step.css";
import { useRef } from "react";

function Step1({
  touched,
  errors,
  setIsDragging,
  isDragging,
  setFieldValue,
  getBase64,
}) {
  const fileInputRef = useRef(null);

  const handleFileUpload = (file) => {
    getBase64(file)
      .then((base64) => {
        setFieldValue("avatar", base64);
      })
      .catch((err) => {
        setFieldValue("avatar", "");
        setFieldValue("error", err.message);
      });
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
        <label htmlFor="email">Email:</label>
        <Field
          id="email"
          type="email"
          name="email"
          className={`form-input ${
            touched.email && errors.email ? "input-error" : ""
          }`}
        />
        <ErrorMessage name="email" component="div" className="error-message" />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone:</label>
        <Field
          id="phone"
          type="text"
          name="phone"
          className={`form-input ${
            touched.phone && errors.phone ? "input-error" : ""
          }`}
        />
        <ErrorMessage name="phone" component="div" className="error-message" />
      </div>

      {/* File Upload with Drag-and-Drop */}
      <div
        className={`form-group drop-zone ${isDragging ? "dragging" : ""}`}
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
        <input
          id="avatar"
          type="file"
          name="avatar"
          ref={fileInputRef}
          className={`form-input ${
            touched.avatar && errors.avatar ? "input-error" : ""
          }`}
          onChange={(e) => {
            console.log("selected file ", e.target.files);

            const selectedFile = e.target.files[0];
            if (selectedFile) {
              handleFileUpload(selectedFile);
            }
          }}
        />
        <ErrorMessage name="avatar" component="div" className="error-message" />
        <p className="drop-instructions">
          Drag and drop a file here, or click to select a file.
        </p>
      </div>
    </div>
  );
}

export default Step1;
