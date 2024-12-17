import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../AcademicSemister/academicSemisterModel';
import { TAcademicSemester } from '../AcademicSemister/academisSemisterInterface';
import { Student } from '../student.module';
import { TStudent } from '../student/student.interface';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateFacultyId, generatedStudentID } from './user.utlis';
import AppError from '../../Error/AppError';
import { TFaculty } from '../Faculty/faculty.interface';
import { AcademicDepartment } from '../AcademicDepertment/academicDepartmentModel';
import { Faculty } from '../Faculty/faculty.model';

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


const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'faculty';

  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(500, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(500, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const userServices = {
  createStudentIntoDb,
  createFacultyIntoDB
};
