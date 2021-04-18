import Player from "./Player";
import Quiz from "./Quiz";

export default interface QuizResult extends Quiz {
  players: Player[];
}