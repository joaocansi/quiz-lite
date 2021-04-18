import { getRepository } from "typeorm";
import AppError from "../../../shared/errors/AppError";
import Quiz from "../typeorm/entities/Quiz";

export default class DeleteQuizService {
  public async execute(id: string): Promise<void> {
    const quizRepository = getRepository(Quiz);
    const findQuizById = await quizRepository.findOne({ where: { id } });

    if (!findQuizById) {
      throw new AppError('Quiz not found', 404);
    }

    await quizRepository.delete(id);
    return;
  }
}