export default class Refree {
  tileIsOccupied(x, y, boardState) {
    const piece = boardState.find((p) => p.x === x && p.y === y);

    if (piece) {
      return true;
    } else {
      return false;
    }
  }

  tileIsOccupiedByOpponent(x, y, boardState, team) {
    const piece = boardState.find(
      (p) => p.x === x && p.y === y && p.team != team
    );

    if (piece) {
      return true;
    } else {
      return false;
    }
  }

  isEnPassantMove(px, py, x, y, type, team, boardState) {
    const pawnDirection = team === "OUR" ? 1 : -1;

    if (type === "PAWN") {
      if ((x - px === -1 || x - px === 1) && y - py === pawnDirection) {
        const piece = boardState.find(
          (p) => p.x === x && p.y === y - pawnDirection && p.enPassant
        );
        if (piece) {
          return true;
        }
      }
    }

    // if the attacking piece is a pawn
    // Check if upper left/right or lower left/right
    // if a piece is under or above the attacked tile
    // if the attacked piece has made a enpassant move in a previous turn

    return false;
  }

  /**
   *
   * @param {*} px previous piece location x axis
   * @param {*} py previous piece location y axis
   * @param {*} x current piece location x axis
   * @param {*} y current piece location y axis
   * @param {*} type piece type
   * @returns true if the move is valid, false otherwise
   */

  isvalidMove(px, py, x, y, type, team, boardState) {
    if (type === "PAWN") {
      const specialRow = team === "OUR" ? 1 : 6;
      const pawnDirection = team === "OUR" ? 1 : -1;

      // MOVEMENT LOGIC
      if (px === x && py === specialRow && y - py === 2 * pawnDirection) {
        if (
          !this.tileIsOccupied(x, y, boardState) &&
          !this.tileIsOccupied(x, y - pawnDirection, boardState)
        ) {
          return true;
        }
      } else if (px === x && y - py === pawnDirection) {
        if (!this.tileIsOccupied(x, y, boardState)) {
          return true;
        }
      }

      // ATTACK LOGIC
      else if (x - px === -1 && y - py === pawnDirection) {
        // ATTACK IN  UPPER OR BOTTOM LEFT CORNER
        // console.log("UPPER OR BOTTOM LEFT CORNER");
        if (this.tileIsOccupiedByOpponent(x, y, boardState, team)) {
          return true;
        }
      } else if (x - px === 1 && y - py === pawnDirection) {
        // ATTACK IN  UPPER OR BOTTOM RIGHT CORNER
        // console.log("UPPER OR BOTTOM RIGHT CORNER");
        if (this.tileIsOccupiedByOpponent(x, y, boardState, team)) {
          return true;
        }
      }
    }
    return false;
  }
}
