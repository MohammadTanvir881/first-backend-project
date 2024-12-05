import {
  Months,
  TAcademicSemesterCode,
  TMonths,
  academicSemesterCode,
  academicSemesterName,
} from './academicSemesterConstant';
import { Schema, model, connect } from 'mongoose';
import { TAcademicSemester } from './academisSemisterInterface';

const months: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    enum: academicSemesterName,
    required: true,
  },
  code: {
    type: String,
    enum: academicSemesterCode,
  },
  year: {
    type: String,
    required: true,
  },
  startMonth: {
    type: String,
    enum: Months,
    required: true,
  },
  endMonth: {
    type: String,
    enum: Months,
    required: true,
  },
});

academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSemester.findOne({
    name: this.name,
    year: this.year,
  });

  if(isSemesterExists){
    throw new Error("This semester is already exists")
  }
  next()
});

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
