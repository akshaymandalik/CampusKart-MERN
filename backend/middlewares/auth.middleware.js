import { emailSchema, passwordSchema } from "../utils/validationTypes.js";

export const validateUserSchema = async (req, res, next) => {

  const username = req.body.username;
  const password = req.body.password;

  const validateUsername = emailSchema.safeParse(username);

  if (!validateUsername.success) {
    const parsedErrors = JSON.parse(validateUsername.error);
    let errors = [];

    parsedErrors.forEach((err) => {
      errors.push(err.message);
    });
    return res.status(422).json({
      status: 422,
      errors,
    });
  }

  const validatePass = passwordSchema.safeParse(password);

  if (!validatePass.success) {
    const parsedErrors = JSON.parse(validatePass.error);
    let errors = [];

    parsedErrors.forEach((err) => {
      errors.push(err.message);
    });

    return res.status(422).json({
      status: 422,
      errors,
    });
  }

  next();
};
