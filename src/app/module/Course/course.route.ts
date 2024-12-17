import express from 'express';
import { CourseController } from './course.controller';
import validateRequest from '../utitls/validateRequest';
import { courseValidation } from './course.validation';

const router = express.Router();

router.get('/', CourseController.getAllCourse);

router.get('/:id', CourseController.getSingleCourse);

router.post(
  '/create-course',
  validateRequest(courseValidation.createCourseValidationSchema),
  CourseController.createCourse,
);
router.patch(
  '/:id',
  validateRequest(courseValidation.updateCourseValidationSchema),
  CourseController.updateCourse,
);

router.put(
  '/:courseId/assign-faculties',
  validateRequest(courseValidation.FacultyWithFacultyValidationSchema),
  CourseController.assignFacultiesWithCourse,
);
router.delete(
  '/:courseId/remove-faculties',
  validateRequest(courseValidation.FacultyWithFacultyValidationSchema),
  CourseController.removeFacultyFromCourse,
);

router.delete('/:id', CourseController.deleteCourse);

export const CourseRoutes = router;
