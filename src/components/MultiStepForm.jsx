import { useState } from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";

import {
  Step1Validation,
  Step2Validation,
  Step3Validation,
} from "../utils/formValidator";

import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

import "../styles/MultiStepForm.css";

function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const formData = {
    name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    pin: "",
    card: "",
    expiry: "",
    cvv: "",
  };

  //getting validation schema based on current form step
  function getValidationSchema() {
    switch (currentStep) {
      case 1:
        return Step1Validation;
      case 2:
        return Step2Validation;
      case 3:
        return Step3Validation;
      default:
        return null;
    }
  }

  //handle next for next button
  function handleNext(validateForm, setTouched) {
    //validating fields based on current step
    if (currentStep === 1) {
      setTouched({ name: true, email: true, phone: true });
    } else if (currentStep === 2) {
      setTouched({ city: true, state: true, pin: true });
    } else {
      setTouched({
        card: true,
        expiry: true,
        cvv: true,
      });
    }
    validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        setCurrentStep(currentStep + 1);
      } else {
        console.log("Validation errors:", errors);
        const firstErrorField = Object.keys(errors)[0];
        document.getElementById(firstErrorField)?.focus();
      }
    });
  }

  //handle back for bck button
  function handleBack() {
    setCurrentStep(currentStep - 1);
  }

  //handle submit for final step
  function handleSubmit(values) {
    console.log("Final Form Data:", values);
    alert("Form submitted successfully!");
    navigate("/order-successful", { state: values });
  }

  return (
    <div className="form-container">
      <Formik
        initialValues={formData}
        validationSchema={getValidationSchema()}
        onSubmit={handleSubmit}
      >
        {({
          values,
          setFieldValue,
          touched,
          setTouched,
          errors,
          validateForm,
          resetForm,
          isValid,
        }) => (
          <Form className="form-content">
            {currentStep === 1 && (
              <Step1
                values={values}
                setFieldValue={setFieldValue}
                touched={touched}
                errors={errors}
              />
            )}

            {currentStep === 2 && (
              <Step2
                values={values}
                setFieldValue={setFieldValue}
                touched={touched}
                errors={errors}
              />
            )}
            {currentStep === 3 && (
              <Step3
                values={values}
                setFieldValue={setFieldValue}
                touched={touched}
                errors={errors}
              />
            )}

            {/* buttons */}
            <div className="form-navigation">
              {/* back button */}
              {currentStep > 1 && (
                <button
                  type="button"
                  className="form-button"
                  onClick={handleBack}
                >
                  Back
                </button>
              )}

              {/* cancel button */}
              <button
                type="button"
                className="form-button-cancel"
                onClick={() => {
                  resetForm();
                  navigate("/");
                }}
              >
                Cancel
              </button>

              {/* next button */}
              {currentStep < 3 && (
                <button
                  type="button"
                  className="form-button"
                  onClick={() => handleNext(validateForm, setTouched)}
                >
                  Next
                </button>
              )}

              {/* submit button */}
              {currentStep === 3 && (
                <button
                  type="submit"
                  className="form-button submit-button"
                  disabled={!isValid}
                >
                  Submit
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default MultiStepForm;
