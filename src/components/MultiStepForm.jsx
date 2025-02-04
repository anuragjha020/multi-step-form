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
import SummaryModal from "./SummaryModal";

function MultiStepForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    avatar: null,
    email: "",
    phone: "",
    city: "",
    state: "",
    pin: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("multiStepFormData"));
    if (savedData) {
      setCurrentStep(savedData.currentStep || 1);
      setFormData(savedData.data || {});
    }
  }, []);

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

  function handleNext(validateForm, setTouched, values) {
    if (currentStep === 1) {
      setTouched({ name: true, dob: true, avatar: true });
    } else if (currentStep === 2) {
      setTouched({ city: true, state: true, pin: true });
    } else {
      setTouched({ phone: true, email: true });
    }

    validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
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
      }
    });
  }

  //CONVERT IMAGE
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  function handleBack() {
    setCurrentStep((prevStep) => prevStep - 1);
  }

  function handleSubmit(values) {
    console.log("Final Form Data:", values);
    setIsModalOpen(true);

    alert("Form submitted successfully!");
    navigate("/form-success", { state: values });

    localStorage.removeItem("multiStepFormData");
  }

  function handleModalSubmit(values) {
    setFormData({ ...formData, ...values });
    setIsModalOpen(true);
  }

  return (
    <div className="form-container">
      <Formik
        initialValues={formData}
        validationSchema={getValidationSchema()}
        onSubmit={handleModalSubmit}
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
                          : "Contact"}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {currentStep === 1 && (
              <Step1
                values={values}
                setFieldValue={setFieldValue}
                touched={touched}
                errors={errors}
                isDragging={isDragging}
                setIsDragging={setIsDragging}
                getBase64={getBase64}
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
                  Review & Submit
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>

      {/* Summary Modal */}
      <SummaryModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default MultiStepForm;
