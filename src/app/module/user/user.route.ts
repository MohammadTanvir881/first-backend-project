import express, { NextFunction, Request, Response } from 'express';
import { userController } from './user.controller';
import studentZodValidationSchema from '../student/student.zod.validation';
import validateRequest from '../utitls/validateRequest';
import { FacultyValidations } from '../Faculty/faculty.validation';

const router = express.Router();



router.post('/create-student', validateRequest(studentZodValidationSchema), userController.createStudent);

router.post(
    '/create-faculty',
    validateRequest(FacultyValidations.createFacultyValidationSchema),
    userController.createFaculty,
  );

export const UserRoutes = router;
