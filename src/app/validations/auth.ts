import { z } from "zod";

// Centralized validation messages with i18n support
const validationMessages = {
  requiredEmail: "Email is required",
  validEmail: "Invalid email format",
  requiredPassword: "Password is required",
  passwordMinLength: "Password must be at least 6 characters",
  passwordMaxLength: "Password must be less than 40 characters",
  requiredName: "Name is required",
  nameMaxLength: "Name must be less than 50 characters",
  requiredConfirmPassword: "Password confirmation is required",
  passwordsDoNotMatch: "Passwords do not match",
  validLimit: "Limit must be a positive integer",
  limitMax: "Limit must be 100 or less",
} as const;

// Type definitions
export type LoginData = z.infer<ReturnType<typeof loginSchema>>;
export type SignupData = z.infer<ReturnType<typeof signupSchema>>;
export type ValidationError = Record<string, string>;

// Password validation helper
const passwordMatchValidation = (data: { password: string; confirmPassword: string }) => ({
  isValid: data.password === data.confirmPassword,
  error: {
    message: validationMessages.passwordsDoNotMatch,
    path: ["confirmPassword"],
  },
});

// Base schema options
const schemaOptions = {
  errorMap: (issue: z.ZodIssueOptionalMessage, ctx: { defaultError: string }) => ({
    message: issue.message || ctx.defaultError,
  }),
};

// Login schema with enhanced validation
export const loginSchema = () =>
  z
    .object({
      email: z
        .string()
        .trim()
        .min(1, { message: validationMessages.requiredEmail })
        .email({ message: validationMessages.validEmail })
        .transform((val) => val.toLowerCase()),
      password: z
        .string()
        .min(1, { message: validationMessages.requiredPassword })
        .min(6, { message: validationMessages.passwordMinLength })
        .max(40, { message: validationMessages.passwordMaxLength }),
    })
    .strict();

// Signup schema with enhanced validation
export const signupSchema = () =>
  z
    .object({
      name: z
        .string()
        .trim()
        .min(1, { message: validationMessages.requiredName })
        .max(50, { message: validationMessages.nameMaxLength }),
      email: z
        .string()
        .trim()
        .min(1, { message: validationMessages.requiredEmail })
        .email({ message: validationMessages.validEmail })
        .transform((val) => val.toLowerCase()),
      password: z
        .string()
        .min(1, { message: validationMessages.requiredPassword })
        .min(6, { message: validationMessages.passwordMinLength })
        .max(40, { message: validationMessages.passwordMaxLength }),
      confirmPassword: z
        .string()
        .min(1, { message: validationMessages.requiredConfirmPassword }),
      limit: z
        .number()
        .int()
        .min(1, { message: validationMessages.validLimit })
        .max(100, { message: validationMessages.limitMax })
        .default(1)
        .optional(),
    })
    .refine(
      (data) => passwordMatchValidation(data).isValid,
      (data) => passwordMatchValidation(data).error
    );

// Enhanced validation helper with better error handling
export const validateData = <T>(schema: z.ZodSchema<T>, data: unknown): { 
  success: boolean; 
  data?: T; 
  errors?: ValidationError;
} => {
  try {
    const result = schema.safeParse(data);
    if (result.success) {
      return { success: true, data: result.data };
    }
    
    const errors: ValidationError = result.error.errors.reduce((acc, curr) => {
      const path = curr.path.join('.');
      acc[path] = curr.message;
      return acc;
    }, {} as ValidationError);
    
    return { success: false, errors };
  } catch (error) {
    console.error('Validation error:', error);
    return { 
      success: false, 
      errors: { 
        _form: 'An unexpected validation error occurred' 
      } 
    };
  }
};

export default {
  loginSchema,
  signupSchema,
  validateData,
};