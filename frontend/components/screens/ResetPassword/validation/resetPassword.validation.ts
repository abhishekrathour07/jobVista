import * as yup from "yup";

export const resetPasswordSchema = yup.object().shape({

  newPassword: yup
    .string()
    .required("New password is required")
    .min(6, "Minimum 6 characters"),

  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Confirm your new password"),
});
