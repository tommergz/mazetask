"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var start = { x: 1, y: 1 };
var wayOut = function (maze, start) {
    var allWay = [];
    var passedPoitns = [];
    var finish = start;
    var exit = false;
    var xLineLengh = maze[0].length - 1;
    var yLineLengh = maze.length - 1;
    if (!maze[start.y][start.x]) {
        alert("This cell isn't walkable");
        return null;
    }
    var exits = [];
    for (var i = 0; i <= xLineLengh; i++) {
        if (maze[0][i]) {
            exits.push({ x: i, y: 0 });
        }
    }
    for (var i = 0; i <= xLineLengh; i++) {
        if (maze[yLineLengh][i]) {
            exits.push({ x: i, y: yLineLengh });
        }
    }
    for (var i = 0; i <= yLineLengh; i++) {
        if (maze[i][0]) {
            exits.push({ x: 0, y: i });
        }
    }
    for (var i = 0; i <= yLineLengh; i++) {
        if (maze[i][xLineLengh]) {
            exits.push({ x: xLineLengh, y: i });
        }
    }
    exits = exits.filter(function (obj) { return obj.x !== finish.x || obj.y !== finish.y; });
    if (!exits.length) {
        alert('There is no way out');
        return null;
    }
    var nextCellTest = function (x, y, way) {
        if (exit)
            return false;
        if (way.length > 1) {
            for (var i = 0; i < passedPoitns.length; i++) {
                if (passedPoitns[i].x === x && passedPoitns[i].y === y)
                    return false;
            }
        }
        if (!maze[y])
            return false;
        return maze[y][x];
    };
    var mole = function (point, way, directions) {
        var x = point.x;
        var y = point.y;
        if (way.length > 1) {
            if (x === finish.x && y === finish.y) {
                way.push(point);
                if (allWay.length === 0) {
                    allWay = way;
                }
                else {
                    allWay = allWay > way ? way : allWay;
                }
                ;
                exit = true;
                return allWay;
            }
        }
        ;
        way.push(point);
        passedPoitns.push(point);
        if (nextCellTest(x + directions[0], y + directions[1], way)) {
            var nextPoint = { x: x + directions[0], y: y + directions[1] };
            mole(nextPoint, __spreadArrays(way), directions);
        }
        if (nextCellTest(x + directions[2], y + directions[3], way)) {
            var nextPoint = { x: x + directions[2], y: y + directions[3] };
            mole(nextPoint, __spreadArrays(way), directions);
        }
        if (nextCellTest(x + directions[4], y + directions[5], way)) {
            var nextPoint = { x: x + directions[4], y: y + directions[5] };
            mole(nextPoint, __spreadArrays(way), directions);
        }
        if (nextCellTest(x + directions[6], y + directions[7], way)) {
            var nextPoint = { x: x + directions[6], y: y + directions[7] };
            mole(nextPoint, __spreadArrays(way), directions);
        }
    };
    for (var i = 0; i < exits.length; i++) {
        var start_1 = exits[i];
        mole(start_1, [], [0, -1, 1, 0, 0, 1, -1, 0]);
        passedPoitns = [];
        exit = false;
        mole(start_1, [], [1, 0, 0, 1, -1, 0, 0, -1]);
        passedPoitns = [];
        exit = false;
        mole(start_1, [], [0, 1, -1, 0, 0, -1, 1, 0]);
        passedPoitns = [];
        exit = false;
        mole(start_1, [], [-1, 0, 0, -1, 1, 0, 0, 1]);
    }
    return exit ? allWay.reverse() : 'There is no way out';
};
var X = false; // wall 
var _ = true; // pass 
var maze = [
    [X, X, X, X, X, X, X, X, X],
    [X, _, X, _, _, X, _, _, _],
    [X, _, X, X, _, X, _, X, X],
    [X, _, X, _, _, _, _, _, X],
    [_, _, X, _, X, _, X, _, X],
    [X, _, _, _, X, _, _, _, X],
    [X, X, X, X, X, _, X, X, X]
];
console.log(wayOut(maze, start));
//# sourceMappingURL=script.js.map