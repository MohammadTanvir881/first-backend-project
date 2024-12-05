
import catchAsync from '../utitls/catchAsync';
import { academicSemesterServices } from './academicSemisterServices';

const createAcademicSemester = catchAsync(async (req, res) => {
  const result =
    await academicSemesterServices.createAcademicSemesterIntoMongoDb(req.body);

  res.status(200).json({
    success: true,
    message: 'Student Created Successfully',
    res: result,
  });
});

const findAllAcademicSemester = catchAsync(async (req, res) => {
  const result = await academicSemesterServices.getAllAcademicSemester();
  res.status(200).json({
    success: true,
    message: 'Academic Semester Found Successfully',
    res: result,
  });
});

const findSingleAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result = await academicSemesterServices.getSingleSemester(semesterId);
  res.status(200).json({
    success: true,
    message: 'Academic Semester Found Successfully',
    res: result,
  });
});

const updateAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result = await academicSemesterServices.updateAcademicSemesterIntoDb(semesterId , req.body);
  res.status(200).json({
    success: true,
    message: 'Academic Semester updated Successfully',
    res: result,
  });
})

export const AcademicSemesterController = {
  createAcademicSemester,
  findAllAcademicSemester,
  findSingleAcademicSemester,
  updateAcademicSemester
};
