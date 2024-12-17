import { AcademicFacultyRouter } from './../module/AcademicFaculty/academicFacultyRoutes';
import { Router } from 'express';
import { studentRoutes } from '../module/student/student.route';
import { UserRoutes } from '../module/user/user.route';
import { AcademicSemesterRouter } from '../module/AcademicSemister/academicSemester.router';
import { AcademicDepartmentRouter } from '../module/AcademicDepertment/academicDepartmentRoutes';
import { FacultyRoutes } from '../module/Faculty/faculty.route';
import { AdminRoutes } from '../module/Admin/admin.route';
import { CourseRoutes } from '../module/Course/course.route';
import { SemesterRegistrationRouter } from '../module/SemesterRegistration/semesterRegistration.route';
import { OfferedCourseRouter } from '../module/Offered Course/offeredCourse.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/students',
    route: studentRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semester',
    route: AcademicSemesterRouter,
  },
  {
    path: '/academic-faculty',
    route: AcademicFacultyRouter,
  },
  {
    path: '/academic-department',
    route: AcademicDepartmentRouter,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
  {
    path: '/semester-registration',
    route: SemesterRegistrationRouter,
  },
  {
    path: '/offered-course',
    route: OfferedCourseRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
