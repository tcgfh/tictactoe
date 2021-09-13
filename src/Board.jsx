import React, {useState} from 'react';
import './Board.css';
import Square from './Square';
const initalState = ["","","","","","","","",""];

const detectWinner = function(state){
    const valueAt = function(index) {
      return state[index];
    }
      const checks = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      for(let i = 0; i < checks.length; i++) {
        const currCheck = checks[i];
        const winner = valueAt(currCheck[0]);
        if (winner && valueAt(currCheck[1]) === winner && valueAt(currCheck[2]) === winner) {
          return {
            winner,
            winningIndices: currCheck,
          }
        }
      }
      let tokenCount = 0;
      for (let i = 0; i < 9; i++) {
        if (valueAt(i) === "X" || valueAt(i) === "Y") tokenCount++;
      }
      return {
        isTie: tokenCount === 9,
      };
}
function Board (props) {
    const [state, setState] = useState(initalState);
    const [turn, setTurn] = useState("X");

    const {
      winner,
      winningIndices,
      isTie,
    } = detectWinner(state);

    const handleClickSquare = function(key){
      if (winner) return;
      if (!state[key]) {
          const updatedState = [...state];
          updatedState[key] = turn;
          setState(updatedState);

          setTurn(turn === "X" ? "Y" : "X");
      }
    }

    return (
      <React.Fragment>
        <div className="board">
          {
            state.map((value, index)=><Square key={index} onClick={()=>handleClickSquare(index)} value={value}/>)
          }
        </div>
        { winner && <div className="winBanner">Winner is {winner}!</div>}
        { isTie && <div>It is a Tie!</div>}
      </React.Fragment>
    );
}

export default Board;