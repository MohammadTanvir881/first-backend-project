import { academicSemesterCodeMapper } from './academicSemesterConstant';
import { AcademicSemester } from './academicSemisterModel';
import { TAcademicSemester } from './academisSemisterInterface';

const createAcademicSemesterIntoMongoDb = async (
  payload: TAcademicSemester,
) => {
  // semester name ==>> semester code

  if (academicSemesterCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid semester code');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllAcademicSemester = async () => {
  const result = await AcademicSemester.find();
  return result;
};

const getSingleSemester = async (id: string) => {
  const result = await AcademicSemester.findById(id);
  return result;
};

const updateAcademicSemesterIntoDb = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('Invalid semester code');
  }
  const result = await AcademicSemester.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true },
  );
  return result;
};

export const academicSemesterServices = {
  createAcademicSemesterIntoMongoDb,
  getAllAcademicSemester,
  getSingleSemester,
  updateAcademicSemesterIntoDb,
};
