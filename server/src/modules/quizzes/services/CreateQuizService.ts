import { getRepository } from "typeorm";
import AppError from "../../../shared/errors/AppError";

import IQuiz from "../dtos/IQuiz";
import Quiz from "../typeorm/entities/Quiz";

import crypto from 'crypto';

export default class CreateQuizService {
  public async execute(quiz: IQuiz): Promise<Quiz> {
    const repository = getRepository(Quiz);
    if (quiz.questions.length < 1) {
      throw new AppError('Quiz cannot be created without a question.', 400);
    }

    for (let a = 0; a < quiz.questions.length; a++) {
      const question = quiz.questions[a];
      if (question.answers.length < 2) {
        throw new AppError('Quiz cannot be created when there is no more than one option', 400);
      }
      const filterByCorrectAnswers = question.answers.filter(item => item.correct === true);
      if (filterByCorrectAnswers.length !== 1) {
        throw new AppError('Quiz cannot be created when there is more or less than one answer correct', 400);
      }
    }

    const convertQuestionsToJSON = JSON.stringify(quiz.questions);
    const createQuiz = repository.create({
      code: crypto.randomBytes(10).toString('hex'),
      resultCode: crypto.randomBytes(8).toString('hex'),
      name: quiz.name,
      questions: convertQuestionsToJSON,
      players: [],
    });

    await repository.save(createQuiz);
    return createQuiz;
  }
}