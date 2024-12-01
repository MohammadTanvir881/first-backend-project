import { TAcademicSemesterCode, TAcademicSemesterName, TMonths } from "./academicSemesterConstant";

export type TAcademicSemester = {
  name: TAcademicSemesterName;
  code: TAcademicSemesterCode
  year: Date;
  startMonth: TMonths;
  endMonth: TMonths;
};
