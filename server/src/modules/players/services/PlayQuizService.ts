import { getRepository } from "typeorm";
import AppError from "../../../shared/errors/AppError";
import Quiz from "../../quizzes/typeorm/entities/Quiz";
import PlayQuizDTO from "../dtos/PlayQuizDTO";
import Player from "../typeorm/entities/Player";

export default class PlayQuizService {
  public async execute(data: PlayQuizDTO): Promise<Player> {
    const { hits, name, quiz_id } = data;
    const playersRepository = getRepository(Player);

    const quizRepository = getRepository(Quiz);
    const findQuizById = await quizRepository.findOne({ where: { id: quiz_id } });

    if (!findQuizById) {
      throw new AppError('Quiz not found', 404);
    }

    const createPlayer = playersRepository.create({
      hits, name, quiz_id
    });
    await playersRepository.save(createPlayer);
    return createPlayer;
  }
}