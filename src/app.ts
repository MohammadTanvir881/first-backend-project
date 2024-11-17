import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { studentRoutes } from './app/module/student/student.route';
const app: Application = express();

app.use(express.json());
app.use(cors());

// application routes
app.use("/api/v1/students" , studentRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello');
});

export default app;
