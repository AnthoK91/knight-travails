//Breadth Search First
let queue = [];

//A JavaScript Set is a collection of unique values. Each value can only occur once. It works well here rather than doing a for loop or check for each addition.
let visited = new Set();

//maps hold key: value pairs in an object. Methods are get, set, size (and more)
let parentMap = new Map();

//Takes a start position and an end result, and determines the shortest path there
function determinePath(start, end) {
  queue.push(start);
  visited.add(start.toString());
  //return all moves and add to queue if they are valid. In this iteration, we don't just stop when we reach the goal the first time,
  // instead, we get every combination until we reach the end goal (in the while loop).
  nextMove(start);
  //while the queue is not 0, check to see if the queue 0 pos matches the end goal. By way of ordering, the first time the queue hits the end goal, it's the shortest path.
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
  //creates a new array, path, with the starting point as the end

  let path = [end];

  //gets the current position as the end

  let current = end.toString();

  // Trace back from end to start using the parentMap.
  while (current !== start.toString()) {
    //get the mapped key from the 'current' reference.

    const parent = parentMap.get(current);
    if (!parent) {
      console.error("Parent not found for:", current);
      break;
    }
    //add that to the path array by using unshift, so it adds it to the front of the array

    path.unshift(parent);
    current = parent.toString();
  }

  //Once the while loop breaks it means that you reached the start position, so it prints out your pathway

  console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
  path.forEach((pos) => console.log(pos));
  queue = [];

  //A JavaScript Set is a collection of unique values. Each value can only occur once. It works well here rather than doing a for loop or check for each addition.
  visited = new Set();

  //maps hold key: value pairs in an object. Methods are get, set, size (and more)
  parentMap = new Map();

  return path;
}
