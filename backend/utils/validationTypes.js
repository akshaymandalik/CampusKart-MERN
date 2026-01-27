import * as z from "zod";

export const emailSchema = z
  .string()
    .email({ message: "Please enter a valid email address" }); 
  
export const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters" })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter",
  })
  .regex(/[0-9]/, { message: "Password must contain at least one number" })
  .regex(/[!@#$%^&*()_+={}[\]|\\:;"'<,>.?/-]/, {
    message: "Password must contain at least one special character",
  });
