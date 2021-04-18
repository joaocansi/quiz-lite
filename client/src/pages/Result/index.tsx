import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import QuizResult from '../../helpers/QuizResult';
import api from '../../services/api';

import './styles.scss';

interface Params {
  resultCode: string;
}

interface PlayerResult {
  name: string;
  hits: number;
}

const Result = () => {
  const { resultCode } = useParams() as Params;
  const history = useHistory();
  
  const [playersFiltered, setPlayersFiltered] = useState([] as PlayerResult[]);
  const [searchPlayers, setSearchPlayers] = useState('');

  const [quizResult, setQuizResult] = useState<QuizResult>({} as QuizResult);

  useEffect(() => {
    api.get(`/quizzes/result/${resultCode}`).then(response => {
      setQuizResult(response.data);
    }).catch(() => {
      history.push('/result');
      toast.error('There is no quiz containing this result code. Please try again.')
    });
  }, [resultCode, history]);

  useEffect(() => {
    if (searchPlayers.length < 1) {
      setPlayersFiltered(quizResult.players);
    }else {
      setPlayersFiltered(quizResult.players.filter(item => item.name.toLowerCase().includes(searchPlayers.toLowerCase())))
    }
  }, [searchPlayers, quizResult]);

  return (
    <div className="quiz-result">
      <main>
        <div className="header">
          <h2>Quiz result</h2>
        </div>
        <div className="result-box">
          <p>
            <span>Name: </span>
            {quizResult.name}
          </p>
          <p>
            <span>Questions: </span>
            {quizResult.questions ? quizResult.questions.length : 0}
          </p>
          <p>
            <span>Answers received: </span>
            {quizResult.players ? quizResult.players.length : 0}
          </p>
          <form>
            <input defaultValue={searchPlayers} onChange={e => setSearchPlayers(e.target.value)} type="text" placeholder="Search by name" />
          </form>
          <div className="results">
            <div className="result-header">
              <p>Player</p>
              <p>Hits</p>
            </div>
            {playersFiltered && playersFiltered.map((item, index)=> {
              return (
                <div key={index} className="result">
                  <p>{item.name}</p>
                  <p>{item.hits}</p>
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Result;