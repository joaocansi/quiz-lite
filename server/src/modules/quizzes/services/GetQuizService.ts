import { getRepository } from "typeorm";
import AppError from "../../../shared/errors/AppError";
import Quiz from "../typeorm/entities/Quiz";

export default class GetQuizService {
  public async execute(code: string): Promise<Quiz> {
    const quizRepository = getRepository(Quiz);
    const findQuizByCode = await quizRepository.findOne({ where: { code } });

    if (!findQuizByCode) {
      throw new AppError('Quiz not found', 404);
    }
    return { ...findQuizByCode, questions: JSON.parse(findQuizByCode.questions) };
  }
}