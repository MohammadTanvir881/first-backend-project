import catchAsync from '../utitls/catchAsync';
import { academicFacultyServices } from './academicFaculty.services';

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await academicFacultyServices.createAcademicFacultyIntoDb(
    req.body,
  );

  res.status(200).json({
    success: true,
    message: 'Academic Faculty Created Successfully',
    res: result,
  });
});

const findAllAcademicFaculty = catchAsync(async (req, res) => {
  const result = await academicFacultyServices.getAllAcademicFaculty();
  res.status(200).json({
    success: true,
    message: 'Academic Faculties Found Successfully',
    res: result,
  });
});

const findSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result =
    await academicFacultyServices.getSingleAcademicFaculty(facultyId);
  res.status(200).json({
    success: true,
    message: 'Academic Faculty Found Successfully',
    res: result,
  });
});

const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await academicFacultyServices.updateAcademicFacultyIntoDb(
    facultyId,
    req.body,
  );
  res.status(200).json({
    success: true,
    message: 'Academic Faculty updated Successfully',
    res: result,
  });
});

export const AcademicFacultyController = {
  createAcademicFaculty,
  findAllAcademicFaculty,
  findSingleAcademicFaculty,
  updateAcademicFaculty,
};
