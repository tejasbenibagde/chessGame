import React, { useRef, useState } from "react";
import Tile from "../tiles/Tile";
import Refree from "../../refree/refree";
import {
  xAxis,
  yAxis,
  initialBoardState,
  GRID_SIZE,
  BOARD_SIZE,
  samePosition,
} from "../../constants";

function Board() {
  const [activePiece, setActivePiece] = useState(null);
  const [grabPosition, setGrabPosition] = useState({ x: -1, y: -1 });
  const chessBoardRef = useRef(null);
  const board = [];

  const refree = new Refree();

  const [pieces, setPieces] = useState(initialBoardState);

  function grabbingPiece(e) {
    const element = e.target;
    const chessBoard = chessBoardRef.current;
    if (element.classList.contains("piece") && chessBoard) {
      const grabX = Math.floor((e.clientX - chessBoard.offsetLeft) / GRID_SIZE);
      const grabY = Math.abs(
        Math.ceil((e.clientY - chessBoard.offsetTop - BOARD_SIZE) / GRID_SIZE)
      );
      setGrabPosition({ x: grabX, y: grabY });
      const x = e.clientX - GRID_SIZE / 2;
      const y = e.clientY - GRID_SIZE / 2;
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
      const x = e.clientX - GRID_SIZE / 2;
      const y = e.clientY - GRID_SIZE / 2;
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
      const x = Math.floor((e.clientX - chessBoard.offsetLeft) / GRID_SIZE);
      const y = Math.abs(
        Math.ceil((e.clientY - chessBoard.offsetTop - BOARD_SIZE) / GRID_SIZE)
      );
      const desiredPosition = { x, y };

      const currentPiece = pieces.find((p) => samePosition(p, grabPosition));

      if (currentPiece) {
        const validMove = refree.isValidMove(
          grabPosition,
          desiredPosition,
          currentPiece.type,
          currentPiece.team,
          pieces
        );

        const isEnPassantMove = refree.isEnPassantMove(
          grabPosition,
          desiredPosition,
          currentPiece.type,
          currentPiece.team,
          pieces
        );
        const pawnDirection = currentPiece.team === "OUR" ? 1 : -1;
        if (isEnPassantMove) {
          const updatedPieces = pieces.reduce((result, piece) => {
            if (samePosition(piece, grabPosition)) {
              piece.enPassant = false;
              piece.x = x;
              piece.y = y;
              result.push(piece);
            } else if (!samePosition(piece, { x, y: y - pawnDirection })) {
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
            if (samePosition(piece, grabPosition)) {
              // SPECIAL MOVE
              piece.enPassant =
                Math.abs(grabPosition.y - y) === 2 && piece.type === "PAWN";
              // Update the position of the current piece
              result.push({ ...piece, x, y });
            } else if (!samePosition(piece, { x, y })) {
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
