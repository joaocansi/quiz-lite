import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import Header from "../../components/Header"
import api from "../../services/api";
import './styles.scss';

const PreQuiz = () => {
  const [code, setCode] = useState('');
  const history = useHistory();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    api.get(`/quizzes/${code}`).then(response => {
      history.push(`/quiz/${code}`);
    }).catch(() => {
      toast.error('There is no quiz containing this code. Please try again.')
    });
  }

  return (
    <div className="pre-quiz-container">
      <Header place="quiz" />
      <main>
        <p>Enter the code that you received from your friend</p>
        <form onSubmit={handleSubmit}>
          <input placeholder="Enter the code" type="text" value={code} onChange={e => setCode(e.target.value)} />
          <button type="submit">
            Play quiz
          </button>
        </form>
      </main>
      <footer></footer>
    </div>
  )
}

export default PreQuiz;