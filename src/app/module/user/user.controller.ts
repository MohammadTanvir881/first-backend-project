import { NextFunction, Request, RequestHandler, Response } from 'express';
import { userServices } from './user.service';
import catchAsync from '../utitls/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;
  console.log(password, studentData);

  //   const zodParser = studentZodValidationSchema.parse(student);

  //  const {error , value} = studentValidationSchema.validate(student)

  // the data is pass to the service function
  const result = await userServices.createStudentIntoDb(password, studentData);

  //  if(error){
  //   res.status(500).json({
  //     success: false,
  //     message: 'Something went wrong',
  //     error: error.details,
  //   });
  //  }

  // sent response to clint side
  res.status(200).json({
    success: true,
    message: 'Student Created Successfully',
    res: result,
  });
});

export const userController = {
  createStudent,
};
