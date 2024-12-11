import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../AcademicSemister/academicSemisterModel';
import { TAcademicSemester } from '../AcademicSemister/academisSemisterInterface';
import { Student } from '../student.module';
import { TStudent } from '../student/student.interface';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generatedStudentID } from './user.utlis';
import AppError from '../../Error/AppError';

const createStudentIntoDb = async (password: string, payload: TStudent) => {

  // create a user object
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = 'student';

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  const session = await mongoose.startSession();

  try {
  
     session.startTransaction()
    // set  generated id
    userData.id = await generatedStudentID(admissionSemester);

    // create a user (transactions -1)
    const newUser = await User.create([userData], {session});

    if(!newUser.length){
      throw new AppError(500, "Failed to create a user")
    }

      // set id , _id as student
      payload.id = newUser[0].id;
      payload.user = newUser[0]._id; // reference id

      // create a student (transaction-2)
      const newStudent = await Student.create([payload] , {session});
      if(!newStudent.length){
        throw new AppError(500, "Failed to create a student")
      }
      await session.commitTransaction();
      await session.endSession()
      return newStudent;
    
  } catch (error) {
    session.abortTransaction();
    session.endSession()
    throw new AppError(500 , "Failed to create a new student")
  }
};

export const userServices = {
  createStudentIntoDb,
};
