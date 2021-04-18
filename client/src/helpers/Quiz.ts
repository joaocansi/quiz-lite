export default interface Quiz {
  id: string;
  resultCode: string;
  code: string;
  name: string;
  questions: Question[];
}

export interface Question {
  question: string;
  answers: Answer[];
}

export interface Answer {
  answer: string;
  correct: boolean;
}