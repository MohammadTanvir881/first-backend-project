import { NextFunction, Request, RequestHandler, Response } from 'express';
import { studentService } from './student.service';
import catchAsync from '../utitls/catchAsync';

// import studentValidationSchema from './student.joi.validation';
// import studentZodValidationSchema from './student.zod.validation';

// const createStudent = async (req: Request, res: Response) => {
//   try {
//     const { student } = req.body;

//     const zodParser = studentZodValidationSchema.parse(student);

//     //  const {error , value} = studentValidationSchema.validate(student)

//     // the data is pass to the service function
//     const result = await studentService.createStudentIntoDb(zodParser);

//     //  if(error){
//     //   res.status(500).json({
//     //     success: false,
//     //     message: 'Something went wrong',
//     //     error: error.details,
//     //   });
//     //  }

//     // sent response to clint side
//     res.status(200).json({
//       success: true,
//       message: 'Student Created Successfully',
//       res: result,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Something went wrong',
//       error: error,
//     });
//   }
// };

// catch async

// const catchAsync = (fn: RequestHandler) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     Promise.resolve(fn(req, res, next)).catch((err) => next(err));
//   };
// };

const getStudentData = catchAsync(async (req, res) => {
  const result = await studentService.getAllStudentDataFromDb();
  res.status(200).json({
    success: true,
    message: 'Student data search Successfully',
    res: result,
  });
});

const getOneStudentData = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await studentService.getOneStudentDataFromDb(studentId);
  res.status(200).json({
    success: true,
    message: 'single student data search Successfully',
    res: result,
  });
});

const updateStudentData = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const { student } = req.body;
  const result = await studentService.updateStudentDataIntoDb(studentId , student);
  res.status(200).json({
    success: true,
    message: 'student data updated Successfully',
    res: result,
  });
});

const deleteOneStudentData = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await studentService.deleteStudentData(studentId);
  res.status(200).json({
    success: true,
    message: 'single student data delete Successfully',
    res: result,
  });
});

export const studentController = {
  // createStudent,
  getStudentData,
  getOneStudentData,
  updateStudentData,
  deleteOneStudentData,
};
