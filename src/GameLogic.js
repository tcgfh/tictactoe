// Reducers for general game calculation logic
// such as who the winner is or whose turn it is
import {TOKEN} from "./Constants";

export const detectWinner = function(state){
    const valueAt = function(index) {
      return state[index];
    }
      const checks = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      for(let i = 0; i < checks.length; i++) {
        const currCheck = checks[i];
        const winner = valueAt(currCheck[0]);
        if (winner && valueAt(currCheck[1]) === winner && valueAt(currCheck[2]) === winner) {
          return {
            winner,
            winningIndices: currCheck,
          }
        }
      }
      let tokenCount = 0;
      for (let i = 0; i < 9; i++) {
        if (valueAt(i) === "X" || valueAt(i) === "Y") tokenCount++;
      }
      return {
        isTie: tokenCount === 9,
      };
}

export function coordToIndex(x, y) {
  // precondition
  //x & y are both in range
  /*
  [0,0] = 0;
  [0,1] = 1;
  [0,2] = 2;
  [1,0] = 3;
  [1,1] = 4;
  [1,2] = 5;
  [2, 0] = 6;
  [2, 1] = 7;
  [2, 2] = 8;
  */

  return (x*3) + y;
}

export function indexToCoord(index) {
  let x = Math.floor(index / 3);
  let y = index % 3;
  return {
    x,
    y,
  };
}

const MAX_X = 2;
export function detectHorizontalWin(valueAt, y, tokenValue) {
  let winningIndices =[];
  for (let i = 0; i <= MAX_X; i++) {
    const index = coordToIndex(i,y);
    if (valueAt(index) !== tokenValue) return false;
    winningIndices.push(index);
  }
  return {
    winner: tokenValue,
    winningIndices,
  };
}

const MAX_Y= 2;
export function detectVerticalWin(valueAt, x, tokenValue) {
  let winningIndices =[];
  for (let i = 0; i <= MAX_Y; i++) {
    const index = coordToIndex(x, i);
    if (valueAt(index) !== tokenValue) return false;
    winningIndices.push(index);
  }
  return {
    winner: tokenValue,
    winningIndices,
  }
}

export function detectDiagonalWinDescending(valueAt, tokenValue) {
  let x = 0;
  let y = 0;
  const winningIndices = [];
  while (x <= MAX_X && y <=MAX_Y) {
    const index = coordToIndex(x, y);
    if (valueAt(index) !== tokenValue) return false;
    winningIndices.push(index);
    x++;
    y++;
  }

  return {
    winner: tokenValue,
    winningIndices,
  };
}

export function detectDiagonalWinAscending(valueAt, tokenValue) {
  let x = 0;
  let y = MAX_Y;
  const winningIndices = [];
  while (x <= MAX_X && y >= 0) {
    const index = coordToIndex(x, y);
    if (valueAt(index) !== tokenValue) return false;
    winningIndices.push(index);
    x++;
    y--;
  }

  return {
    winner: tokenValue,
    winningIndices,
  };
}

export function detectTie(valueAt) {
  let tokenCount = 0;
  for (let i = 0; i < 9; i++) {
    if (valueAt(i) === TOKEN.X || valueAt(i) === TOKEN.Y) tokenCount++;
  }
  return {
    isTie: tokenCount === 9, // all squares have tokens
  };
}

export const helpers = {
  detectHorizontalWin,
  detectVerticalWin,
  detectDiagonalWinAscending,
  detectDiagonalWinDescending,
  detectTie,
};

export function detectWinnerFromLastMove({indexOfLastMove, currTurn, field}) {
  // check if the last move wins the game
  // no need to test the other tokens because we assume there has
  // not been a winner up to that point.
  const {
    detectHorizontalWin,
    detectVerticalWin,
    detectDiagonalWinAscending,
    detectDiagonalWinDescending,
    detectTie,
  } = helpers;

  const valueAt = function(index) {
    return field[index];
  }
  const tokenValue = currTurn === TOKEN.X ? TOKEN.Y : TOKEN.X;
  const {x, y} = indexToCoord(indexOfLastMove);

  // compare the horizontal and vertical
  let result = detectHorizontalWin(valueAt, y, tokenValue);
  result = result || detectVerticalWin(valueAt, x, tokenValue);

  // detect diagonal wins on the corner and center squares
  // in the board, they happen to be the even numbered indexes (including 0)
  const shouldConsiderDiagonalWin = indexOfLastMove % 2 === 0;
  result = result || ( shouldConsiderDiagonalWin && detectDiagonalWinAscending(valueAt, tokenValue));
  result = result || ( shouldConsiderDiagonalWin && detectDiagonalWinDescending(valueAt, tokenValue));

  result = result || detectTie(valueAt);
  return result;
}