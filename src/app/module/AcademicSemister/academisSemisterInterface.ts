import { TAcademicSemesterCode, TAcademicSemesterName, TMonths } from "./academicSemesterConstant";

export type TAcademicSemester = {
  name: TAcademicSemesterName;
  code: TAcademicSemesterCode
  year: string;
  startMonth: TMonths;
  endMonth: TMonths;
};
