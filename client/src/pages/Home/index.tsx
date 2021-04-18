import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import { Question } from "../../helpers/Quiz";
import api from "../../services/api";
import './styles.scss';

const Home = () => {
  const history = useHistory();

  const [quizName, setQuizName] = useState('');
  const [questions, setQuestions] = useState<Question[]>([
    { 
      question: '',
      answers: [
        {
          answer: '',
          correct: true
        }
      ]
    }
  ]);

  function handleQuizNameChange(name: string) {
    setQuizName(name);
  }

  function handleAnswerChange(questionIndex: number, answerIndex: number, answer: string) {
    const newArray = [ ...questions ];
    newArray[questionIndex].answers[answerIndex].answer = answer;
    setQuestions(newArray);
  }

  function handleQuestionChange(questionIndex: number, question: string) {
    const newArray = [ ...questions ];
    newArray[questionIndex].question = question;
    setQuestions(newArray);
  }

  function handleAddQuestion() {
    const newQuestion = {
      question: '',
      answers: [
        {
          answer: '',
          correct: true
        }
      ]
    }
    setQuestions([...questions, newQuestion]);
  }

  function handleAddAnswer(questionIndex: number) {
    const newArray = [ ...questions ];
    newArray[questionIndex].answers.push({
      answer: '',
      correct: false
    });
    setQuestions(newArray);
  }

  function handleRemoveAnswer(questionIndex: number, answerIndex: number) {
    const newArray = [ ...questions ];
    newArray[questionIndex].answers.splice(answerIndex, 1);
    setQuestions(newArray);
  }

  function handleRemoveQuestion(questionIndex: number) {
    setQuestions(questions.filter((item, index) => index !== questionIndex));
  }

  function handleCorrectAnswer(questionIndex: number, answerIndex: number) {
    const newArray = [ ...questions ];
    const answers = newArray[questionIndex].answers;
    const findCorrectAnswers = answers.find(item => item.correct === true);
    if (findCorrectAnswers) {
      const getAnswerIndex = answers.indexOf(findCorrectAnswers);
      if (getAnswerIndex !== answerIndex) {
        toast.error('Please uncheck first and then check other option')
        return;  
      }
    }
    newArray[questionIndex].answers[answerIndex].correct =
    !newArray[questionIndex].answers[answerIndex].correct; 
    setQuestions(newArray);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (quizName.length < 5 || quizName.length > 100) {
      toast.error('Quiz name must be between 5 and 100 characters');
      return;
    }

    for (var { answers, question } of questions) {
      if (question.length < 5 || question.length > 200) {
        toast.error('Quiz questions must be between 5 and 200 characters');
        return;
      }
      if (answers.length < 2) {
        toast.error('You need to add at least two answers');
        return;
      }
      var findCorrectAnswers = 0;
      for (var { answer, correct } of answers) {
        if (answer.length < 1 || answer.length > 200) {
          toast.error('Quiz answers must be between 1 and 200 characters');
          return;
        }
        if (correct) {
          findCorrectAnswers++;
        }
      }
      if (findCorrectAnswers !== 1) {
        toast.error('You need to check at least one answer as correct');
        return;
      }
    }

    try {
      const createQuiz = await api.post('/quizzes', {
        name: quizName,
        questions
      });
      localStorage.setItem('quiz-lite@temporary_created_quiz', JSON.stringify(createQuiz.data));
    } catch (error) {
      toast.error('Please try again later');  
      return;
    }

    history.push('/created');
  }

  return (
    <div className="home-container">
      <div className="clip-path">
        <Header place="home" />
      </div>
      <main>
        <form onSubmit={handleSubmit}>
          <input onChange={e => handleQuizNameChange(e.target.value)} type="text" placeholder="Enter the quiz name" />
          <h5>Questions</h5>
          {questions.map(({ question, answers }, questionIndex) => {
            return (

              <fieldset key={questionIndex} id={`question#${questionIndex}`}>

                <div className="question-header">

                  <p>{`Question #${questionIndex + 1}`}</p>

                  {questions.length !== 1 ? (
                    <i onClick={() => handleRemoveQuestion(questionIndex)} className="fas fa-trash-alt"></i>
                  ): null}

                </div>

                <input onChange={e => handleQuestionChange(questionIndex, e.target.value)} value={question} type="text" placeholder="Enter the question"/>

                <div className="question-answers">

                  {answers.map(({ answer, correct }, answerIndex) => {
                    return (

                      <div key={answerIndex} id={`question#${questionIndex}-answer#${answerIndex}`}  className="answer-content">

                        {correct === false ? (
                          <i onClick={() => handleCorrectAnswer(questionIndex, answerIndex)} className="far fa-square"></i>
                        ) : (
                          <i onClick={() => handleCorrectAnswer(questionIndex, answerIndex)} className="far fa-check-square"></i>
                        )}

                        <input onChange={e => handleAnswerChange(questionIndex, answerIndex, e.target.value)} value={answer} type="text" placeholder="Enter the answer" />

                        {answers.length !== 1 ? (
                          <i onClick={() => handleRemoveAnswer(questionIndex, answerIndex)} className="fas fa-trash-alt"></i>
                        ): null}

                      </div>
                      
                    )                 
                  })}

                  {answers.length < 4 ? (
                    <button className="add-answer-btn" type="button" onClick={() => handleAddAnswer(questionIndex)}>
                      <i className="fas fa-plus"></i>
                      Add answer
                    </button>
                  ) : null}

                </div>

              </fieldset>

            )
          })}
          {questions.length < 10 ? (
            
            <button className="add-question-btn" type="button" onClick={handleAddQuestion}>
              Add Question
            </button>

          ) : null}

          <button type="submit" className="create-quiz-btn">
            Create quiz
          </button>

        </form>
      </main>
    </div>
  )
}

export default Home;