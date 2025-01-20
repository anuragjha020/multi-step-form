import { ErrorMessage, Field } from "formik";
import "../styles/Step1.css";

function Step2({ touched, errors }) {
  return (
    <div className="step-container">
      <div className="form-group">
        <label htmlFor="city">City:</label>
        <Field
          id="city"
          type="text"
          name="city"
          className={`form-input ${
            touched.city && errors.city ? "input-error" : ""
          }`}
        />
        <ErrorMessage name="city" component="div" className="error-message" />
      </div>
      <div className="form-group">
        <label htmlFor="state">State:</label>
        <Field
          id="state"
          type="text"
          name="state"
          className={`form-input ${
            touched.state && errors.state ? "input-error" : ""
          }`}
        />
        <ErrorMessage name="state" component="div" className="error-message" />
      </div>
      <div className="form-group">
        <label htmlFor="pin">Pin:</label>
        <Field
          id="pin"
          type="text"
          name="pin"
          className={`form-input ${
            touched.pin && errors.pin ? "input-error" : ""
          }`}
        />
        <ErrorMessage name="pin" component="div" className="error-message" />
      </div>
    </div>
  );
}

export default Step2;
