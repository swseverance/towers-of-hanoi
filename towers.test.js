const { solve, isSolved, isValidMove, moveDisc } = require('./towers');

let towers;

describe('solve()', () => {
  it('1 disc', () => {
    towers = [[1], [], []];
    expect(solve(towers)).toEqual('0->2');
  });

  it('2 discs', () => {
    towers = [[2, 1], [], []];
    expect(solve(towers)).toEqual('0->1,0->2,1->2');
  });

  it('3 discs', () => {
    towers = [[3, 2, 1], [], []];
    expect(solve(towers)).toEqual('0->2,0->1,2->1,0->2,1->0,1->2,0->2');
  });

  it('4 discs', () => {
    towers = [[4, 3, 2, 1], [], []];
    const solution = solve(towers);
    const numMoves = solution.split(',').length;
    expect(numMoves).toEqual(15);
  });

  it('5 discs', () => {
    towers = [[5, 4, 3, 2, 1], [], []];
    const solution = solve(towers);
    const numMoves = solution.split(',').length;
    expect(numMoves).toEqual(31);
  });
});

describe('isSolved()', () => {
  it('Test Case 1', () => {
    expect(isSolved([[], [], [1]])).toBe(true);
  });
  it('Test Case 2', () => {
    expect(isSolved([[1], [], []])).toBe(false);
  });
  it('Test Case 3', () => {
    expect(isSolved([[], [1], [2]])).toBe(false);
  });
  it('Test Case 4', () => {
    expect(isSolved([[], [], [2, 1]])).toBe(true);
  });
});

describe('isValidMove()', () => {
  it('Test Case 1', () => {
    expect(isValidMove([[1], [], []], 0, 1)).toBe(true);
  });

  it('Test Case 2', () => {
    expect(isValidMove([[1], [], [2]], 0, 2)).toBe(true);
  });

  it('Test Case 3', () => {
    expect(isValidMove([[1], [], [2]], 0, 0)).toBe(false);
  });

  it('Test Case 4', () => {
    expect(isValidMove([[1], [], [2]], 1, 2)).toBe(false);
  });

  it('Test Case 5', () => {
    expect(isValidMove([[1], [], [2]], 2, 0)).toBe(false);
  });
});

describe('moveDisc()', () => {
  it('Test Case 1', () => {
    expect(moveDisc([[1], [], []], 0, 1)).toEqual([[], [1], []]);
  });

  it('Test Case 2', () => {
    expect(moveDisc([[1], [], [2]], 0, 2)).toEqual([[], [], [2, 1]]);
  });

  it('Test Case 3', () => {
    expect(moveDisc([[1], [], [2]], 2, 1)).toEqual([[1], [2], []]);
  });

  it('Test Case 4', () => {
    expect(moveDisc([[], [1], [2]], 1, 2)).toEqual([[], [], [2, 1]]);
  });
});
