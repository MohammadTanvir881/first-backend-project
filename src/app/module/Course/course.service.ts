import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { TCourse, TCourseFaculty } from './course.interface';
import { courseSearchableFields } from './course.constant';
import { Course, CourseFaculty } from './course.model';
import AppError from '../../Error/AppError';

const createCourseIntoDb = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCourseFromDb = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(courseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCourseFromDb = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};

const updateCourseIntoDb = async (id: string, payload: Partial<TCourse>) => {
  const session = await mongoose.startSession();

  const { preRequisiteCourses, ...courseRemainingData } = payload;
  // basic course info update
  try {
    session.startTransaction();
    const updateBasicCourseIntoDb = await Course.findByIdAndUpdate(
      id,
      courseRemainingData,
      { new: true, runValidators: true, session },
    );

    if (!updateBasicCourseIntoDb) {
      throw new AppError(500, 'Failed to Update a Course');
    }

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      // check if there is any pre requisite course to update
      const deletedPreRequisitesCourses = preRequisiteCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);

      const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: {
              course: { $in: deletedPreRequisitesCourses },
            },
          },
        },
        { new: true, runValidators: true, session },
      );

      if (!deletedPreRequisiteCourses) {
        throw new AppError(500, 'Failed to update a course');
      }

      const newPreRequisite = preRequisiteCourses?.filter(
        (el) => el.course && !el.isDeleted,
      );
      console.log({ newPreRequisite });

      const newPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPreRequisite } },
        },
        { new: true, runValidators: true, session },
      );
      if (!newPreRequisiteCourses) {
        throw new AppError(500, 'Failed to update a Course');
      }
    }

    session.commitTransaction();
    session.endSession();

    const result = await Course.findById(id).populate(
      'preRequisiteCourses.course',
    );

    return result;
  } catch (error) {
    session.commitTransaction();
    session.endSession();
    throw new AppError(500, 'Failed to Update a course');
  }
};

const deleteCourseFromDb = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

const assignFacultyWithCourse = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculty: { $each: payload } },
    },
    {
      upsert: true,
      new: true,
    },
  );
  return result
};
const removeFacultyFromCourseFromDb = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull : {faculty : {$in : payload}}
    },
    {
      new: true,
    },
  );
  return result
};

export const CourseServices = {
  createCourseIntoDb,
  getAllCourseFromDb,
  getSingleCourseFromDb,
  deleteCourseFromDb,
  updateCourseIntoDb,
  assignFacultyWithCourse,
  removeFacultyFromCourseFromDb
};
