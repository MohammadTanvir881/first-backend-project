import config from '../../config';
import { AcademicSemester } from '../AcademicSemister/academicSemisterModel';
import { TAcademicSemester } from '../AcademicSemister/academisSemisterInterface';
import { Student } from '../student.module';
import { TStudent } from '../student/student.interface';
import {  TUser } from './user.interface';
import { User } from './user.model';
import { generatedStudentID } from './user.utlis';

const createStudentIntoDb = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = "student"




  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(payload.admissionSemester)


  // set  generated id 
  userData.id =await generatedStudentID(admissionSemester);


  // create a user 
  const newUser = await User.create(userData);

  if(Object.keys(newUser).length){
    // set id , _id as student
    payload.id = newUser.id;
    payload.user = newUser._id // reference id
    const newStudent = await Student.create(payload);
    return newStudent;
  }


};

export const userServices = {
  createStudentIntoDb,
};
