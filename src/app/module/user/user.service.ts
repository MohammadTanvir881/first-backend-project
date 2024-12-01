import config from '../../config';
import { Student } from '../student.module';
import { TStudent } from '../student/student.interface';
import {  TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDb = async (password: string, studentData: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = "student"

  // set manually generated id 
  userData.id = "20301000001"


  // create a user 
  const newUser = await User.create(userData);

  if(Object.keys(newUser).length){
    // set id , _id as student
    studentData.id = newUser.id;
    studentData.user = newUser._id // reference id
    const newStudent = await Student.create(studentData);
    return newStudent;
  }


};

export const userServices = {
  createStudentIntoDb,
};
