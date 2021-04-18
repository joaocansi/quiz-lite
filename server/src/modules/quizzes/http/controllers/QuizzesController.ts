import { Request, Response } from "express";
import AppError from "../../../../shared/errors/AppError";
import CreateQuizService from "../../services/CreateQuizService";
import GetQuizResultService from "../../services/GetQuizResultService";

export default class QuizzesController {
  async create(req: Request, res: Response) {
    const { name, questions } = req.body;
    if (!name || !questions) {
      throw new AppError('Insuficient data', 404);
    }

    const createQuizService = new CreateQuizService();
    const createQuiz = await createQuizService.execute({
      name,
      questions
    });
    return res.json(createQuiz);
  }

  async read(req: Request, res: Response) {
    const { resultCode } = req.params;
    if (!resultCode) {
      throw new AppError('Insufficient data', 404);
    }

    const getQuizResultService = new GetQuizResultService();
    const getQuizResult = await getQuizResultService.execute(resultCode);

    return res.json(getQuizResult);
  }
}