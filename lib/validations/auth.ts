import * as z from "zod";

export const signupSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      }
    ),
  role: z.enum(["contributor", "admin"], {
    required_error: "Please select a role.",
  }),
});

export const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  password: z.string().min(1, {
    message: "Please enter your password.",
  }),
  role: z.enum(["contributor", "admin"], {
    required_error: "Please select a role.",
  }),
});

export type SignupValues = z.infer<typeof signupSchema>;
export type LoginValues = z.infer<typeof loginSchema>;

export type UserRole = "contributor" | "admin";

// Schema for GitHub OAuth signup
export const githubSignupSchema = z.object({
  role: z.enum(["contributor", "admin"], {
    required_error: "Please select a role.",
  }),
});

export type GithubSignupValues = z.infer<typeof githubSignupSchema>;
