import React, { useContext, useCallback } from "react";
import { CurrentGameContext } from "./CurrentGameContext";
import { detectWinner } from "./GameLogic";
import "./GameScoreboard.css";
// Scoreboard takes the current game context and displays
// the next turn, and/or the winner

function GameScoreboard(props) {
    const {
        currentGame,
        actionTypes,
        dispatch,
    } = useContext(CurrentGameContext);

    const resetGame = useCallback(()=>dispatch({type: actionTypes.reset}));

    const {
        currTurn,
        field
    } = currentGame;

    const {
        winner,
        isTie,
    } = detectWinner(field);

    return(
        <div className="gameScoreboard">
            { !winner && !isTie && currTurn && <h1>{`${currTurn}'s Turn`}</h1>}
            { winner && <h1 className="winBanner">Winner is {winner}!</h1>}
            { isTie && <h1>It is a Tie!</h1>}
            <button onClick={resetGame}>Reset Current Game</button>
        </div>
    )
}

export default GameScoreboard;
