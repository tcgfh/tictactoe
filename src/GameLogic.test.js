import { detectWinner } from './GameLogic';

describe("detectWinner function", function(){
    describe("winning combinations for X", function(){
        const combinations = [
            [[0, 1, 2], ["X", "X", "X", "", "", "", "", "", ""]],
            [[3, 4, 5], ["", "", "", "X", "X", "X", "", "", ""]],
            [[6, 7, 8], ["", "", "", "", "", "", "X", "X", "X"]],
            [[0, 3, 6], ["X", "", "", "X", "", "", "X", "", ""]],
            [[1, 4, 7], ["", "X", "", "", "X", "", "", "X", ""]],
            [[2, 5, 8], ["", "", "X", "", "", "X", "", "", "X"]],
            [[0, 4, 8], ["X", "", "", "", "X", "", "", "", "X"]],
            [[2, 4, 6], ["", "", "X", "", "X", "", "X", "", ""]],
        ];
        for (let i = 0; i < combinations.length; i++) {
            test(`winning combination ${combinations[i][0]}`, function(){
                const result = detectWinner(combinations[i][1]);
                expect(result.winner).toEqual("X");
                expect(result.winningIndices).toEqual(combinations[i][0]);
            });
        }
    });
    describe("winning combinations for Y", function(){
        const combinations = [
            [[0, 1, 2], ["Y", "Y", "Y", "", "", "", "", "", ""]],
            [[3, 4, 5], ["", "", "", "Y", "Y", "Y", "", "", ""]],
            [[6, 7, 8], ["", "", "", "", "", "", "Y", "Y", "Y"]],
            [[0, 3, 6], ["Y", "", "", "Y", "", "", "Y", "", ""]],
            [[1, 4, 7], ["", "Y", "", "", "Y", "", "", "Y", ""]],
            [[2, 5, 8], ["", "", "Y", "", "", "Y", "", "", "Y"]],
            [[0, 4, 8], ["Y", "", "", "", "Y", "", "", "", "Y"]],
            [[2, 4, 6], ["", "", "Y", "", "Y", "", "Y", "", ""]],
        ];
        for (let i = 0; i < combinations.length; i++) {
            test(`winning combination ${combinations[i][0]}`, function(){
                const result = detectWinner(combinations[i][1]);
                expect(result.winner).toEqual("Y");
                expect(result.winningIndices).toEqual(combinations[i][0]);
            });
        }
    });

    test("tie game", function() {
        const result = detectWinner(["X", "Y", "X", "Y", "Y", "X", "X", "X", "Y"]);
        expect(result.winner).not.toBeDefined();
        expect(result.winningIndices).not.toBeDefined();
        expect(result.isTie).toBeTruthy();
    });
});
