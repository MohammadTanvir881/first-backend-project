import { AcademicDepartment } from './academicDepartmentModel';
import { TAcademicDepartment } from './academicDepertmentInterface';

const createAcademicDepartmentIntoDb = async (payLoad: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payLoad);
  return result;
};

const getAllAcademicDepartmentFromDb = async () => {
  const result = await AcademicDepartment.find().populate("academicFaculty");
  return result;
};

const getSingleAcademicDepartmentFromDb = async (id: string) => {
  const result = await AcademicDepartment.findOne({_id : id}).populate("academicFaculty");
  return result;
};

const updateAcademicDepartmentIntoDb = async (
  id: string,
  payLoad: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payLoad,
    { new: true },
  );
  return result;
};

export const academicDepartmentServices = {
  createAcademicDepartmentIntoDb,
  getAllAcademicDepartmentFromDb,
  getSingleAcademicDepartmentFromDb,
  updateAcademicDepartmentIntoDb,
};
