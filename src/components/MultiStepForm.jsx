import { useEffect, useState } from "react";
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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    avatar: null,
    state: "",
    pin: "",
    card: "",
    expiry: "",
    cvv: "",
  });

  const navigate = useNavigate();

  // Load saved state from localStorage on component mount
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("multiStepFormData"));
    if (savedData) {
      setCurrentStep(savedData.currentStep || 1);
      setFormData(savedData.data || {});
    }
  }, []);
  console.log("data fetched on mount : ", formData);

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

  // Handle Next Button
  function handleNext(validateForm, setTouched, values) {
    if (currentStep === 1) {
      setTouched({ name: true, email: true, phone: true, avatar: true });
    } else if (currentStep === 2) {
      setTouched({ city: true, state: true, pin: true });
    } else {
      setTouched({ card: true, expiry: true, cvv: true });
    }

    validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        // Update formData on clicking next button
        setFormData((prevFormData) => {
          const updatedFormData = { ...prevFormData, ...values };
          localStorage.setItem(
            "multiStepFormData",
            JSON.stringify({
              currentStep: currentStep + 1,
              data: updatedFormData,
            })
          );
          return updatedFormData;
        });
        setCurrentStep((prevStep) => prevStep + 1);
      } else {
        console.error("Validation errors:", errors);
        const firstErrorField = Object.keys(errors)[0];
        document.getElementById(firstErrorField)?.focus();
      }
    });
  }

  // Handle Back Button
  function handleBack() {
    setCurrentStep((prevStep) => prevStep - 1);
  }

  // Handle Submit
  function handleSubmit(values) {
    const finalFormData = { ...formData, ...values };
    console.log("Final Form Data:", finalFormData);

    alert("Form submitted successfully!");
    navigate("/order-successful", { state: finalFormData });

    // Clear saved state after submission
    localStorage.removeItem("multiStepFormData");
  }

  return (
    <div className="form-container">
      <Formik
        initialValues={formData}
        validationSchema={getValidationSchema()}
        onSubmit={handleSubmit}
        enableReinitialize
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
            {/* Progress Bar */}
            <div className="progress-bar-container">
              {Array.from({ length: 3 }, (_, index) => {
                const isSuccess = index < currentStep - 1;
                const isActive = index === currentStep - 1;
                return (
                  <div
                    key={index}
                    className={`progress-bar-segment ${
                      isSuccess ? "success" : isActive ? "active" : ""
                    }`}
                  >
                    {isActive && (
                      <p className="step-name">
                        {currentStep === 1
                          ? "Personal Details"
                          : currentStep === 2
                          ? "Address"
                          : "Payment"}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Step Components */}
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

            {/* Navigation Buttons */}
            <div className="form-navigation">
              {currentStep > 1 && (
                <button
                  type="button"
                  className="form-button"
                  onClick={handleBack}
                >
                  Back
                </button>
              )}
              <button
                type="button"
                className="form-button-cancel"
                onClick={() => {
                  resetForm();
                  localStorage.removeItem("multiStepFormData");
                  navigate("/");
                }}
              >
                Cancel
              </button>
              {currentStep < 3 && (
                <button
                  type="button"
                  className="form-button"
                  onClick={() => handleNext(validateForm, setTouched, values)}
                >
                  Next
                </button>
              )}
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
