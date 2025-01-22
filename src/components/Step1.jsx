import { ErrorMessage, Field } from "formik";
import "../styles/Step.css";
import { useRef } from "react";

function Step1({
  touched,
  errors,
  setIsDragging,
  isDragging,
  setFieldValue,
  setFileName,
}) {
  const fileInputRef = useRef(null);
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
            setFieldValue("avatar", droppedFile);
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(droppedFile);
            fileInputRef.current.files = dataTransfer.files;
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
            const file = e.target.files[0];
            if (file) {
              setFieldValue("avatar", file); // Set the file in Formik's state
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
