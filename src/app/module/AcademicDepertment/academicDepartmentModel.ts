import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './academicDepertmentInterface';
import AppError from '../../Error/AppError';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
  },
);

academicDepartmentSchema.pre('save', async function (next) {
  const isDepartmentExists = await AcademicDepartment.findOne({
    name: this.name,
  });
  if (isDepartmentExists) {
    throw new Error('This Department Is Already Exists');
  }
  next();
});

// academicDepartmentSchema.pre('findOne', async function (next) {
//   const query = this.getQuery();
//   console.log(query)
//   const isDepartmentExists = await AcademicDepartment.exists(query);
//   if (!isDepartmentExists) {
//     throw new Error('This Department is Not Exists');
//   }
//   next()
// });



academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  // console.log(query)
  const isDepartmentExists = await AcademicDepartment.findOne(query);
  if (!isDepartmentExists) {
    throw new AppError(404,'This Department is Not Exists');
  }
  next()
});

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
