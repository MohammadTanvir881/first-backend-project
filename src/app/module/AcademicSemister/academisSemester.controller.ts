
import catchAsync from '../utitls/catchAsync';

const createAcademicSemester = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  const result = await userServices.createStudentIntoDb(password, studentData);

  res.status(200).json({
    success: true,
    message: 'Student Created Successfully',
    res: result,
  });
});

export const AcademicSemesterController = {
    createAcademicSemester
};
