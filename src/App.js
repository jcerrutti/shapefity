import React from 'react';
import './App.css';
import Board from './components/board/board';

function App() {
  return (
    <div className="main-container">
      <div>
        <h3>Shapifity</h3>
      </div>
      <Board></Board>
    </div>
  );
}

export default App;
