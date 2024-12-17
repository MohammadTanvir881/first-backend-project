import { semesterRegistrationStatus } from './../SemesterRegistration/semesterRegistration.constant';
import AppError from '../../Error/AppError';
import { AcademicDepartment } from '../AcademicDepertment/academicDepartmentModel';
import { AcademicFaculty } from '../AcademicFaculty/academicFacultyModel';
import { Course } from '../Course/course.model';
import { Faculty } from '../Faculty/faculty.model';
import { SemesterRegistration } from '../SemesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';
import { hasTimeConflict } from './offeredCourse.ulties';
import QueryBuilder from '../../builder/QueryBuilder';

const createOfferedCourseIntoDb = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    section,
    faculty,
    days,
    startTime,
    endTime,
  } = payload;

  const isSemesterRegistrationExists =
    await SemesterRegistration.findById(semesterRegistration);

  if (!isSemesterRegistrationExists) {
    throw new AppError(404, 'Semester Registration Not Found');
  }
  const isAcademicFacultyExists =
    await AcademicFaculty.findById(academicFaculty);

  if (!isAcademicFacultyExists) {
    throw new AppError(404, 'Academic Faculty Not Found');
  }
  const isAcademicDepartmentExists =
    await AcademicDepartment.findById(academicDepartment);

  if (!isAcademicDepartmentExists) {
    throw new AppError(404, 'Academic Department Not Found');
  }
  const isCourseExists = await Course.findById(course);

  if (!isCourseExists) {
    throw new AppError(404, 'Course Not Found');
  }
  const isFacultyExists = await Faculty.findById(faculty);

  if (!isFacultyExists) {
    throw new AppError(404, 'Faculty Not Found');
  }

  // check if academic department is belongs to academic faculty

  const isAcademicDepartmentBelongToAcademicFaculty =
    await AcademicDepartment.findOne({
      _id: academicDepartment,
      academicFaculty,
    });

  if (!isAcademicDepartmentBelongToAcademicFaculty) {
    throw new AppError(
      500,
      `${isAcademicDepartmentExists.name} is not belongs to ${isAcademicFacultyExists.name}`,
    );
  }

  const isSameOfferedCourseExistsWithSameSemesterRegistrationWithSameSection =
    await OfferedCourse.findOne({
      semesterRegistration,
      course,
      section,
    });

  if (isSameOfferedCourseExistsWithSameSemesterRegistrationWithSameSection) {
    throw new AppError(
      500,
      'Offered Course with same section is already exists',
    );
  }

  // get the schedules of the faculties

  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  // console.log(assignedSchedules);

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      500,
      'This Faculty is Not Available at that time ! Choose other time or date',
    );
  }

  const academicSemester = isSemesterRegistrationExists.academicSemester;

  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

const getAllOfferedCourseFromDb = async (query: Record<string, unknown>) => {
  const getAllOfferedCOurseQuery = new QueryBuilder(OfferedCourse.find().populate("semesterRegistration"), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await getAllOfferedCOurseQuery.modelQuery;
  return result;
};

const getSingleOfferedCourseFromDb = async (id: string) => {
  const isOfferedCourseExists = await OfferedCourse.findById(id);
  if (!isOfferedCourseExists) {
    throw new AppError(404, 'Offered Course Not Found');
  }
  const result = isOfferedCourseExists;
  return result;
};

const updateOfferedCourseIntoDb = async (
  id: string,
  payload: Partial<TOfferedCourse>,
) => {
  /**
   * Step 1: check if the offered course exists
   * Step 2: check if the faculty exists
   * Step 3: check if the semester registration status is upcoming
   * Step 4: check if the faculty is available at that time. If not then throw error
   * Step 5: update the offered course
   */
  const { faculty, days, startTime, endTime } = payload;
  const isOfferedCourseExists = await OfferedCourse.findById(id);
  if (!isOfferedCourseExists) {
    throw new AppError(404, 'Offered Course Not Found');
  }

  const isFacultyExists = await Faculty.findById(faculty);
  if (!isFacultyExists) {
    throw new AppError(404, 'Faculty Not Found');
  }

  const semesterRegistration = isOfferedCourseExists.semesterRegistration;
  const semesterRegistrationStatus =
    await SemesterRegistration.findById(semesterRegistration);

  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      500,
      `You cannot update this offered course because it is now ${semesterRegistrationStatus?.status}`,
    );
  }

  // get the schedules of the faculties

  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  // console.log(assignedSchedules);

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      500,
      'This Faculty is Not Available at that time ! Choose other time or date',
    );
  }

  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const offeredCourseServices = {
  createOfferedCourseIntoDb,
  updateOfferedCourseIntoDb,
  getAllOfferedCourseFromDb,
  getSingleOfferedCourseFromDb
};
