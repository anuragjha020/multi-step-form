import * as Yup from "yup";

export const Step1Validation = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone must be a 10-digit number")
    .required("Phone is required"),
});

export const Step2Validation = Yup.object().shape({
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  pin: Yup.string()
    .matches(/^\d{6}$/, "PIN must be a 6-digit number")
    .required("Pin is required"),
});

export const Step3Validation = Yup.object().shape({
  card: Yup.string().required("Card is required"),
  expiry: Yup.string().required("Expiry is required"),
  cvv: Yup.string()
    .matches(/^\d{3}$/, "cvv must be a 3-digit number")
    .required("cvv is required"),
});
