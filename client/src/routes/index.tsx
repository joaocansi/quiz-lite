import { BrowserRouter, Route,  } from 'react-router-dom';
import Created from '../pages/Created';
import Home from '../pages/Home';
import Quiz from '../pages/Quiz';
import PreQuiz from '../pages/PreQuiz';
import PreResult from '../pages/PreResult';
import Result from '../pages/Result';

export default function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" component={Home} exact />
      <Route path="/created" component={Created} />
      <Route path="/quiz" component={PreQuiz} exact />
      <Route path="/quiz/:code" component={Quiz} />
      <Route path="/result" component={PreResult} exact />
      <Route path="/result/:resultCode" component={Result} />
    </BrowserRouter>
  )
}