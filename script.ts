const start = {x: 8, y: 1}

interface Coords { 
  x: number; 
  y: number; 
} 
type Maze = boolean[][]; 

const wayOut = (maze: Maze, start: Coords) => {
  let allWay: [{x: number, y: number}] = [{x: -2, y: -2}];           
  let passedPoitns: [{x: number, y: number}] = [{x: -2, y: -2}]; 
  const finish = start;   
  let exit = false;
  const xLineLengh = maze[0].length - 1;
  const yLineLengh = maze.length - 1;

  let exits = [];
  for (let i = 0; i <= xLineLengh; i++) {
    if (maze[0][i]) {
      exits.push({x: i, y: 0})
    }
  }
  for (let i = 0; i <= xLineLengh; i++) {
    if (maze[yLineLengh][i]) {
      exits.push({x: i, y: yLineLengh})
    }
  }
  for (let i = 0; i <= yLineLengh; i++) {
    if (maze[i][0]) {
      exits.push({x: 0, y: i})
    }
  }
  for (let i = 0; i <= yLineLengh; i++) {
    if (maze[i][xLineLengh]) {
      exits.push({x: xLineLengh, y: i})
    }
  }
  exits = exits.filter(obj => obj.x !== finish.x || obj.y !== finish.y);

  if (!maze[start.y][start.x]) {
    alert(`this cell isn't walkable`);
    return false;
  }
  const nextCellTest = (x: number, y: number, way: [{x: number, y: number}]) => {
    if (exit) return false;
    if (way.length > 1) {
      for (let i = 0; i < passedPoitns.length; i++) {
        if (passedPoitns[i].x === x && passedPoitns[i].y === y) return false
      }
    }
    if (!maze[y]) return false;
    return maze[y][x];
  }

  const mole = (point: {x: number, y: number}, way: [{x: number, y: number}], directions: [number, number, number, number, number, number, number, number]) => {
    const x = point.x;
    const y = point.y;
    if (way.length > 1) {
      if (x === finish.x && y === finish.y) {
        way.push(point);
          if (allWay.length === 1) {
            allWay = way;
          } else {
            allWay = allWay > way ? way : allWay
          };
        exit = true;
        return allWay;
      }
    };
    way.push(point);
    passedPoitns.push(point);

    if (nextCellTest(x + directions[0], y + directions[1], way)) {
      const nextPoint = {x: x + directions[0], y: y + directions[1]}
      mole(nextPoint, [...way], directions)
    }
    if (nextCellTest(x + directions[2], y + directions[3], way)) {
      const nextPoint = {x: x + directions[2], y: y + directions[3]}
      mole(nextPoint, [...way], directions)
    }
    if (nextCellTest(x + directions[4], y + directions[5], way)) {
      const nextPoint = {x: x + directions[4], y: y + directions[5]}
      mole(nextPoint, [...way], directions)
    }
    if (nextCellTest(x + directions[6], y + directions[7], way)) {
      const nextPoint = {x: x + directions[6], y: y + directions[7]}
      mole(nextPoint, [...way], directions)
    }
  }
  for (let i = 0; i < exits.length; i++) {
    let start = exits[i];
    mole(start, [{x: -2, y: -2}], [0, -1, 1, 0, 0, 1, -1, 0]);
    passedPoitns = [{x: -2, y: -2}];
    exit = false;
    mole(start, [{x: -2, y: -2}], [1, 0, 0, 1, -1, 0, 0, -1]);
    passedPoitns = [{x: -2, y: -2}];
    exit = false;
    mole(start, [{x: -2, y: -2}], [0, 1, -1, 0, 0, -1, 1, 0]);
    passedPoitns = [{x: -2, y: -2}];
    exit = false;
    mole(start, [{x: -2, y: -2}], [-1, 0, 0, -1, 1, 0, 0, 1]);
  }  
    allWay.splice(0, 1);
  return exit ? allWay.reverse() : 'There is no way out';
}

const X = false; // wall 
const _ = true; // pass 
const maze = [ 
  [X,X,X,X,X,X,X,X,X], 
  [X,_,X,_,_,X,_,_,_], 
  [X,_,X,X,_,X,_,X,X], 
  [X,_,X,_,_,_,_,_,X], 
  [_,_,X,_,X,_,X,_,X], 
  [X,_,_,_,X,_,_,_,X], 
  [X,X,X,X,X,_,X,X,X] 
];

console.log(wayOut(maze, start))