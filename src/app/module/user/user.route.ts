import express, { NextFunction, Request, Response } from 'express';
import { userController } from './user.controller';
import studentZodValidationSchema from '../student/student.zod.validation';
import validateRequest from '../utitls/validateRequest';

const router = express.Router();



router.post('/create-student', validateRequest(studentZodValidationSchema), userController.createStudent);

export const UserRoutes = router;
