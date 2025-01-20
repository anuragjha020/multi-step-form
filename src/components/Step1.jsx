import { ErrorMessage, Field } from "formik";
import "../styles/Step.css";

function Step1({ touched, errors }) {
  return (
    <div className="step-container">
      <h3>Step 1</h3>
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
    </div>
  );
}

export default Step1;
