import { Faculty } from './../Faculty/faculty.model';
import { Types } from 'mongoose';

export type TPreRequisiteCourses = {
  course: Types.ObjectId;
  isDeleted: boolean;
};

export type TCourse = {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisiteCourses: [TPreRequisiteCourses];
  isDeleted?: boolean;
};

export type TCourseFaculty = {
  course : Types.ObjectId;
  faculty : [Types.ObjectId]
}