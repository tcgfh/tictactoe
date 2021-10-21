import React from "react";
import {create, act} from 'react-test-renderer';

import { CurrentGameContext } from "./CurrentGameContext";
import Board from "./Board.jsx";
import Square from "./Square.jsx";

describe("Board Component", function(){
    test("it renders 9 squares", function(){
        const mockData = {
            currentGame: {
                field: ["", "", "", "", "", "", "", "", ""],
            },
        };

        let testRendererInstance;
        act(()=>{
            testRendererInstance = create(
                <CurrentGameContext.Provider value={mockData}>
                    <Board/>
                </CurrentGameContext.Provider>
            );
        });

        const root = testRendererInstance.root;
        const squares = root.findAllByType(Square);
        expect(squares).toHaveLength(9);
    });
    test("it renders squares with X and Y value according to field in current game context", function(){
        const mockData = {
            currentGame: {
                field: ["X", "X", "X", "Y", "Y", "", "", "", ""],
            },
        };

        let testRendererInstance;
        act(()=>{
            testRendererInstance = create(
                <CurrentGameContext.Provider value={mockData}>
                    <Board/>
                </CurrentGameContext.Provider>
            );
        });

        const root = testRendererInstance.root;
        const squares = root.findAllByType(Square);
        expect(squares).toHaveLength(9);
        const xCount = squares.reduce((acc, square) => {
            if (square.props.value === "X") acc++;
            return acc;
        }, 0);
        expect(xCount).toEqual(3);

        const yCount = squares.reduce((acc, square) => {
            if (square.props.value === "Y") acc++;
            return acc;
        }, 0);
        expect(yCount).toEqual(2);

        const blankCount = squares.reduce((acc, square) => {
            if (square.props.value === "") acc++;
            return acc;
        }, 0);
        expect(blankCount).toEqual(4);
    });

    test("winning squares are marked winning", function(){
        const mockData = {
            currentGame: {
                field: ["X", "X", "X", "Y", "Y", "", "", "", ""],
            },
        };

        let testRendererInstance;
        act(()=>{
            testRendererInstance = create(
                <CurrentGameContext.Provider value={mockData}>
                    <Board/>
                </CurrentGameContext.Provider>
            );
        });

        const root = testRendererInstance.root;
        const squares = root.findAllByType(Square);

        // validate - x is the winner
        squares.forEach(square=>{
            if (square.props.value === "X"){
                expect(square.props).toHaveProperty("isWinning", true);
            }
            if (square.props.value === "Y") {
                expect(square.props).toHaveProperty("isWinning", false);
            }
            if (square.props.value === "") {
                expect(square.props).toHaveProperty("isWinning", false);
            }
        });
    });

    test("squares with values are not clickable and empty squares are clickable", function(){
        const mockData = {
            currentGame: {
                field: ["X", "X", "", "Y", "Y", "", "", "", ""],
            },
        };

        let testRendererInstance;
        act(()=>{
            testRendererInstance = create(
                <CurrentGameContext.Provider value={mockData}>
                    <Board/>
                </CurrentGameContext.Provider>
            );
        });

        const root = testRendererInstance.root;
        const squares = root.findAllByType(Square);

        // validate - x is the winner
        squares.forEach(square=>{
            if (square.props.value === "X"){
                expect(square.props).toHaveProperty("isClickable", false);
            }
            if (square.props.value === "Y") {
                expect(square.props).toHaveProperty("isClickable", false);
            }
            if (square.props.value === "") {
                expect(square.props).toHaveProperty("isClickable", true);
            }
        });
    });
    test("empty squares are not clickable when there is a winner", function(){
        const mockData = {
            currentGame: {
                field: ["X", "X", "X", "Y", "Y", "", "", "", ""],
            },
        };

        let testRendererInstance;
        act(()=>{
            testRendererInstance = create(
                <CurrentGameContext.Provider value={mockData}>
                    <Board/>
                </CurrentGameContext.Provider>
            );
        });

        const root = testRendererInstance.root;
        const squares = root.findAllByType(Square);

        // validate - x is the winner
        squares.forEach(square=>{

            if (square.props.value === "") {
                expect(square.props).toHaveProperty("isClickable", false);
            }
        });
    });
    describe("dispatch of update action", function(){
        test("square click dispatches an update action with token in field and alternating currTurn", function(){
            const dispatchSpy = jest.fn();
            const mockData = {
                dispatch: dispatchSpy,
                actionTypes: {
                    update: "update",
                },
                currentGame: {
                    field: ["", "", "", "", "", "", "", "", ""],
                    currTurn: "X"
                },
            };

            let testRendererInstance;
            act(()=>{
                testRendererInstance = create(
                    <CurrentGameContext.Provider value={mockData}>
                        <Board/>
                    </CurrentGameContext.Provider>
                );
            });

            const root = testRendererInstance.root;
            const squares = root.findAllByType(Square);
            const square = squares[0];
            const onClickHandler = square.props.onClick;
            const index = square.props.index;
            onClickHandler(index);
            const calledAction = dispatchSpy.mock.calls[0][0];
            expect(calledAction).toMatchObject({
                type: "update",
                game: {
                    currTurn: "Y",
                    field: ["X", "", "", "", "", "", "", "", ""],
                }
            });
        });
        test("dispatch is not called when there is a already a winner", function(){
            const dispatchSpy = jest.fn();
            const mockData = {
                dispatch: dispatchSpy,
                actionTypes: {
                    update: "update",
                },
                currentGame: {
                    field: ["X", "X", "X", "Y", "Y", "", "", "", ""],
                    currTurn: "Y"
                },
            };

            let testRendererInstance;
            act(()=>{
                testRendererInstance = create(
                    <CurrentGameContext.Provider value={mockData}>
                        <Board/>
                    </CurrentGameContext.Provider>
                );
            });

            const root = testRendererInstance.root;
            const squares = root.findAllByType(Square);
            const square = squares[0];
            const onClickHandler = square.props.onClick;
            const index = square.props.index;

            // test
            onClickHandler(index);

            // validate
            expect(dispatchSpy).not.toHaveBeenCalled();
        });
    });
});