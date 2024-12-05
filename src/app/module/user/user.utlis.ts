import { TAcademicSemester } from '../AcademicSemister/academisSemisterInterface';
import { User } from './user.model';



const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastStudent?.id ? lastStudent.id : undefined;
};

// 2026 02 0001
export const generatedStudentID = async (payload: TAcademicSemester) => {
  let currentId = (0).toString(); //0000 by default
  const lastStudentId = await findLastStudentId();
  const lastStudentSemesterCode = lastStudentId?.substring(4 , 6);
  const lastStudentYear = lastStudentId?.substring(0,4);
  const currentStudentSemesterCode = payload.code;
  const currentStudentYear = payload.year;

  if(lastStudentId && lastStudentSemesterCode===currentStudentSemesterCode && lastStudentYear===currentStudentYear){
    currentId = lastStudentId?.substring(6)
  }


  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};
