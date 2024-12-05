import express from 'express';
import { AcademicFacultyController } from './academicFacultyController';
import validateRequest from '../utitls/validateRequest';
import { academicFacultyValidation } from './academicFacultyValidation';

const router = express.Router();

router.get('/', AcademicFacultyController.findAllAcademicFaculty);

router.get('/:facultyId', AcademicFacultyController.findSingleAcademicFaculty);
router.patch(
  '/:facultyId',
  validateRequest(
    academicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.updateAcademicFaculty,
);

router.post(
  '/create-academic-faculty',
  validateRequest(
    academicFacultyValidation.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.createAcademicFaculty,
);

export const AcademicFacultyRouter = router;
