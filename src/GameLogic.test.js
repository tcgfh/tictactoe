import { TOKEN } from './Constants';
import {
    detectWinner,
    detectWinnerFromLastMove,
    coordToIndex,
    indexToCoord,
    detectHorizontalWin,
    detectVerticalWin,
    detectDiagonalWinAscending,
    detectDiagonalWinDescending,
    detectTie,
    helpers,
} from './GameLogic';

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

describe("coordToIndex", function(){
    [
        {x: 0, y: 0, expect: 0},
        {x: 0, y: 1, expect: 1},
        {x: 0, y: 2, expect: 2},
        {x: 1, y: 0, expect: 3},
        {x: 1, y: 1, expect: 4},
        {x: 1, y: 2, expect: 5},
        {x: 2, y: 0, expect: 6},
        {x: 2, y: 1, expect: 7},
        {x: 2, y: 2, expect: 8},
    ].forEach(({x, y, expect: expectation})=>{
        it(`returns the appropriate index for [${x}, ${y}]`, function(){
            expect(coordToIndex(x, y)).toEqual(expectation);
        })
    });
});

describe("indexToCoord", function(){
    for( let i = 0; i < 9; i++) {
        it(`is the inverse of coordToIndex for index value ${i}`, function(){
            const {x, y} = indexToCoord(i);
            expect(coordToIndex(x, y)).toEqual(i);
        });
    }
});

describe("detectHorizontalWin", function(){
    for(let i = 0; i <= 2; i++) {
        it(`detects a win for token placed at y coordinate value ${i}`, function(){
            const mockTokenValue = "Z";
            function valueAt(index) {
                const {x, y} = indexToCoord(index);
                if(y === i) {
                    return mockTokenValue;
                } else {
                    return;
                }
            }

            const result = detectHorizontalWin(valueAt, i, mockTokenValue);
            expect(result.winner).toEqual(mockTokenValue);
            expect(result.winningIndices).toEqual(expect.arrayContaining([
                coordToIndex(0, i),
                coordToIndex(1, i),
                coordToIndex(2, i),
            ]));
        });

        it(`detects a non-win for token placed at y coordinate value ${i}`, function(){
            const mockTokenValue = "Z";
            function valueAt(index) {
                return;
            }

            const result = detectHorizontalWin(valueAt, i, mockTokenValue);
            expect(result).toEqual(false);
        });
    }
});

describe("detectVerticalWin", function(){
    for(let i = 0; i <= 2; i++) {
        it(`detects a win for token placed at x coordinate value ${i}`, function(){
            const mockTokenValue = "Z";
            function valueAt(index) {
                const {x, y} = indexToCoord(index);
                if(x === i) {
                    return mockTokenValue;
                } else {
                    return;
                }
            }

            const result = detectVerticalWin(valueAt, i, mockTokenValue);
            expect(result.winner).toEqual(mockTokenValue);
            expect(result.winningIndices).toEqual(expect.arrayContaining([
                coordToIndex(i, 0),
                coordToIndex(i, 1),
                coordToIndex(i, 2),
            ]));
        });

        it(`detects a non-win for token placed at y coordinate value ${i}`, function(){
            const mockTokenValue = "Z";
            function valueAt(index) {
                return;
            }

            const result = detectVerticalWin(valueAt, i, mockTokenValue);
            expect(result).toEqual(false);
        });
    }
});

describe("detectDiagonalWinAscending", function(){
    it("detects a win", function(){
        const mockTokenValue = "Z";
        function valueAt(index) {
            const map = {
                2: mockTokenValue,
                4: mockTokenValue,
                6: mockTokenValue,
            };
            return map[index];
        }
        const result = detectDiagonalWinAscending(valueAt, mockTokenValue);
        expect(result.winner).toEqual(mockTokenValue);
        expect(result.winningIndices).toEqual(expect.arrayContaining([2, 4, 6]));
    });
    it("detects no win", function(){
        const mockTokenValue = "Z";
        function valueAt(index) {
            const map = {
                2: mockTokenValue,
                4: "M",
                6: mockTokenValue,
            };
            return map[index];
        }
        const result = detectDiagonalWinAscending(valueAt, mockTokenValue);
        expect(result).toEqual(false);
    });
});


describe("detectDiagonalWinDescending", function(){
    it("detects a win", function(){
        const mockTokenValue = "Z";
        function valueAt(index) {
            const map = {
                0: mockTokenValue,
                4: mockTokenValue,
                8: mockTokenValue,
            };
            return map[index];
        }
        const result = detectDiagonalWinDescending(valueAt, mockTokenValue);
        expect(result.winner).toEqual(mockTokenValue);
        expect(result.winningIndices).toEqual(expect.arrayContaining([0, 4, 8]));
    });
    it("detects no win", function(){
        const mockTokenValue = "Z";
        function valueAt(index) {
            const map = {
                0: mockTokenValue,
                4: "M",
                8: mockTokenValue,
            };
            return map[index];
        }
        const result = detectDiagonalWinDescending(valueAt, mockTokenValue);
        expect(result).toEqual(false);
    });
});

