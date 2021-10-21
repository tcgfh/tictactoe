// a hook for a simplified redux-like store to manage game states

import { useMemo, useReducer, } from "react";

import {TOKEN} from "./Constants";
import { telemetryActionReduce } from "./telemetry";

const ROOT_ACTION_TYPES = {
    updateCurrentGame: "updateCurrentGame",
    updateGame: "updateGame",
    resetCurrentGame: "resetCurrentGame",
    resetGame: "resetGame",
    addGame: "addGame",
    setCurrentGame: "setCurrentGame",
    loadOverallState: "loadOverallState",
};

export function game(state, action = {}) {
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
        case ROOT_ACTION_TYPES.addGame: {
            const updatedGames = [...state];
            updatedGames.push(game());
            return updatedGames;
        }
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
    telemetryActionReduce(action, "rootReducer");
    switch(action.type) {
        case ROOT_ACTION_TYPES.loadOverallState: {
            return action.state;
        }
        case ROOT_ACTION_TYPES.setCurrentGame: {
            const {
                gameId,
            } = action;

            if (!state.gamesById[gameId]) return; // prevent setting to non-existent game id
            const updatedRoot = {...state};
            updatedRoot.currGameId = gameId;
            return updatedRoot;
        }
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
            const updatedGames = gamesById(state.gamesById, {
                type: ROOT_ACTION_TYPES.resetGame,
                gameId: state.currGameId,
            });
            if (updatedGames === state.gamesById) return state;
            const updatedRoot = {...state};
            updatedRoot.gamesById = updatedGames;
            return updatedRoot;
        }
        case ROOT_ACTION_TYPES.addGame: {
            // add a game and make it the current one
            const updatedGames = gamesById(state.gamesById, {
                type: ROOT_ACTION_TYPES.addGame,
            });
            const updatedRoot = {...state};
            updatedRoot.gamesById = updatedGames;
            updatedRoot.currGameId = `${updatedGames.length -1}`;
            return updatedRoot;
        }
        default: {
            const updatedGames = gamesById();
            return {
                currGameId: `${updatedGames.length - 1}`,
                gamesById: updatedGames,
            }
        }
    }
}

function selectCurrentGame(state) {
    return state.gamesById[state.currGameId];
}

function selectCurrentGameId(state) {
    return state.currGameId;
}

function selectGameIds(state) {
    return Object.keys(state.gamesById);
}

function useMiniRedux() {
    const [rootState, dispatchToRoot] = useReducer(rootReducer, {}, rootReducer);
    const currentGameState = useMemo(()=>({
        currentGame: selectCurrentGame(rootState),
        actionTypes: {
            update: ROOT_ACTION_TYPES.updateCurrentGame,
            reset: ROOT_ACTION_TYPES.resetCurrentGame,
        },
        dispatch: dispatchToRoot,
    }), [rootState]);

    const matchState = useMemo(()=>({
        currentGameId: selectCurrentGameId(rootState),
        gameIds: selectGameIds(rootState),
        actionTypes: {
            addGame: ROOT_ACTION_TYPES.addGame,
            setCurrentGame: ROOT_ACTION_TYPES.setCurrentGame,
        },
        dispatch: dispatchToRoot,
    }), [rootState]);
    const overallState = useMemo(()=>({
        state: rootState,
        actionTypes: {
            loadOverallState: ROOT_ACTION_TYPES.loadOverallState
        },
        dispatch: dispatchToRoot,
    }), [rootState]);
    return {
        currentGameState,
        matchState,
        overallState,
    };
}


export default useMiniRedux;