
import catchAsync from '../utitls/catchAsync';
import { FacultyServices } from './faculty.service';

const getSingleFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacultyServices.getSingleFacultyFromDB( id );

  res.status(200).json({
    success: true,
    message: 'Faculty is retrieved Successfully',
    res: result,
  });
});

const getAllFaculties = catchAsync(async (req, res) => {
  const result = await FacultyServices.getAllFacultiesFromDB(req.query);

  res.status(200).json({
    success: true,
    message: 'Student is find Successfully',
    res: result,
  });
});

const updateFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { faculty } = req.body;
  const result = await FacultyServices.updateFacultyIntoDB( id , faculty);

  res.status(200).json({
    success: true,
    message: 'Faculty Updated Successfully',
    res: result,
  });
});

const deleteFaculty = catchAsync(async (req, res) => {
  const {  id } = req.params;
  const result = await FacultyServices.deleteFacultyFromDB(id);

  res.status(200).json({
    success: true,
    message: 'Faculty Deleted Successfully',
    res: result,
  });
});

export const FacultyControllers = {
  getAllFaculties,
  getSingleFaculty,
  deleteFaculty,
  updateFaculty,
};