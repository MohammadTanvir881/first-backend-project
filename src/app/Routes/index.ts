import { AcademicFacultyRouter } from './../module/AcademicFaculty/academicFacultyRoutes';
import { Router } from 'express';
import { studentRoutes } from '../module/student/student.route';
import { UserRoutes } from '../module/user/user.route';
import { AcademicSemesterRouter } from '../module/AcademicSemister/academicSemester.router';
import { AcademicDepartmentRouter } from '../module/AcademicDepertment/academicDepartmentRoutes';

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
