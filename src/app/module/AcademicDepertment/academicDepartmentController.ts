import { Request, Response } from 'express';
import { academicDepartmentServices } from './academicDepartmentServices';
import catchAsync from '../utitls/catchAsync';

const createAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await academicDepartmentServices.createAcademicDepartmentIntoDb(req.body);

  res.status(200).json({
    status: true,
    message: 'Academic Department Created Successfully',
    res: result,
  });
});

const getAllAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await academicDepartmentServices.getAllAcademicDepartmentFromDb();

  res.status(200).json({
    status: true,
    message: 'Academic Departments retrieved Successfully',
    res: result,
  });
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { academicDepartmentId } = req.params;
  const result =
    await academicDepartmentServices.getSingleAcademicDepartmentFromDb(
      academicDepartmentId,
    );

  res.status(200).json({
    status: true,
    message: 'Academic Department retrieved Successfully',
    res: result,
  });
});

const updateAcademicDepartment = catchAsync(async (req, res) => {
  const { academicDepartmentId } = req.params;
  const result =
    await academicDepartmentServices.updateAcademicDepartmentIntoDb(
      academicDepartmentId,
      req.body,
    );

  res.status(200).json({
    status: true,
    message: 'Academic Department updated Successfully',
    res: result,
  });
});

export const academicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
