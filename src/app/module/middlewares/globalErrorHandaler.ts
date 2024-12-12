import { ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';
import config from '../../config';
import { TErrorSource, TGenericErrorResponse } from '../../interface/error';
import handleZodError from '../../Error/zodValidationError';
import mongoose from 'mongoose';
import handleValidationError from '../../Error/validationError';
import handleCastError from '../../Error/handleCastError';
import handleDuplicateError from '../../Error/handleDuplicateError';
import AppError from '../../Error/AppError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode =  500;
  let message =  'Something went wrong';

  let errorSource: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simplifyError = handleZodError(err);
    statusCode = simplifyError.statusCode;
    message = simplifyError.message;
    errorSource = simplifyError.errorSource;
  } else if (err?.name === 'ValidationError') {
    const simplifyValidationError = handleValidationError(err);
    statusCode = simplifyValidationError.statusCode;
    message = simplifyValidationError.message;
    errorSource = simplifyValidationError.errorSource;
  } else if (err?.name === 'CastError') {
    const simplifyError = handleCastError(err);
    statusCode = simplifyError.statusCode;
    message = simplifyError.message;
    errorSource = simplifyError.errorSource;
  } else if (err?.code === 11000) {
    const simplifyError = handleDuplicateError(err);
    statusCode = simplifyError.statusCode;
    message = simplifyError.message;
    errorSource = simplifyError.errorSource;
  }
   else if (err instanceof AppError) {
     statusCode = err?.statusCode;
     message = err?.message;
     errorSource = [{
      path : '',
      message : err.message
     }]
  }
   else if (err instanceof Error) {
     message = err?.message;
     errorSource = [{
      path : '',
      message : err.message
     }]
  }
  return res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    // err,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;

/*


*/
