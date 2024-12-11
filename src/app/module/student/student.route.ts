import express from 'express';
import { studentController } from './student.controller';
import validateRequest from '../utitls/validateRequest';
import { updateStudentValidationSchema } from './student.zod.validation';

const router = express.Router();

// router.post("/create-student" , studentController.createStudent);
router.get('/', studentController.getStudentData);
router.get('/:studentId', studentController.getOneStudentData);
router.patch(
  '/:studentId',
  validateRequest(updateStudentValidationSchema),
  studentController.updateStudentData,
);
router.delete('/:studentId', studentController.deleteOneStudentData);

export const studentRoutes = router;
