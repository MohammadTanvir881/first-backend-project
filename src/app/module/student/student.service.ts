import { Student } from '../student.module';
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
  const result = await Student.find();
  return result;
};

const getOneStudentDataFromDb = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.aggregate([{$match : {id : id}}])
  return result;
};
const deleteStudentData = async (id: string) => {
  const result = await Student.updateOne({ id } , {isDeleted : true});
  return result;
};

export const studentService = {
  // createStudentIntoDb,
  getAllStudentDataFromDb,
  getOneStudentDataFromDb,
  deleteStudentData,
};