describe("detectTie", function(){
    it("returns a tie when all values are X or Y", function(){
        function valueAt(index) {
            const map = ["X", "Y", "X", "Y", "Y", "X", "X", "X", "Y"];
            return map[index];
        }
        expect(detectTie(valueAt)).toEqual({isTie: true});
    });
    it("returns a tie when not all values are X or Y", function(){
        function valueAt(index) {
            const map = ["X", "Y", "X", "Y", "Y", "X", "X", "X", ""];
            return map[index];
        }
        expect(detectTie(valueAt)).toEqual({isTie: false});
    });
});

describe("detectWinnerFromLastMove", function(){
    it("returns a result from detectHorizontalWin", function(){
        jest.spyOn(helpers, "detectHorizontalWin").mockReturnValue("mockResult");
        expect(detectWinnerFromLastMove({
            field: ["X"],
            indexOfLastMove: 0,
            currTurn: TOKEN.Y,
        })).toEqual("mockResult");
        expect(helpers.detectHorizontalWin).toHaveBeenCalledWith(expect.anything(), 0, TOKEN.X);
    });
    it("returns a result from detectVerticalWin", function(){
        jest.spyOn(helpers, "detectHorizontalWin").mockReturnValue();
        jest.spyOn(helpers, "detectVerticalWin").mockReturnValue("mockResult");
        expect(detectWinnerFromLastMove({
            field: ["X"],
            indexOfLastMove: 0,
            currTurn: TOKEN.Y,
        })).toEqual("mockResult");
        expect(helpers.detectVerticalWin).toHaveBeenCalledWith(expect.anything(), 0, TOKEN.X);
    });
    it("returns a result from detectDiagonalWinAscending", function(){
        jest.spyOn(helpers, "detectHorizontalWin").mockReturnValue();
        jest.spyOn(helpers, "detectVerticalWin").mockReturnValue();
        jest.spyOn(helpers, "detectDiagonalWinAscending").mockReturnValue("mockResult");

        expect(detectWinnerFromLastMove({
            field: ["X"],
            indexOfLastMove: 0,
            currTurn: TOKEN.Y,
        })).toEqual("mockResult");
        expect(helpers.detectDiagonalWinAscending).toHaveBeenCalledWith(expect.anything(), TOKEN.X);
    });

    it("returns a result from detectDiagonalWinDescending", function(){
        jest.spyOn(helpers, "detectHorizontalWin").mockReturnValue();
        jest.spyOn(helpers, "detectVerticalWin").mockReturnValue();
        jest.spyOn(helpers, "detectDiagonalWinAscending").mockReturnValue();
        jest.spyOn(helpers, "detectDiagonalWinDescending").mockReturnValue("mockResult");

        expect(detectWinnerFromLastMove({
            field: ["X"],
            indexOfLastMove: 0,
            currTurn: TOKEN.Y,
        })).toEqual("mockResult");
        expect(helpers.detectDiagonalWinDescending).toHaveBeenCalledWith(expect.anything(), TOKEN.X);
    });

    it("calls detectDiagonalWinDescending only for possible diagonal wins", function(){
        jest.spyOn(helpers, "detectHorizontalWin").mockReturnValue();
        jest.spyOn(helpers, "detectVerticalWin").mockReturnValue();
        jest.spyOn(helpers, "detectDiagonalWinAscending").mockReturnValue();
        jest.spyOn(helpers, "detectDiagonalWinDescending").mockReturnValue("mockResult");

        detectWinnerFromLastMove({
            field: ["X"],
            indexOfLastMove: 1,
            currTurn: TOKEN.Y,
        });
        expect(helpers.detectDiagonalWinDescending).not.toHaveBeenCalled();
    });

    it("returns a result from detectTie when no winners found", function(){
        jest.spyOn(helpers, "detectHorizontalWin").mockReturnValue();
        jest.spyOn(helpers, "detectVerticalWin").mockReturnValue();
        jest.spyOn(helpers, "detectDiagonalWinAscending").mockReturnValue();
        jest.spyOn(helpers, "detectDiagonalWinDescending").mockReturnValue();
        jest.spyOn(helpers, "detectTie").mockReturnValue("mockResult");
        expect(detectWinnerFromLastMove({
            field: ["X"],
            indexOfLastMove: 1,
            currTurn: TOKEN.Y,
        })).toEqual("mockResult");
    });
});