import { Request, Response } from "express";
import AppError from "../../../../shared/errors/AppError";
import PlayQuizService from "../../services/PlayQuizService";

export default class PlayersController {
  async create(req: Request, res: Response) {
    const { hits, quiz_id, name } = req.body;
    if (hits < 0 || !quiz_id || !name) {
      throw new AppError('Insufficient data', 404);
    }

    const playQuizService = new PlayQuizService();
    const playQuiz = await playQuizService.execute({ hits, quiz_id, name });

    return res.json(playQuiz);
  }
}