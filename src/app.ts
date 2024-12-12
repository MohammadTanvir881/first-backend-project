import express, {
  Application,
  NextFunction,
  Request,
  Response,
  response,
} from 'express';
import cors from 'cors';
import { studentRoutes } from './app/module/student/student.route';
import { UserRoutes } from './app/module/user/user.route';
import globalErrorHandler from './app/module/middlewares/globalErrorHandaler';
import notFound from './app/module/middlewares/notFound';
import router from './app/Routes';

const app: Application = express();

app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1', router);

const test = async (req: Request, res: Response) => {
  const a = 5
};

app.get('/', test);

app.use(globalErrorHandler);

// not found
app.use(notFound);

export default app;
