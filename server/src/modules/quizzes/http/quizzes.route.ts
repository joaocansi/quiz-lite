import { Router } from "express";
import QuizzesController from "./controllers/QuizzesController";
import QuizController from "./controllers/QuizController";

const quizzesController = new QuizzesController();
const quizController = new QuizController();

const quizzesRouter = Router();

quizzesRouter.post('/', quizzesController.create);
quizzesRouter.get('/result/:resultCode', quizzesController.read);
quizzesRouter.get('/:code', quizController.read);
quizzesRouter.delete('/:id', quizController.delete);

export default quizzesRouter;