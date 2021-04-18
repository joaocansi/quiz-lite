import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import Header from "../../components/Header"
import api from "../../services/api";
import './styles.scss';

const PreResult = () => {
  const [resultCode, setResultCode] = useState('');
  const history = useHistory();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    api.get(`/quizzes/result/${resultCode}`).then(response => {
      history.push(`/result/${resultCode}`)
    }).catch(() => {
      toast.error('There is no quiz containing this result code. Please try again.')
    })
  }

  return (
    <div className="pre-result-container">
      <Header place="result" />
      <main>
        <p>Enter the result code that was generated when you created the quiz</p>
        <form onSubmit={handleSubmit}>
          <input placeholder="Enter the result code" type="text" value={resultCode} onChange={e => setResultCode(e.target.value)} />
          <button type="submit">
            See result
          </button>
        </form>
      </main>
      <footer></footer>
    </div>
  )
}

export default PreResult;