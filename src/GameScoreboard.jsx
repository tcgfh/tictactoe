import React, { useContext } from "react";
import { CurrentGameContext } from "./CurrentGameContext";
import { detectWinner } from "./GameLogic";
import "./GameScoreboard.css";
// Scoreboard takes the current game context and displays
// the next turn, and/or the winner

function GameScoreboard(props) {
    const {
        currentGame
    } = useContext(CurrentGameContext);

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
            { !winner && currTurn && <h1>{`${currTurn}'s Turn`}</h1>}
            { winner && <h1 className="winBanner">Winner is {winner}!</h1>}
            { isTie && <h1>It is a Tie!</h1>}
        </div>
    )
}

export default GameScoreboard;
