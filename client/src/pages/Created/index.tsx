import copy from "copy-to-clipboard";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import Quiz from "../../helpers/Quiz";
import './styles.scss';

const Created = () => {
  const history = useHistory();
  const [quiz, setQuiz] = useState<Quiz>({} as Quiz);

  useEffect(() => {
    const quizFromLocalStorage = localStorage.getItem('quiz-lite@temporary_created_quiz');
    if (!quizFromLocalStorage) {
      history.push('/');
    } else {
      var convertStringToJSON = JSON.parse(quizFromLocalStorage);
      convertStringToJSON.questions = JSON.parse(convertStringToJSON.questions);
      setQuiz(convertStringToJSON);
      localStorage.removeItem('quiz-lite@temporary_created_quiz');
    }
  }, [history]);

  function handleCopyToClipboard(text: string) {
    copy(text);
    toast.success('Link copied to clipboard');
  }

  return (
    <div className="quiz-created">
      <main>
        <div className="header">
          <h2>Quiz created</h2>
        </div>
        <div className="box">
          <p>
            <span>Name: </span>
            {quiz.name}
          </p>
          <p>
            <span>Questions: </span>
            {quiz.questions && quiz.questions.length}
          </p>
          <p>
            <span>Code: </span>
            {quiz.code}
          </p>
          <p>
            <span>Result Code: </span>
            {quiz.resultCode}
          </p>
          <div className="links">
            <p><span>Share: </span></p>
            <div className="clipboard-input">
              <input
                value={`${window.location.origin}/quiz/${quiz.code}`} 
                disabled 
              />
              <button 
                onClick={() => handleCopyToClipboard(`${window.location.origin}/quiz/${quiz.code}`)} 
                className="clipboard-btn">Copy</button>
            </div>
          </div>
          <div className="links">
            <p><span>Result: </span></p>
            <div className="clipboard-input">
              <input 
                value={`${window.location.origin}/result/${quiz.resultCode}`} 
                disabled />
              <button
                onClick={() => handleCopyToClipboard(`${window.location.origin}/result/${quiz.resultCode}`)} 
                className="clipboard-btn">Copy</button>
            </div>
          </div>
          <div className="warning">
            <p>
              <span>OBS: </span>
              Remember to save these links or codes before you leave.
            </p>
          </div>
          <button type="button" onClick={() => history.push('/')} className="back-btn">
            Play Quiz
          </button>
        </div>
      </main>
    </div>
  );
}

export default Created;