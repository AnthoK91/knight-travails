//Breadth Search First
let queue = [];
//What if visited was a nest of 8 arrays, one for each move type? Then we just push into the relevant array.
let visited = new Set();
let parentMap = new Map();

//Takes a start position and an end result, and determines the shortest path there
function determinePath(start, end) {
  queue.push(start);
  visited.add(start.toString());
  //return all moves and add to queue if possible
  nextMove(start);
  //while the queue is not 0, check to see if the queue 0 pos matches the end goal.
  // If it doesn't shift it off. If it does match, reverse engineer where you were and break out of the while loop
  while (queue.length > 0) {
    let currentPosition = queue.shift();

    if (currentPosition[0] === end[0] && currentPosition[1] === end[1]) {
      return reconstructPath(start, end);
    }
    nextMove(currentPosition);
  }
}

//Make a next move. If I make a next move I am creating 8 child nodes according to the chess board
//  Each time I create a node, I want to assess to see whether the child is out of bounds
// If the child node equals the endPosition
function nextMove(start) {
  const moves = [
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1],
  ];
  for (let move of moves) {
    let [dx, dy] = move;
    let newPosition = [start[0] + dx, start[1] + dy];

    //check if new pos is valid, on board, not visited
    if (isInBounds(newPosition) && !visited.has(newPosition.toString())) {
      queue.push(newPosition);
      visited.add(newPosition.toString());
      parentMap.set(newPosition.toString(), start);
    }
  }
}

function isInBounds([x, y]) {
  return x >= 0 && x < 8 && y >= 0 && y < 8;
}

function reconstructPath(start, end) {
  let path = [end];
  let current = end.toString();

  while (current !== start.toString()) {
    current = parentMap.get(current).toString();
    path.unshift(parentMap.get(current));
  }

  console.log(`You made it in ${path.length - 1} moves! Here's your path: `);
  path.forEach((pos) => console.log(pos));
  return path;
}
