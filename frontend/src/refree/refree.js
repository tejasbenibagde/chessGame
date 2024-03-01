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

  isEnPassantMove(initialPosition, desiredPosition, type, team, boardState) {
    const pawnDirection = team === "OUR" ? 1 : -1;

    if (type === "PAWN") {
      if (
        (desiredPosition.x - initialPosition.x === -1 ||
          desiredPosition.x - initialPosition.x === 1) &&
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
        const piece = boardState.find(
          (p) =>
            p.x === desiredPosition.x &&
            p.y === desiredPosition.y - pawnDirection &&
            p.enPassant
        );
        if (piece) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   *
   * @param {*} grabPosition previous tile of piece from where it was grabbed; type: (object) {x,y}
   * @param {*} desiredPosition desired position of piece where you want to drop it; type: (object) {x,y}
   * @param {*} type piece type
   * @returns true if the move is valid, false otherwise
   */

  isValidMove(grabPosition, desiredPosition, type, team, boardState) {
    if (type === "PAWN") {
      const specialRow = team === "OUR" ? 1 : 6;
      const pawnDirection = team === "OUR" ? 1 : -1;

      // MOVEMENT LOGIC
      if (
        grabPosition.x === desiredPosition.x &&
        grabPosition.y === specialRow &&
        desiredPosition.y - grabPosition.y === 2 * pawnDirection
      ) {
        if (
          !this.tileIsOccupied(
            desiredPosition.x,
            desiredPosition.y,
            boardState
          ) &&
          !this.tileIsOccupied(
            desiredPosition.x,
            desiredPosition.y - pawnDirection,
            boardState
          )
        ) {
          return true;
        }
      } else if (
        grabPosition.x === desiredPosition.x &&
        desiredPosition.y - grabPosition.y === pawnDirection
      ) {
        if (
          !this.tileIsOccupied(desiredPosition.x, desiredPosition.y, boardState)
        ) {
          return true;
        }
      }

      // ATTACK LOGIC
      else if (
        desiredPosition.x - grabPosition.x === -1 &&
        desiredPosition.y - grabPosition.y === pawnDirection
      ) {
        // ATTACK IN  UPPER OR BOTTOM LEFT CORNER
        // console.log("UPPER OR BOTTOM LEFT CORNER");
        if (
          this.tileIsOccupiedByOpponent(
            desiredPosition.x,
            desiredPosition.y,
            boardState,
            team
          )
        ) {
          return true;
        }
      } else if (
        desiredPosition.x - grabPosition.x === 1 &&
        desiredPosition.y - grabPosition.y === pawnDirection
      ) {
        // ATTACK IN  UPPER OR BOTTOM RIGHT CORNER
        // console.log("UPPER OR BOTTOM RIGHT CORNER");
        if (
          this.tileIsOccupiedByOpponent(
            desiredPosition.x,
            desiredPosition.y,
            boardState,
            team
          )
        ) {
          return true;
        }
      }
    }
    return false;
  }
}
