import { ErrorMessage, Field } from "formik";
import "../styles/Step.css";

function Step3({ touched, errors }) {
  return (
    <div className="step-container">
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

export default Step3;
