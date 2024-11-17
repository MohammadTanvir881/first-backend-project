import { Request, Response } from 'express';
import { studentService } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student } = req.body;

    // the data is pass to the service function
    const result = await studentService.createStudentIntoDb(student);

    // sent response to clint side
    res.status(200).json({
      success: true,
      message: 'Student Created Successfully',
      res: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getStudentData = async (req: Request, res: Response) => {
  try {
    const result = await studentService.getAllStudentDataFromDb();
    res.status(200).json({
      success: true,
      message: 'Student data search Successfully',
      res: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getOneStudentData = async (req: Request, res: Response) => {
  try {
    const {studentId} = req.params;
    const result = await studentService.getOneStudentDataFromDb(studentId);
    res.status(200).json({
        success: true,
        message: 'single student data search Successfully',
        res: result,
      });
  } catch (error) {
    console.log(error);
  }
};

export const studentController = {
  createStudent,
  getStudentData,
  getOneStudentData,
};
