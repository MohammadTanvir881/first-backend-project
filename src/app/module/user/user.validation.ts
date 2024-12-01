import { z } from 'zod';

const userValidationSchema = z.object({
  id: z.string({
    invalid_type_error: 'Password must be a string',
  }),
  password: z
    .string()
    .max(20, { message: 'Password can not be more than 20 character' }),
});

export const userValidation = {
  userValidationSchema,
};
