import React, {useState, useContext} from 'react';
import './Board.css';
import { CurrentGameContext } from './CurrentGameContext';
import Square from './Square';

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
  const {
    dispatch,
    actionTypes,
    currentGame
  } = useContext(CurrentGameContext);

    const {
      currTurn,
      field
    } = currentGame;
    const {
      winner,
      winningIndices,
      isTie,
    } = detectWinner(field);

    const handleClickSquare = function(key){
      if (winner) return;
      if (!field[key]) {
        const updatedField = [...field];
        updatedField[key] = currTurn;
        dispatch({
          type: actionTypes.update,
          game: {
            field: updatedField,
            currTurn: currTurn === "X" ? "Y" : "X",
          }
        });
      }
    }

    return (
      <React.Fragment>
        <div className="board">
          {
            field.map((value, index)=><Square key={index} onClick={()=>handleClickSquare(index)} value={value}/>)
          }
        </div>
        { winner && <div className="winBanner">Winner is {winner}!</div>}
        { isTie && <div>It is a Tie!</div>}
      </React.Fragment>
    );
}

export default Board;