import React from "react";
import {create, act} from 'react-test-renderer';

import { MatchContext } from "./MatchContext";
import MatchScoreboard,  {MatchScoreboardGame} from "./MatchScoreboard.jsx";
// import {MatchScoreboardGame} from "./MatchScoreboard.jsx";

describe("GameScoreboard Component", function(){
    test("add game button do dispatch add game action", function(){
        const mockDispatch = jest.fn();
        const mockData = {
            currentGameId: "0",
            gameIds: ["0"],
            dispatch: mockDispatch,
            actionTypes: {
                addGame: "addGame"
            }
        };

        let testRendererInstance;
        act(()=>{
            testRendererInstance = create(
                <MatchContext.Provider value={mockData}>
                    <MatchScoreboard/>
                </MatchContext.Provider>
            );
        });

        const root = testRendererInstance.root;
        const matchScoreboardHeader = root.findByProps({className: "matchScoreboard_header"});
        const buttonForNewGame = matchScoreboardHeader.findByType("button");
        expect(buttonForNewGame.children.join("")).toEqual("New Game");

        // valdiate clicking the button will dispatch
        buttonForNewGame.props.onClick();
        expect(mockDispatch).toHaveBeenLastCalledWith({type: "addGame"});

    });
    describe("MatchScoreboardGame component", function(){
        it("dispatches action to set current game on click", function(){
            const mockDispatch = jest.fn();
            const mockData = {
                currentGameId: "0",
                gameIds: ["0"],
                dispatch: mockDispatch,
                actionTypes: {
                    setCurrentGame: "setCurrentGame"
                }
            };

            let testRendererInstance;
            act(()=>{
                testRendererInstance = create(
                    <MatchContext.Provider value={mockData}>
                        <MatchScoreboard/>
                    </MatchContext.Provider>
                );
            });

            const root = testRendererInstance.root;
            const gameListItem = root.findByType(MatchScoreboardGame);

            // valdiate clicking the button will dispatch
            gameListItem.children[0].props.onClick();
            expect(mockDispatch).toHaveBeenLastCalledWith({type: "setCurrentGame", gameId: "0"});
        });

        it("displays the game id", function(){
            const mockDispatch = jest.fn();
            const mockData = {
                currentGameId: "0",
                gameIds: ["0"],
                dispatch: mockDispatch,
                actionTypes: {
                    addGame: "addGame"
                }
            };

            let testRendererInstance;
            act(()=>{
                testRendererInstance = create(
                    <MatchContext.Provider value={mockData}>
                        <MatchScoreboard/>
                    </MatchContext.Provider>
                );
            });

            const root = testRendererInstance.root;
            const gameListItem = root.findByType(MatchScoreboardGame);
            expect(gameListItem.children[0].children.join("")).toEqual("Game Id: 0");
        });
    });
});