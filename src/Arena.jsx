import React, { useMemo, useReducer, } from "react";
import "./Arena.css"
import Board from "./Board";
import { CurrentGameContext } from "./CurrentGameContext";
import { MatchContext } from "./MatchContext";
import { RootContext } from "./RootContext";

import {TOKEN} from "./Constants";
import GameScoreboard from "./GameScoreboard";
import MatchScoreboard from "./MatchScoreboard";
import useMiniRedux from "./UseMiniRedux";
import SaveToFileButton from "./SaveToFileButton";
import LoadFromFileButton from "./LoadFromFileButton";

function Arena(props) {
    const { currentGameState, matchState, overallState } = useMiniRedux();
    return (
        <div className="arena">
            <CurrentGameContext.Provider value={currentGameState}>
                <Board/>
                <GameScoreboard/>
            </CurrentGameContext.Provider>
            <MatchContext.Provider value={matchState}>
                <MatchScoreboard/>
            </MatchContext.Provider>
            <RootContext.Provider value={overallState}>
                <SaveToFileButton/>
                <LoadFromFileButton/>
            </RootContext.Provider>
        </div>
    )
}

export default Arena;