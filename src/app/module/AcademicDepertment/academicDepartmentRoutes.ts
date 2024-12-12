import express, { Router } from 'express';
import validateRequest from '../utitls/validateRequest';
import { academicDepartmentValidation } from './academicDepartmentValidation';
import { academicDepartmentController } from './academicDepartmentController';

const router = Router();

router.post(
  '/create-academic-department',
  // validateRequest(
  //   academicDepartmentValidation.createAcademicDepartmentValidationSchema,
  // ),
  academicDepartmentController.createAcademicDepartment,
);

router.get('/', academicDepartmentController.getAllAcademicDepartment);

router.get(
  '/:academicDepartmentId',
  academicDepartmentController.getSingleAcademicDepartment,
);

router.patch(
  '/:academicDepartmentId',
  validateRequest(
    academicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  academicDepartmentController.updateAcademicDepartment,
);

export const AcademicDepartmentRouter = router;
