export default interface IQuiz {
  name: string;
  questions: IQuestion[];
}

export interface IQuestion {
  question: string;
  answers: IAnswer[];
}

export interface IAnswer {
  answer: string;
  correct: boolean;
}