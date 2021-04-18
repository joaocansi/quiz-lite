import { Request, Response } from "express";
import AppError from "../../../../shared/errors/AppError";
import DeleteQuizService from "../../services/DeleteQuizService";
import GetQuizService from "../../services/GetQuizService";

export default class QuizController {
  async read(req: Request, res: Response) {
    const { code } = req.params;
    if (!code) {
      throw new AppError('Insufficient data', 404);
    }

    const getQuizService = new GetQuizService();
    const getQuiz = await getQuizService.execute(code);

    return res.json(getQuiz);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      throw new AppError('Insufficient data', 404);
    }

    const deleteQuizService = new DeleteQuizService();
    await deleteQuizService.execute(id);

    return res.json();
  }
}