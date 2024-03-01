import React, { useRef, useState } from "react";
import Tile from "../tiles/Tile";
import Refree from "../../refree/refree";

function Board() {
  const [activePiece, setActivePiece] = useState(null);
  const [gridX, setGridX] = useState(0);
  const [gridY, setGridY] = useState(0);
  const chessBoardRef = useRef(null);
  const board = [];

  const refree = new Refree();

  // const pieces = [];
  const xAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const yAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];

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

      const currentPiece = pieces.find((p) => p.x === gridX && p.y === gridY);
      const attackedPiece = pieces.find((p) => p.x === x && p.y === y);

      if (currentPiece) {
        const validMove = refree.isvalidMove(
          gridX,
          gridY,
          x,
          y,
          currentPiece.type,
          currentPiece.team,
          pieces
        );

        const isEnPassantMove = refree.isEnPassantMove(
          gridX,
          gridY,
          x,
          y,
          currentPiece.type,
          currentPiece.team,
          pieces
        );
        const pawnDirection = currentPiece.team === "OUR" ? 1 : -1;
        if (isEnPassantMove) {
          const updatedPieces = pieces.reduce((result, piece) => {
            if (piece.x === gridX && piece.y === gridY) {
              piece.enPassant = false;
              piece.x = x;
              piece.y = y;
              result.push(piece);
            } else if (!(piece.x === x && piece.y === y - pawnDirection)) {
              if (piece.type === "PAWN") {
                piece.enPassant = false;
              }
              // Keep other pieces that do not match the dropped position
              result.push(piece);
            }
            return result;
          }, []);
          setPieces(updatedPieces);
        } else if (validMove) {
          // attacks piece position and if the piece is attacked removes it
          const updatedPieces = pieces.reduce((result, piece) => {
            if (piece.x === gridX && piece.y === gridY) {
              if (Math.abs(gridY - y) === 2 && piece.type === "PAWN") {
                // SPECIAL MOVE
                piece.enPassant = true;
              } else {
                piece.enPassant = false;
              }
              // Update the position of the current piece
              result.push({ ...piece, x, y });
            } else if (!(piece.x === x && piece.y === y)) {
              if (piece.type === "PAWN") {
                piece.enPassant = false;
              }
              // Keep other pieces that do not match the dropped position
              result.push(piece);
            }
            return result;
          }, []);
          setPieces(updatedPieces);
        } else {
          // resets the piece position
          activePiece.style.position = "relative";
          activePiece.style.removeProperty("top");
          activePiece.style.removeProperty("left");
        }
      }

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
