import { getRepository } from "typeorm";
import AppError from "../../../shared/errors/AppError";
import Quiz from "../typeorm/entities/Quiz";

export default class GetQuizResultService {
  public async execute(resultCode: string): Promise<Quiz> {
    const quizRepository = getRepository(Quiz);
    const findQuizByResultCode = await quizRepository.findOne({ where: { resultCode }, relations: ['players'] });

    if (!findQuizByResultCode) {
      throw new AppError('Quiz not found', 404);
    }
    return { ...findQuizByResultCode, questions: JSON.parse(findQuizByResultCode.questions) };
  }
}