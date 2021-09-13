import React from 'react';
import './App.css';
import Board from './Board';

/**
* Entry point of the app
* @return {object} react component representing the main app
*/
function App() {
  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <Board></Board>

    </div>
  );
}

export default App;
