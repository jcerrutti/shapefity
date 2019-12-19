import React from 'react';
import './App.css';
import Board from './components/Board/Board';
import About from './components/About/About';

function App() {
  return (
    <div className="main-container">
      <div className="board-section">
        <Board></Board>
        <About></About>
      </div>
    </div>
  );
}

export default App;
