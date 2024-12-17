import express from 'express';
import validateRequest from '../utitls/validateRequest';
import { semesterRegistrationValidation } from './semesterRegestration.validation';
import { SemesterRegistrationController } from './semesterRegistration.controller';

const router = express.Router();

router.post(
  '/create-semester-registration',
  validateRequest(
    semesterRegistrationValidation.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.createSemesterRegistration,
);

router.get('/', SemesterRegistrationController.getAllSemesterRegistration);
router.get(
  '/:id',
  SemesterRegistrationController.getSingleSemesterRegistration,
);

router.patch("/:id" , validateRequest(semesterRegistrationValidation.updateSemesterRegistrationValidationSchema), SemesterRegistrationController.updateSemesterRegistration)

export const SemesterRegistrationRouter = router;
