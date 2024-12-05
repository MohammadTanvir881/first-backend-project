import { z } from 'zod';

const studentNameSchema = z.object({
  firstName: z
    .string()
    .max(20)
    .refine(
      (value) =>
        value.charAt(0) === value.charAt(0).toUpperCase() &&
        /^[A-Za-z]+$/.test(value.slice(1)),
      {
        message:
          'First Name must start with an uppercase letter and be properly formatted.',
      },
    ),
  middleName: z.string().optional(),
  lastName: z.string().regex(/^[A-Za-z]+$/, {
    message: 'Last Name must contain only alphabetic characters.',
  }),
});

// Schema for guardian
const guardianSchema = z.object({
  fathersName: z.string(),
  fathersOccupation: z.string(),
  fathersContactNo: z.string(),
  mothersName: z.string(),
  mothersOccupation: z.string(),
  mothersContactNumbers: z.string(),
});

// Schema for local guardian
const localGuardianSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

// Main schema for student
const studentZodValidationSchema = z.object({
  body: z.object({
    password: z.string(),
    student: z.object({
      name: studentNameSchema,
      gender: z.enum(['male', 'female', 'others']),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNumber: z.string(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: guardianSchema,
      admissionSemester: z.string(),
      academicDepartment: z.string(),
      localGuardian: localGuardianSchema,
      profileImg: z.boolean().optional(),
    }),
  }),
});

export default studentZodValidationSchema;
