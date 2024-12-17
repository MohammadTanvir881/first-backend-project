import catchAsync from '../utitls/catchAsync';
import { offeredCourseServices } from './offeredCourse.service';

const createOfferedCourse = catchAsync(async (req, res) => {
  const result = await offeredCourseServices.createOfferedCourseIntoDb(
    req.body,
  );

  res.status(200).json({
    success: true,
    message: 'Offered Course Created Successfully',
    res: result,
  });
});

const getAllOfferedCourse = catchAsync(async (req, res) => {
  const result = await offeredCourseServices.getAllOfferedCourseFromDb(
    req.params,
  );
  res.status(200).json({
    success: true,
    message: 'Offered course Retrieved Successfully',
    res: result,
  });
});
const getSingleOfferedCourse = catchAsync(async (req, res) => {
  const {id} = req.params
  const result = await offeredCourseServices.getSingleOfferedCourseFromDb(
    id
  );
  res.status(200).json({
    success: true,
    message: 'Offered Course Retrieved Successfully',
    res: result,
  });
});



const updateOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await offeredCourseServices.updateOfferedCourseIntoDb(
    id,
    req.body,
  );
  res.status(200).json({
    success: true,
    message: 'Offered Course updated Successfully',
    res: result,
  });
});

export const OfferedCourseController = {
  createOfferedCourse,
  updateOfferedCourse,
  getAllOfferedCourse,
  getSingleOfferedCourse
};
