// import { object, string, ref } from "yup";

// export const passwordVal = object({
//     password: string()
//         .min(8, "Password must be at least 8 characters.")
//         .matches(/[A-Z]/, "Password must contain at least 1 uppercase letter.")
//         .matches(/[a-z]/, "Password must contain at least 1 lowercase letter.")
//         .matches(/\d/, "Password must contain at least 1 number.")
//         .matches(/[@$!%*?&]/, "Password must contain at least 1 special character (@, $, !, %, *, ?, &).")
//         .required("Password is required"),
//     confirmPassword: string()
//         .oneOf([ref("password")], "Passwords do not match")
//         .required("Confirm password is required")

// });
