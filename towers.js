const { Queue } = require('./queue');

const possibleMoves = [[0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1]];

function solve(towers) {
  let solution = '';

  const priorStates = new Set();

  const queue = new Queue({ towers, path: '' });

  while (queue.length) {
    const { towers, path } = queue.dequeue();

    const serializedState = JSON.stringify(towers);

    /**
     * have we previously encounered this configuration of discs?
     * if so we would have already iterated over possible solutions
     * based on that state, so there's no need to do so again
     */
    if (!priorStates.has(serializedState)) {
      priorStates.add(serializedState);

      if (isSolved(towers)) {
        if (!solution) {
          solution = path;
        } else {
          if (path.length < solution.length) {
            solution = path;
          }
        }
      }

      possibleMoves
        .filter(([from, to]) => isValidMove(towers, from, to))
        .forEach(([from, to]) => {
          queue.enqueue({
            towers: moveDisc(towers, from, to),
            path: nextPath(path, from, to)
          });
        });
    }
  }

  return solution;
}

function isSolved(towers) {
  const [towerOne, towerTwo] = towers;
  return !towerOne.length && !towerTwo.length;
}

function isValidMove(towers, fromIndex, toIndex) {
  const fromTower = towers[fromIndex];
  const toTower = towers[toIndex];

  // are we attempting to remove a disc from an empty stack?
  if (!fromTower.length) return false;

  // are we talking about the same tower?
  if (fromIndex === toIndex) return false;

  // are we moving to an empty tower?
  if (!toTower.length) return true;

  // is fromDisc smaller than toDisc?
  const fromDiscSize = fromTower[fromTower.length - 1];
  const toDiscSize = toTower[toTower.length - 1];

  return toDiscSize > fromDiscSize;
}

function moveDisc(towers, fromIndex, toIndex) {
  const [towerOne, towerTwo, towerThree] = copyTowers(towers);

  let popFrom;
  switch (fromIndex) {
    case 0: {
      popFrom = towerOne;
      break;
    }
    case 1: {
      popFrom = towerTwo;
      break;
    }
    case 2: {
      popFrom = towerThree;
      break;
    }
  }

  let pushTo;
  switch (toIndex) {
    case 0: {
      pushTo = towerOne;
      break;
    }
    case 1: {
      pushTo = towerTwo;
      break;
    }
    case 2: {
      pushTo = towerThree;
      break;
    }
  }

  pushTo.push(popFrom.pop());

  return [towerOne, towerTwo, towerThree];
}

function copyTowers(towers) {
  return [towers[0].slice(), towers[1].slice(), towers[2].slice()];
}

function nextPath(path, from, to) {
  const nextMove = `${from}->${to}`;
  return path ? `${path},${nextMove}` : nextMove;
}

module.exports = { solve, isSolved, isValidMove, copyTowers, moveDisc };
