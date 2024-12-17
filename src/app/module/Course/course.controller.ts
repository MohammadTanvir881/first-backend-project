import catchAsync from '../utitls/catchAsync';
import { CourseServices } from './course.service';

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDb(req.body);

  res.status(200).json({
    success: true,
    message: 'Course is created Successfully',
    res: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.getSingleCourseFromDb(id);

  res.status(200).json({
    success: true,
    message: 'Course retrieved Successfully',
    res: result,
  });
});

const getAllCourse = catchAsync(async (req, res) => {
  const query = req.params;
  const result = await CourseServices.getAllCourseFromDb(query);

  res.status(200).json({
    success: true,
    message: 'Course retrieved Successfully',
    res: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.updateCourseIntoDb(id, req.body);

  res.status(200).json({
    success: true,
    message: 'Course are updated Successfully',
    res: result,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.deleteCourseFromDb(id);

  res.status(200).json({
    success: true,
    message: 'Course deleted Successfully',
    res: result,
  });
});
const assignFacultiesWithCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculty } = req.body;
  const result = await CourseServices.assignFacultyWithCourse(
    courseId,
    faculty,
  );

  res.status(200).json({
    success: true,
    message: 'Course Faculty Assign Successfully',
    res: result,
  });
});
const removeFacultyFromCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculty } = req.body;
  const result = await CourseServices.removeFacultyFromCourseFromDb(
    courseId,
    faculty,
  );

  res.status(200).json({
    success: true,
    message: 'Course Faculty remove Successfully',
    res: result,
  });
});

export const CourseController = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  deleteCourse,
  updateCourse,
  assignFacultiesWithCourse,
  removeFacultyFromCourse
};
