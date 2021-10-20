import React, { useMemo, useReducer, } from "react";
import "./Arena.css"
import Board from "./Board";
import { CurrentGameContext } from "./CurrentGameContext";

import {TOKEN} from "./Constants";
import GameScoreboard from "./GameScoreboard";

const ROOT_ACTION_TYPES = {
    updateCurrentGame: "updateCurrentGame",
    updateGame: "updateGame",
    resetCurrentGame: "resetCurrentGame",
    resetGame: "resetGame",
};

function game(state, action = {}) {
    switch(action.type) {
        case ROOT_ACTION_TYPES.updateGame: {
            return action.game;
        }
        default: {
            return {
                field: ["", "", "", "", "", "", "", "", ""],
                currTurn: TOKEN.X,
            };
        }
    }
}

function gamesById(state, action = {}) {
    switch(action.type) {
        case ROOT_ACTION_TYPES.resetGame: {
            const {
                gameId,
            } = action;

            // don't provide a state and action
            // to the game reducer; this would result
            // in a new game
            const updatedGame = game();
            const updatedGames = [...state];
            updatedGames[gameId] = updatedGame;
            return updatedGames;
        }
        case ROOT_ACTION_TYPES.updateGame: {
            const {
                gameId,
            } = action;

            const updatedGame = game(state[gameId], action);
            if (updatedGame === state[gameId]) {
                return state;
            }

            const updatedGames = [...state];
            updatedGames[gameId] = updatedGame;
            return updatedGames;
        }
        default:
            return [game()];
    }
}

function rootReducer(state, action = {}) {
    switch(action.type) {
        case ROOT_ACTION_TYPES.updateCurrentGame: {
            const updatedGames = gamesById(state.gamesById, {
                type: ROOT_ACTION_TYPES.updateGame,
                gameId: state.currGameId,
                game: action.game,
            });
            if (updatedGames === state.gamesById) return state;
            const updatedRoot = {...state};
            updatedRoot.gamesById = updatedGames;
            return updatedRoot;
        }
        case ROOT_ACTION_TYPES.resetCurrentGame: {
            const updatedGames = gameById(state.gamesById, {
                type: ROOT_ACTION_TYPES.resetGame,
                gameId: state.currGameId,
            });
            if (updatedGames === state.gameById) return state;
            const updatedRoot = {...state};
            updatedRoot.gameById = updatedGames;
            return updatedRoot;
        }
        default: {
            return {
                currGameId: 0,
                gamesById: gamesById(),
            }
        }
    }
}

function selectCurrentGame(state) {
    return state.gamesById[state.currGameId];
}

function miniRedux() {
    const [rootState, dispatchToRoot] = useReducer(rootReducer, {}, rootReducer);
    const currentGameContext = useMemo(()=>({
        currentGame: selectCurrentGame(rootState),
        actionTypes: {
            update: ROOT_ACTION_TYPES.updateCurrentGame,
            reset: ROOT_ACTION_TYPES.resetCurrentGame,
        },
        dispatch: dispatchToRoot,
    }), [rootState]);

    return {
        currentGameContext,
    };
}

function Arena(props) {
    const { currentGameContext } = miniRedux();
    return (
        <div className="arena">
            <CurrentGameContext.Provider value={currentGameContext}>
                <Board/>
                <GameScoreboard/>
            </CurrentGameContext.Provider>
        </div>
    )
}

export default Arena;