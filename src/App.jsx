import React from 'react';
import './App.css';
import Arena from './Arena';

/**
* Entry point of the app
* @return {object} react component representing the main app
*/
function App() {
  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <Arena />

    </div>
  );
}

export default App;
