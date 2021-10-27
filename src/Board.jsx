import React, {useCallback, useContext} from 'react';
import './Board.css';
import { CurrentGameContext } from './CurrentGameContext';
import Square from './Square';
import { detectWinnerFromLastMove } from './GameLogic';
import { useTelemetryTraceMountUnmount, withTelemetryExecutionTimeProfiler } from './telemetry';

// The playing field for the game tic tac toe
// When user clicks on squares in the playing field
// we set the game state accordingly. Logic about
// whose token gets placed is contined in the board.

// The game state is provided by the current game
// context. We dispatch an action to that context
// to update the game state after a user places their
// token.

// The game state comes from
function Board (props) {
  useTelemetryTraceMountUnmount("Board", []);
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
  } = withTelemetryExecutionTimeProfiler("detectWinnerFromLastMove from Board", detectWinnerFromLastMove)(currentGame);

  const handleClickSquare = useCallback((key)=>{
    if (winner) return;
    if (!field[key]) {
      const updatedField = [...field];
      updatedField[key] = currTurn;
      const profiledDispatch = withTelemetryExecutionTimeProfiler("dispatch from handleClickSquare", dispatch);
      profiledDispatch({
        type: actionTypes.update,
        game: {
          field: updatedField,
          currTurn: currTurn === "X" ? "Y" : "X",
          indexOfLastMove: key,
        }
      });
    }
  }, [winner, field, dispatch, actionTypes])

  let squares;
  // we will use the index as the square key in this case
  // because we know for sure in the board there are and
  // always will be 9 squares. Otheriwise we should find
  // a better key.
  if (winner) {
    squares = [];
    const winningIndicesMap = {};
    winningIndices.forEach(_=>winningIndicesMap[_] = true);
    squares = field.map((value, index)=><Square key={index} isWinning={winningIndicesMap[index]} isClickable={false} value={value}/>);
  } else{
    squares = field.map((value, index)=><Square key={index} isWinning={false} isClickable={!value} onClick={handleClickSquare} index={index} value={value}/>);
  }

  return (
      <div data-testid="board" className="board">
        { squares }
      </div>
  );
}

export default Board;