import React, { useContext, useCallback } from "react";
import { MatchContext } from "./MatchContext";
import "./MatchScoreboard.css";

function MatchScoreboard() {
    const {
        currentGameId,
        gameIds,
        dispatch,
        actionTypes,
    } = useContext(MatchContext);

    const addGame = useCallback(()=>dispatch({type: actionTypes.addGame}));
    return(<div className="matchScoreboard">
        <div className="matchScoreboard_header">
            <div className="matchScoreboard_title">Games</div>
            <button onClick={addGame}>New Game</button>
        </div>
        <div className="matchScoreboard_gamelist">
            {
                gameIds.map(id=>{
                    const classNames = ["matchScoreboard__game"];
                    if (id === currentGameId) classNames.push("matchScoreboard__game--currentGame");
                    return (
                        <div key={id} className={classNames.join(" ")}>
                            Game Id: {id}
                        </div>
                    );
                })
            }
        </div>
    </div>);
}

export default MatchScoreboard;