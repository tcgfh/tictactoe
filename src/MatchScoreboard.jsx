import React, { useContext, useCallback } from "react";
import PropTypes from "prop-types";
import { MatchContext } from "./MatchContext";
import "./MatchScoreboard.css";

export function MatchScoreboardGame({id, isCurrentGame}) {
    const {
        dispatch,
        actionTypes,
    } = useContext(MatchContext);

    const dispatchCurrentGameChange = useCallback(()=>dispatch({
        type: actionTypes.setCurrentGame,
        gameId: id,

    }), [id]);
    const classNames = ["matchScoreboard__game"];
    if (isCurrentGame) classNames.push("matchScoreboard__game--currentGame");
    return (
        <div key={id} className={classNames.join(" ")} onClick={dispatchCurrentGameChange}>
            Game Id: {id}
        </div>
    );
}
MatchScoreboardGame.propTypes = {
    id: PropTypes.string,
    isCurrentGame: PropTypes.bool,
};

MatchScoreboardGame.defaultProps = {
    id: "",
    isCurrentGame: false,
}

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
                gameIds.map(id=>(<MatchScoreboardGame key={id} id={id} isCurrentGame={id === currentGameId}/>))
            }
        </div>
    </div>);
}

export default MatchScoreboard;