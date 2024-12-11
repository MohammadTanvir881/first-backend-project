import mongoose from 'mongoose';
import { Student } from '../student.module';
import AppError from '../../Error/AppError';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';
// import { TStudent } from './student.interface';

// const createStudentIntoDb = async (studentData: TStudent) => {
//   if (await Student.isUserExists(studentData.id)) {
//     throw Error('User Already Exists');
//   }

//   const result = await Student.create(studentData);

//   // const student = new Student(studentData);  // built in inheritance method
//   // if( await student.isUserExists(studentData.id)){
//   //   throw Error ("User Already Exists")
//   // }
//   // const result = await student.save();
//   return result;
// };

const getAllStudentDataFromDb = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const getOneStudentDataFromDb = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const updateStudentDataIntoDb = async (
  id: string,
  payload: Partial<TStudent>,
) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteStudentData = async (id: string) => {
  const existingStudent = await Student.findOne({ id });
  if (!existingStudent) {
    throw new AppError(500, 'This student is not Exists');
  }
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // transition-1
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteStudentData) {
      throw new AppError(500, 'Failed to delete a student');
    }
    // transition-2
    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(500, 'Failed to delete a user');
    }

    session.commitTransaction();
    session.endSession();
    return deletedStudent;
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    throw new AppError(500, 'Failed to create a student');
  }
};

export const studentService = {
  // createStudentIntoDb,
  getAllStudentDataFromDb,
  getOneStudentDataFromDb,
  updateStudentDataIntoDb,
  deleteStudentData,
};
