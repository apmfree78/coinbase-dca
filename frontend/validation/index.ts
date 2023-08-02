import { z } from 'zod';
import { customToast } from 'components/Toast';

// zod schema for SignIn validation
export const SignInCredentials = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'password must be 8 or more characters' }),
});

export const PasswordResetEmail = z
  .string()
  .email({ message: 'Invalid email address' });

export const SignUpCredentials = SignInCredentials.and(
  z.object({
    passwordConfirm: z.string(),
  })
).superRefine(({ password, passwordConfirm }, ctx) => {
  if (passwordConfirm !== password) {
    ctx.addIssue({
      code: 'custom',
      message: 'passwords do not match',
    });
  }
});

export type SignInCredentialsType = z.infer<typeof SignInCredentials>;
export type SignUpCredentialsType = z.infer<typeof SignUpCredentials>;
export type PasswordResetEmailType = z.infer<typeof PasswordResetEmail>;

// parses Zod Error and displays errors as toasts on screen
export function displayZodErrorToast<T>(error: z.ZodError<T>): void {
  // parsing error messages
  const errorData = JSON.parse(error.message);
  const errorMessages = errorData.map((error: z.ZodError<T>) => error.message);

  // toast for each error
  errorMessages.forEach((errorMessage: string) =>
    customToast(errorMessage, 'is-warning')
  );
}
