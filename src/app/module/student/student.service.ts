import mongoose from 'mongoose';
import { Student } from '../student.module';
import AppError from '../../Error/AppError';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';
import { number } from 'zod';
import QueryBuilder from '../../builder/QueryBuilder';
import { studentSearchableFields } from './studentConstant';
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

const getAllStudentDataFromDb = async (query: Record<string, unknown>) => {
  // console.log('base Query', query);
  // const queryObject = { ...query }; // copy
  // let searchTerm = '';
  // const studentSearchableFields = ['email', 'name.firstName', 'presentAddress'];
  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }

  // // HOW OUR FORMAT SHOULD BE FOR PARTIAL MATCH  :
  // //{ email: { $regex : query.searchTerm , $options: i}}
  // // { presentAddress: { $regex : query.searchTerm , $options: i}}
  // //{ 'name.firstName': { $regex : query.searchTerm , $options: i}}

  // const searchQuery = Student.find({
  //   $or: studentSearchableFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });

  // // FILTERING fUNCTIONALITY:
  // const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  // excludeFields.forEach((el) => delete queryObject[el]);

  // const filterQuery = searchQuery
  //   .find(queryObject)
  //   .populate('admissionSemester')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: {
  //       path: 'academicFaculty',
  //     },
  //   });

  // // SORTING FUNCTIONALITY:
  // let sort = '-createdAt';
  // if (query.sort) {
  //   sort = query.sort as string;
  // }

  // const sortQuery = filterQuery.sort(sort);

  // // PAGINATION FUNCTIONALITY:

  // let page = 1; // SET DEFAULT VALUE FOR PAGE
  // let limit = 1; // SET DEFAULT VALUE FOR LIMIT
  // let skip = 0; // SET DEFAULT VALUE FOR SKIP
  // if (query.limit) {
  //   limit = Number(query.limit);
  // }

  // // if page is given set it

  // if (query.page) {
  //   page = Number(query.page);
  //   skip = (page - 1) * limit;
  // }

  // const paginateQuery = sortQuery.skip(skip);

  // const limitQuery = paginateQuery.limit(limit);

  // // field query
  // let fields = '-__v';
  // if (query.fields) {
  //   fields = (query.fields as string).split(',').join(' ');
  //   console.log({ fields });
  // }

  // const fieldsQuery = await limitQuery.select(fields);
  // return fieldsQuery;

  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await studentQuery.modelQuery;
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
