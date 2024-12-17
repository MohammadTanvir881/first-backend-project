import { Query } from 'mongoose';
import AppError from '../../Error/AppError';
import { AcademicSemester } from '../AcademicSemister/academicSemisterModel';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { RegistrationStatus } from './semesterRegistration.constant';

const createSemesterRegistrationIntoDb = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload.academicSemester;

  //check if there any registered semester that is already "Upcoming" |"Ongoing";
  const isThereAnyUpcomingOrOngoingSemesterExists =
    await SemesterRegistration.findOne({
      $or: [{ status: RegistrationStatus.UPCOMING }, { status: RegistrationStatus.ONGOING }],
    });

  if (isThereAnyUpcomingOrOngoingSemesterExists) {
    throw new AppError(
      500,
      `There is already a ${isThereAnyUpcomingOrOngoingSemesterExists.status} registered semester`,
    );
  }

  // check if the academicSemester is not exists in the database
  const isAcademicSemesterExists = await AcademicSemester.findOne({
    _id: academicSemester,
  });
  if (!isAcademicSemesterExists) {
    throw new AppError(404, 'Academic Semester not Found ');
  }

  // check if the semester is already registered
  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });

  if (isSemesterRegistrationExists) {
    throw new AppError(409, 'This Semester is already Registered');
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationFromDb = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

const getSingleRegistrationFromDb = async (id: string) => {
  const result =
    await SemesterRegistration.findById(id).populate('academicSemester');
  return result;
};

const updateSemesterRegistrationsIntoDb = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
 
    // check if the semester is exists 
    const isSemesterRegistrationIsExists = await SemesterRegistration.findById(id);

    if(!isSemesterRegistrationIsExists){
        throw new AppError (500 , "This Semester is not Exists")
    }

  const currentSemesterStatus = isSemesterRegistrationIsExists.status;
  const requestedSemesterStatus = payload?.status;

  if (currentSemesterStatus === 'ENDED') {
    throw new AppError(
      500,
      `This Semester is Already ${currentSemesterStatus}`,
    );
  }

  // logic UPCOMING => ONGOING => ENDED
   
  if(currentSemesterStatus === RegistrationStatus.UPCOMING && requestedSemesterStatus === RegistrationStatus.ENDED){
    throw new AppError(500 , `You cannot directly update semester from ${currentSemesterStatus} to ${requestedSemesterStatus}`)
  }
  if(currentSemesterStatus === RegistrationStatus.ONGOING && requestedSemesterStatus === RegistrationStatus.UPCOMING){
    throw new AppError(500 , `You cannot directly update semester from ${currentSemesterStatus} to ${requestedSemesterStatus}`)
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id , payload , {new : true , runValidators : true})
  return result



};



export const SemesterRegistrationServices = {
  createSemesterRegistrationIntoDb,
  getAllSemesterRegistrationFromDb,
  getSingleRegistrationFromDb,
  updateSemesterRegistrationsIntoDb,
};
