import React, { FormEvent, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Quiz, { Question } from '../../helpers/Quiz';
import api from '../../services/api';
import './styles.scss';

const alphabetOptionIdentificator = [
  'A', 'B', 'C', 'D'
]

enum QuizStatus {
  INFORMATION,
  PLAYING,
  RESULT
}

interface PlayQuestion {
  index: number;
  answerIndex: number;
  content: Question;
}

interface Params {
  code: string;
}

const PlayQuiz = () => {
  const history = useHistory();

  const { code } = useParams() as Params;
  const [quiz, setQuiz] = useState({} as Quiz);

  const [status, setStatus] = useState<QuizStatus>(QuizStatus.INFORMATION);
  const [playerName, setPlayerName] = useState('');

  const [question, setQuestion] = useState<PlayQuestion>({} as PlayQuestion);
  const [transition, setTransition] = useState(false);

  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    api.get(`/quizzes/${code}`).then(response => {
      setQuiz(response.data);
    }).catch(() => {
      history.push('/quiz');
      toast.error('There is no quiz containing this code. Please try again.')
    });
  }, [history, code]);

  function handleStartQuiz(e: FormEvent) {
    e.preventDefault();
    if (playerName.length < 5 || playerName.length > 50) {
      toast.error('Name must be between 5 and 50 characters');
      return;
    }

    setPlayerName(playerName);
    setStatus(QuizStatus.PLAYING);
    setQuestion({
      index: 0,
      content: quiz.questions[0],
      answerIndex: quiz.questions[0].answers.findIndex(item => item.correct === true)
    });
  }

  async function handleSelectOption(answer: number) {
    if (transition === false) {
      const getCorrectAnswerElement = document.getElementById(`answer#${question.answerIndex}`);
      getCorrectAnswerElement?.classList.add('correct-answer'); 

      setTransition(true);

      if (answer !== question.answerIndex) {
        const getAnswerElement = document.getElementById(`answer#${answer}`);
        getAnswerElement?.classList.add('wrong-answer');

        setTimeout(() => {
          if (question.index >= (quiz.questions.length - 1)) {
            handleFinishGame(correctAnswers);
          }else {
            setQuestion({
              index: question.index + 1,
              content: quiz.questions[question.index + 1],
              answerIndex: quiz.questions[question.index + 1].answers.findIndex(item => item.correct === true)
            });
            getAnswerElement?.classList.remove('wrong-answer');
            getCorrectAnswerElement?.classList.remove('correct-answer');
            setTransition(false)
          }
        }, 2000);
      } else {
        setCorrectAnswers(prev => prev + 1);
        const hits = correctAnswers + 1;
        
        setTimeout(() => {
          if (question.index >= (quiz.questions.length - 1)) {
            handleFinishGame(hits);
          } else {      
            setQuestion({
              index: question.index + 1,
              content: quiz.questions[question.index + 1],
              answerIndex: quiz.questions[question.index + 1].answers.findIndex(item => item.correct === true)
            });
            getCorrectAnswerElement?.classList.remove('correct-answer');
            setTransition(false);
          }
        }, 2000);
      }
    }
  }

  async function handleFinishGame(hits: number) {
    api.post('/players', {
      hits,
      quiz_id: quiz.id,
      name: playerName
    });
    setStatus(QuizStatus.RESULT);
  }
  
  return (
    <div className="quiz-container">
      {status === QuizStatus.PLAYING ? (
        <div className="playing">
          <div className="header">
            <h2>Question #{question.index + 1}</h2>
          </div>
          <div className="question-box">
            <p className="question">{question.content.question}</p>
            <div className="answers-box">
              {question.content.answers.map((item, index)=> {
                return (
                  <div id={`answer#${index}`} onClick={() => handleSelectOption(index)} key={index} className="answer">
                    <div className="answer-id">
                      {alphabetOptionIdentificator[index]}
                    </div>
                    <div className="answer-content">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div></div>
        </div>
      ) : status === QuizStatus.RESULT ? (
        <div className="result">
          <div className="header">
            <h2>End</h2>
          </div>
          <div className="correct-answers-box">
            <p>Você acertou: </p>
            <p className="correct-answers">
              {correctAnswers}/{quiz.questions.length}
            </p>
          </div>
          <Link to="/">
            Voltar
          </Link>
        </div>
      ) : (
        <div className="information">
          <div className="header">
            <h2>Answer the quiz</h2>
          </div>
          <main>
            <p><span>Quiz name: </span>{quiz.name}</p>
            <form onSubmit={handleStartQuiz}>
              <input onChange={e => setPlayerName(e.target.value)} type="text" placeholder="Enter your name" />
              <button type="submit">Start</button>
            </form>
          </main>
          <div></div>
        </div>
      )}
    </div>
  )
}

export default PlayQuiz;