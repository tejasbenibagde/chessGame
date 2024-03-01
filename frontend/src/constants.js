const xAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const yAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const GRID_SIZE = 80;
const BOARD_SIZE = 640;

function samePosition(p1, p2) {
  return p1.x === p2.x && p1.y === p2.y;
}

const initialBoardState = [];

// Pawns
for (let i = 0; i < 8; i++) {
  // Black
  initialBoardState.push({
    image: "pieces/B_pawn.png",
    x: i,
    y: 6,
    type: "PAWN",
    team: "OPPONENT",
    enPassant: false,
  });
}
for (let i = 0; i < 8; i++) {
  // White
  initialBoardState.push({
    image: "pieces/W_pawn.png",
    x: i,
    y: 1,
    type: "PAWN",
    team: "OUR",
    enPassant: false,
  });
}

for (let i = 0; i <= 1; i++) {
  const teamType = i === 0 ? "OPPONENT" : "OUR";
  let color = teamType === "OUR" ? "W" : "B";
  let y = teamType === "OUR" ? 0 : 7;
  // Rooks
  initialBoardState.push({
    image: `pieces/${color}_rook.png`,
    x: 0,
    y,
    type: "ROOK",
    team: teamType,
  });
  initialBoardState.push({
    image: `pieces/${color}_rook.png`,
    x: 7,
    y,
    type: "ROOK",
    team: teamType,
  });
  // Knights
  initialBoardState.push({
    image: `pieces/${color}_knight.png`,
    x: 1,
    y,
    type: "KNIGHT",
    team: teamType,
  });
  initialBoardState.push({
    image: `pieces/${color}_knight.png`,
    x: 6,
    y,
    type: "KNIGHT",
    team: teamType,
  });
  // Bishops
  initialBoardState.push({
    image: `pieces/${color}_bishop.png`,
    x: 2,
    y,
    type: "BISHOP",
    team: teamType,
  });
  initialBoardState.push({
    image: `pieces/${color}_bishop.png`,
    x: 5,
    y,
    type: "BISHOP",
    team: teamType,
  });
  // Queen
  initialBoardState.push({
    image: `pieces/${color}_queen.png`,
    x: 3,
    y,
    type: "QUEEN",
    team: teamType,
  });
  // King
  initialBoardState.push({
    image: `pieces/${color}_king.png`,
    x: 4,
    y,
    type: "KING",
    team: teamType,
  });
}

export { xAxis, yAxis, initialBoardState, GRID_SIZE, BOARD_SIZE, samePosition };
