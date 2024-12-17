import { Router } from 'express';
import validateRequest from '../utitls/validateRequest';
import { OfferedCourseValidations } from './offeredCourse.validation';
import { OfferedCourseController } from './offeredCourse.controller';

const router = Router();

router.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseController.createOfferedCourse,
);

router.patch("/:id" , validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema) , OfferedCourseController.updateOfferedCourse)

router.get("/" , OfferedCourseController.getAllOfferedCourse)
router.get("/:id" , OfferedCourseController.getSingleOfferedCourse)

export const OfferedCourseRouter = router;
