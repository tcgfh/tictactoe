import React from "react";
import {create, act} from 'react-test-renderer';

import { CurrentGameContext } from "./CurrentGameContext";
import GameScoreboard from "./GameScoreboard.jsx";

describe("GameScoreboard Component", function(){
    test("it announces a tie", function(){
        const mockData = {
            currentGame: {
                field: ["X", "Y", "X", "Y", "Y", "X", "X", "X", "Y"],
            },
        };

        let testRendererInstance;
        act(()=>{
            testRendererInstance = create(
                <CurrentGameContext.Provider value={mockData}>
                    <GameScoreboard/>
                </CurrentGameContext.Provider>
            );
        });

        const root = testRendererInstance.root;
        const header = root.findByType("h1");
        expect(header.children[0]).toEqual("It is a Tie!");
    });
    test("it announces the next player's turn", function(){
        const mockData = {
            currentGame: {
                field: ["X", "Y", "X", "Y", "Y", "X", "X", "X", ""],
                currTurn: "Y"
            },
        };

        let testRendererInstance;
        act(()=>{
            testRendererInstance = create(
                <CurrentGameContext.Provider value={mockData}>
                    <GameScoreboard/>
                </CurrentGameContext.Provider>
            );
        });

        const root = testRendererInstance.root;
        const header = root.findByType("h1");
        expect(header.children[0]).toEqual("Y's Turn");
    });
    test("it announces a winner", function(){
        const mockData = {
            currentGame: {
                field: ["X", "X", "X", "Y", "Y", "", "", "", ""],
                currTurn: "Y"
            },
        };

        let testRendererInstance;
        act(()=>{
            testRendererInstance = create(
                <CurrentGameContext.Provider value={mockData}>
                    <GameScoreboard/>
                </CurrentGameContext.Provider>
            );
        });

        const root = testRendererInstance.root;
        const header = root.findByType("h1");
        expect(header.children.join("")).toEqual("Winner is X!");
    });
    test("reset button dispatches a reset action", function(){
        const mockDispatch = jest.fn();
        const mockData = {
            actionTypes: {
                reset: "reset",
            },
            dispatch: mockDispatch,
            currentGame: {
                field: ["", "", "", "", "", "", "", "", ""],
                currTurn: "X"
            },
        };

        let testRendererInstance;
        act(()=>{
            testRendererInstance = create(
                <CurrentGameContext.Provider value={mockData}>
                    <GameScoreboard/>
                </CurrentGameContext.Provider>
            );
        });

        const root = testRendererInstance.root;
        const button = root.findByType("button");
        expect(button.children.join("")).toEqual("Reset Current Game");

        // test the reset callback
        button.props.onClick();
        expect(mockDispatch).toHaveBeenCalledWith({type: "reset"});


    });
});