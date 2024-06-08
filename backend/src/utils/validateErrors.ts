import { ValidationError } from "sequelize";

export function formatErrorMessage(validationError: ValidationError): string[] {
  const errorMessage = validationError.errors.map((error) => {
    return error.message;
  });
  return errorMessage;
}
