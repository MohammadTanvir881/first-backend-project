import express, { NextFunction, Request, Response } from 'express';
import { AcademicSemesterController } from './academisSemester.controller';

const router = express.Router();

router.post(
  '/create-academic-semester',
  AcademicSemesterController.createAcademicSemester,
);

export const AcademicSemesterRouter = router;
