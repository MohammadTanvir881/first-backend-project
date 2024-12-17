import catchAsync from '../utitls/catchAsync';
import { SemesterRegistrationServices } from './semesterRegestration.service';

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationServices.createSemesterRegistrationIntoDb(
      req.body,
    );

  res.status(200).json({
    success: true,
    message: 'Semester Registration Successfully',
    res: result,
  });
});
const getAllSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationServices.getAllSemesterRegistrationFromDb(
      req.body,
    );

  res.status(200).json({
    success: true,
    message: 'Semesters retrieved Successfully',
    res: result,
  });
});
const getSingleSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await SemesterRegistrationServices.getSingleRegistrationFromDb(id);

  res.status(200).json({
    success: true,
    message: 'Semester retrieved Successfully',
    res: result,
  });
});
const updateSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await SemesterRegistrationServices.updateSemesterRegistrationsIntoDb(id , req.body);

  res.status(200).json({
    success: true,
    message: 'Semester updated Successfully',
    res: result,
  });
});

export const SemesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
};
