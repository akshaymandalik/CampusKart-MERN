import { emailSchema, passwordSchema } from "../utils/validationTypes";

export const validateUserSchema = ({ username, password }) => {
  let emailErrors = [];
    let passwordErrors = [];
    

  const emailResult = emailSchema.safeParse(username);
  if (!emailResult.success) {
    const parsedErrors = JSON.parse(emailResult.error);

    parsedErrors.forEach((err) => {
      emailErrors.push(err.message);
    });
  }

  const passwordResult = passwordSchema.safeParse(password);
  if (!passwordResult.success) {
    const parsedErrors = JSON.parse(passwordResult.error);

    parsedErrors.forEach((err) => {
      passwordErrors.push(err.message);
    });
  }

  if (emailErrors.length || passwordErrors.length) {
    return {
      hasError: true,
      errors: {
        username: emailErrors,
        password: passwordErrors,
      },
    };
  }

  return { hasError: false, errors: {} };
};
