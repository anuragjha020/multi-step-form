import { ErrorMessage, Field } from "formik";
import "../styles/Step1.css";

function Step3({ touched, errors }) {
  return (
    <div className="step-container">
      <div className="form-group">
        <label htmlFor="card">Card:</label>
        <Field
          id="card"
          type="text"
          name="card"
          className={`form-input ${
            touched.card && errors.card ? "input-error" : ""
          }`}
        />
        <ErrorMessage name="card" component="div" className="error-message" />
      </div>
      <div className="form-group">
        <label htmlFor="expiry">Expiry:</label>
        <Field
          id="expiry"
          type="text"
          name="expiry"
          className={`form-input ${
            touched.expiry && errors.expiry ? "input-error" : ""
          }`}
        />
        <ErrorMessage name="expiry" component="div" className="error-message" />
      </div>
      <div className="form-group">
        <label htmlFor="cvv">CVV:</label>
        <Field
          id="cvv"
          type="text"
          name="cvv"
          className={`form-input ${
            touched.cvv && errors.cvv ? "input-error" : ""
          }`}
        />
        <ErrorMessage name="cvv" component="div" className="error-message" />
      </div>
    </div>
  );
}

export default Step3;
