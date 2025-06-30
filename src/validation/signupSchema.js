import * as Yup from "yup";

export const SignupValidationSchema = Yup.object().shape({
  companyName: Yup.string().required("Company name is required"),

  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),

  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),

  email: Yup.string()
    .required("Email is required")
    .email("Enter a valid email"),

  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),

  confirm_password: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords must match")
});
export const LoginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Enter a valid email"),

  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
});

export const CreateUserValidationSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("Full Name is required")
    .min(3, "Full Name must be at least 3 characters"),
  userName: Yup.string()
    .required("User Name is required")
    .min(3, "User Name must be at least 3 characters"),
  mobile: Yup.string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
});

export const editProfileValidationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),

  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number")
    .required("Mobile number is required"),

  userName: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),

  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required(),

  confirm_password: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords must match")
});
export const createTaskValidationSchema = Yup.object().shape({
  taskName: Yup.string().required("Task name is required"),
  taskDescription: Yup.string().required("Task Description is required"),
  date: Yup.string().required("Date is required")
});
