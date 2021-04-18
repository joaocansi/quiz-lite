import 'reflect-metadata';

import express from 'express';
import 'express-async-errors';

import cors from 'cors';
import './shared/database/connection';

import { expressAsyncErrorsHandler } from './shared/errors/AppError';
import quizzesRouter from './modules/quizzes/http/quizzes.route';
import playersRouter from './modules/players/http/players.route';

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

app.use('/quizzes', quizzesRouter);
app.use('/players', playersRouter)
app.use(expressAsyncErrorsHandler);

app.listen(3333);
