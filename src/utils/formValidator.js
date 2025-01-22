import * as Yup from "yup";
const FILE_SIZE = 10 * 1024 * 1024;
const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "image/jpg"];

export const Step1Validation = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone must be a 10-digit number")
    .required("Phone is required"),
  avatar: Yup.mixed()
    .required("A file is required")
    .test(
      "fileType",
      "Unsupported file format. Only JPEG and PNG are allowed.",
      (value) =>
        value && value.type ? SUPPORTED_FORMATS.includes(value.type) : false
    )
    .test("fileSize", "File size is too large. Max size is 2MB.", (value) =>
      value && value.size ? value.size <= FILE_SIZE : false
    ),
});

export const Step2Validation = Yup.object().shape({
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  pin: Yup.string()
    .matches(/^[0-9]{6}$/, "PIN must be a 6-digit number")
    .required("Pin is required"),
});

export const Step3Validation = Yup.object().shape({
  card: Yup.string()
    .required("Card number is required")
    .matches(/^[0-9]+$/, "Card number must contain only digits")
    .min(13, "Card number must be at least 13 digits")
    .max(19, "Card number must be at most 19 digits"),
  expiry: Yup.string()
    .matches(
      /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
      "Expiry date must be in MM/YY format"
    )
    .required("Expiry is required"),
  cvv: Yup.string()
    .matches(/^[0-9]{3}$/, "cvv must be a 3-digit number")
    .required("cvv is required"),
});
