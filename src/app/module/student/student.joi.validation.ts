import Joi from 'joi';

// Schema for the student's name
const studentNameSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .regex(/^[A-Z][a-z]*$/)
    .required(),
  middleName: Joi.string().allow(null, ''), // Optional
  lastName: Joi.string()
    .regex(/^[A-Za-z]+$/)
    .required(),
});

// Schema for the guardian information
const guardianSchema = Joi.object({
  fathersName: Joi.string().required(),
  fathersOccupation: Joi.string().required(),
  fathersContactNo: Joi.string().required(),
  mothersName: Joi.string().required(),
  mothersOccupation: Joi.string().required(),
  mothersContactNumbers: Joi.string().required(),
});

// Schema for the local guardian information
const localGuardianSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  contactNo: Joi.string().required(),
  address: Joi.string().required(),
});

// Main schema for the student
const studentValidationSchema = Joi.object({
  id: Joi.string().required(),
  name: studentNameSchema.required(),
  gender: Joi.string()
    .valid('male', 'female', 'others')
    .required(),
  dateOfBirth: Joi.string().isoDate().optional(),
  email: Joi.string().email().required(),
  contactNo: Joi.string().required(),
  emergencyContactNumber: Joi.string().required(),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .optional(),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: guardianSchema.required(),
  localGuardian: localGuardianSchema.required(),
  profileImg: Joi.boolean().required(),
  isActive: Joi.string()
    .valid('active', 'block')
    .default('active'),
});

export default studentValidationSchema;
