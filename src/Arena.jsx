import React, { useMemo, useReducer, } from "react";
import "./Arena.css"
import Board from "./Board";
import { CurrentGameContext } from "./CurrentGameContext";
import { MatchContext } from "./MatchContext";

import {TOKEN} from "./Constants";
import GameScoreboard from "./GameScoreboard";
import MatchScoreboard from "./MatchScoreboard";
import useMiniRedux from "./UseMiniRedux";

function Arena(props) {
    const { currentGameState, matchState } = useMiniRedux();
    return (
        <div className="arena">
            <CurrentGameContext.Provider value={currentGameState}>
                <Board/>
                <GameScoreboard/>
            </CurrentGameContext.Provider>
            <MatchContext.Provider value={matchState}>
                <MatchScoreboard/>
            </MatchContext.Provider>
        </div>
    )
}

export default Arena;