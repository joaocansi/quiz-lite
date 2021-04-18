import React from 'react';
import { Link } from "react-router-dom";
import './styles.scss';

interface HeaderProps {
  place: string;
}

const Header: React.FC<HeaderProps> = ({ place }) => {
  return (
    <header className="header-container">
      <div> 
        <h1>
          <i className="fas fa-book"></i>
          Quiz-lite
        </h1>
        <nav>
          <ul>
            <li className={place === 'home' ? "active" : ""}>
              <Link to="/">Create</Link>
            </li>
            <li className={place === 'quiz' ? "active" : ""}>
              <Link to="/quiz">Quiz</Link>
            </li>
            <li className={place === 'result' ? "active" : ""}>
              <Link to="/result">Result</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header;