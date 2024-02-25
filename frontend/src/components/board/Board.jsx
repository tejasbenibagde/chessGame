import React, { useEffect, useRef, useState } from "react";
import Tile from "../tiles/Tile";

function Board() {
  const [activePiece, setActivePiece] = useState(null);
  const [gridX, setGridX] = useState(0);
  const [gridY, setGridY] = useState(0);
  const chessBoardRef = useRef(null);
  const board = [];
  // const pieces = [];
  const xAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const yAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];

  const initialBoardState = [];

  // Pawns
  for (let i = 0; i < 8; i++) {
    // Black
    initialBoardState.push({ image: "pieces/B_pawn.png", x: i, y: 6 });
  }
  for (let i = 0; i < 8; i++) {
    // White
    initialBoardState.push({ image: "pieces/W_pawn.png", x: i, y: 1 });
  }

  for (let i = 0; i <= 1; i++) {
    let color = i === 0 ? "W" : "B";
    let y = color === "W" ? 0 : 7;
    // Rooks
    initialBoardState.push({ image: `pieces/${color}_rook.png`, x: 0, y });
    initialBoardState.push({ image: `pieces/${color}_rook.png`, x: 7, y });
    // Knights
    initialBoardState.push({ image: `pieces/${color}_knight.png`, x: 1, y });
    initialBoardState.push({ image: `pieces/${color}_knight.png`, x: 6, y });
    // Bishops
    initialBoardState.push({ image: `pieces/${color}_bishop.png`, x: 2, y });
    initialBoardState.push({ image: `pieces/${color}_bishop.png`, x: 5, y });
    // Queen
    initialBoardState.push({ image: `pieces/${color}_queen.png`, x: 3, y });
    // King
    initialBoardState.push({ image: `pieces/${color}_king.png`, x: 4, y });
  }
  const [pieces, setPieces] = useState(initialBoardState);

  function grabbingPiece(e) {
    const element = e.target;
    const chessBoard = chessBoardRef.current;
    if (element.classList.contains("piece") && chessBoard) {
      setGridX(Math.floor((e.clientX - chessBoard.offsetLeft) / 80));
      setGridY(
        Math.abs(Math.ceil((e.clientY - chessBoard.offsetTop - 640) / 80))
      );
      const x = e.clientX - 40;
      const y = e.clientY - 40;
      element.style.position = " absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;

      setActivePiece(element);
    }
  }

  function movePiece(e) {
    const chessBoard = chessBoardRef.current;
    if (activePiece && chessBoard && activePiece.classList.contains("piece")) {
      const minX = chessBoard.offsetLeft;
      const minY = chessBoard.offsetTop;
      const maxX = minX + chessBoard.clientWidth - 70;
      const maxY = minY + chessBoard.clientHeight - 70;
      const x = e.clientX - 40;
      const y = e.clientY - 40;
      activePiece.style.position = " absolute";

      if (x < minX) {
        activePiece.style.left = `${minX}px`;
      } else if (x > maxX) {
        activePiece.style.left = `${maxX}px`;
      } else {
        activePiece.style.left = `${x}px`;
      }

      if (y < minY) {
        activePiece.style.top = `${minY}px`;
      } else if (y > maxY) {
        activePiece.style.top = `${maxY}px`;
      } else {
        activePiece.style.top = `${y}px`;
      }
    }
  }

  function dropPiece(e) {
    const chessBoard = chessBoardRef.current;
    if (activePiece && chessBoard) {
      const x = Math.floor((e.clientX - chessBoard.offsetLeft) / 80);
      const y = Math.abs(
        Math.ceil((e.clientY - chessBoard.offsetTop - 640) / 80)
      );

      // console.log("clientX = " + e.clientX + "clientY = " + e.clientY);
      // console.log(x, y);
      setPieces((value) => {
        const pieces = value.map((p) => {
          if (p.x === gridX && p.y === gridY) {
            p.x = x;
            p.y = y;
          }
          return p;
        });
        return pieces;
      });
      setActivePiece(null);
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
      ref={chessBoardRef}
      onMouseDown={(e) => grabbingPiece(e)}
      onMouseMove={(e) => movePiece(e)}
      onMouseUp={(e) => dropPiece(e)}
      className="h-[640px] w-[640px] bg-blue-300 flex flex-wrap"
    >
      {board}
    </div>
  );
}

export default Board;
