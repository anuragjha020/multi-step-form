import * as Yup from "yup";
const FILE_SIZE = 4 * 1024 * 1024;
const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "image/jpg"];

export const Step1Validation = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  dob: Yup.string()
    .required("DOB is required")
    .matches(
      /^\d{2}-\d{2}-\d{4}$/,
      "Date of Birth must be in the format DD-MM-YYYY"
    )
    .test("is-valid-date", "Invalid Date", (value) => {
      if (!value) return false;
      const [day, month, year] = value.split("-").map(Number);
      const date = new Date(year, month - 1, day);
      return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
      );
    }),

  avatar: Yup.string()
    .required("A file is required")
    .test(
      "fileType",
      "Unsupported file format. Only JPEG and PNG are allowed.",
      (value) => {
        if (!value) return false;
        const imageType = value.split(",")[0];
        return SUPPORTED_FORMATS.some((format) => imageType.includes(format));
      }
    )
    .test("fileSize", "File size is too large. Max size is 4 MB.", (value) => {
      if (!value) return false;
      const imageSize = value.length - value.indexOf(",") - 1;
      const fileSize = (imageSize * 3) / 4 - (imageSize % 4 ? 1 : 0);
      return fileSize <= FILE_SIZE;
    }),
});

export const Step2Validation = Yup.object().shape({
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  pin: Yup.string()
    .matches(/^[0-9]{6}$/, "PIN must be a 6-digit number")
    .required("Pin is required"),
});

export const Step3Validation = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone must be a 10-digit number")
    .required("Phone is required"),
});
