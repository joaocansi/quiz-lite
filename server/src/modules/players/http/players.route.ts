import { Router } from "express";
import PlayersController from "./controllers/PlayersController";

const playersController = new PlayersController();
const playersRouter = Router();

playersRouter.post('/', playersController.create);

export default playersRouter;