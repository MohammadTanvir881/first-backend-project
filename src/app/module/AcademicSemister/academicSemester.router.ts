import express, { NextFunction, Request, Response } from 'express';
import { AcademicSemesterController } from './academisSemester.controller';
import validateRequest from '../utitls/validateRequest';
import { academicSemesterValidation } from './academisSemesterValidation';

const router = express.Router();

router.get('/', AcademicSemesterController.findAllAcademicSemester);

router.get(
  '/:semesterId',
  AcademicSemesterController.findSingleAcademicSemester,
);
router.patch(
  '/:semesterId',
  validateRequest(academicSemesterValidation.updateAcademicSemesterValidation),
  AcademicSemesterController.updateAcademicSemester,
);

router.post(
  '/create-academic-semester',
  validateRequest(
    academicSemesterValidation.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.createAcademicSemester,
);

export const AcademicSemesterRouter = router;
