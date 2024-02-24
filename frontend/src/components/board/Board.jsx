import React from "react";
import Tile from "../tiles/Tile";

function Board() {
  const board = [];
  const pieces = [];
  const xAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const yAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];

  // Pawns
  for (let i = 0; i < 8; i++) {
    // Black
    pieces.push({ image: "pieces/B_pawn.png", x: i, y: 6 });
  }
  for (let i = 0; i < 8; i++) {
    // White
    pieces.push({ image: "pieces/W_pawn.png", x: i, y: 1 });
  }

  for (let i = 0; i <= 1; i++) {
    let color = i === 0 ? "W" : "B";
    let y = color === "W" ? 0 : 7;
    // Rooks
    pieces.push({ image: `pieces/${color}_rook.png`, x: 0, y });
    pieces.push({ image: `pieces/${color}_rook.png`, x: 7, y });
    // Knights
    pieces.push({ image: `pieces/${color}_knight.png`, x: 1, y });
    pieces.push({ image: `pieces/${color}_knight.png`, x: 6, y });
    // Bishops
    pieces.push({ image: `pieces/${color}_bishop.png`, x: 2, y });
    pieces.push({ image: `pieces/${color}_bishop.png`, x: 5, y });
    // Queen
    pieces.push({ image: `pieces/${color}_queen.png`, x: 3, y });
    // King
    pieces.push({ image: `pieces/${color}_king.png`, x: 4, y });
  }

  let activePiece = null;

  function grabbingPiece(e) {
    if (e.target.classList.contains("piece")) {
      const x = e.clientX - 40;
      const y = e.clientY - 40;
      e.target.style.position = " absolute";
      e.target.style.left = `${x}px`;
      e.target.style.top = `${y}px`;

      activePiece = e.target;
    }
  }

  function movePiece(e) {
    const element = e.target;
    if (activePiece && activePiece.classList.contains("piece")) {
      const x = e.clientX - 40;
      const y = e.clientY - 40;
      activePiece.style.position = " absolute";
      activePiece.style.left = `${x}px`;
      activePiece.style.top = `${y}px`;
    }
  }

  function dropPiece(e){
    if(activePiece){
      activePiece = null;
    }
  }

  for (let j = yAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < xAxis.length; i++) {
      let image = undefined;

      pieces.forEach((p) => {
        if (p.x === i && p.y === j) {
          image = p.image;
        }
      });

      board.push(
        <Tile
          key={`${xAxis[i]}${yAxis[j]}`}
          color={(j + i + 2) % 2 === 0 ? "#769656" : "#EEEED2"}
          image={image}
        />
      );
    }
  }
  return (
    <div
      onMouseDown={(e) => grabbingPiece(e)}
      onMouseMove={(e) => movePiece(e)}
      onMouseUp={(e) => dropPiece(e)}
      className="h-[80vh] w-[80vh] bg-blue-300 flex flex-wrap"
    >
      {board}
    </div>
  );
}

export default Board;
