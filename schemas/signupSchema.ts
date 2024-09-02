import { z } from "zod";

export const usernamevalidation = z
  .string()
  .min(3, "Must be at  least 3 characters long")
  .max(7, "Must be less than 7 character long")
  .regex(
    /^(?!.*user)[a-zA-Z0-9._-]{3,20}$/,
    "Username must not container user character"
  );

export const signupValidation = z.object({
  username: usernamevalidation,
  password: z.string().min(6, "Must be at least 6 characters long"),
  email: z.string().email({ message: "Must be a valid email address" }),
});
