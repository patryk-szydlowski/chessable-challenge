import {Set} from "immutable"
import {of} from "rxjs"
import {filter, map, mergeMap, withLatestFrom} from "rxjs/operators"
import {isActionOf} from "typesafe-actions"
import {pickRandom} from "common/utils"
import {ChessboardEpic} from "features/chessboard/types"
import {isLegalPieceMove} from "features/piece/moves"
import {
  PieceMove,
  PieceMoveScenario,
  PieceSpecialState
} from "features/piece/types"
import {
  capturePiece,
  movePiece,
  spawnPiece,
  spawnPieceAtRandomPosition
} from "./chessboard.actions"
import {
  selectBoardSize,
  selectEmptyPositions,
  selectNextAvailablePieceId,
  selectPieceById,
  selectPieceByPosition,
  selectTileEmpty
} from "./chessboard.selectors"

export const spawnPieceEpic: ChessboardEpic = (action$, state$) => action$.pipe(
  filter(isActionOf(spawnPiece.request)),
  withLatestFrom(state$),
  map(([{payload: pieceSpawn}, state]) => {
    const tileEmpty = selectTileEmpty(state)(pieceSpawn.position)
    const pieceId = selectNextAvailablePieceId(state)

    return tileEmpty
      ? spawnPiece.success({
        spawnedPiece: {
          id: pieceId,
          ...pieceSpawn,
          specialStates: Set([PieceSpecialState.FIRST_MOVE])
        }
      })
      : spawnPiece.failure({})
  })
)

export const spawnPieceAtRandomPositionEpic: ChessboardEpic = (actions$, state$) => actions$.pipe(
  filter(isActionOf(spawnPieceAtRandomPosition.request)),
  withLatestFrom(state$),
  mergeMap(([{payload: pieceSpawn}, state]) => {
    const emptyPositions = selectEmptyPositions(state)
    const position = pickRandom(emptyPositions)

    return !!position
      ? of(
        spawnPieceAtRandomPosition.success(),
        spawnPiece.request({...pieceSpawn, position})
      )
      : of(spawnPieceAtRandomPosition.failure({}))
  }),
)

export const movePieceEpic: ChessboardEpic = (action$, state$) => action$.pipe(
  filter(isActionOf(movePiece.request)),
  withLatestFrom(state$),
  mergeMap(([{payload: {pieceId, movePosition}}, state]) => {
    const piece = selectPieceById(state)(pieceId)

    if (!piece) {
      return of(movePiece.failure({}))
    }

    const boardSize = selectBoardSize(state)
    const pieceOnDestination = selectPieceByPosition(state)(movePosition)

    const isDestinationPositionEmpty = !pieceOnDestination
    const isCaptureMove = !!pieceOnDestination && pieceOnDestination.color !== piece.color

    const move: PieceMove = {
      xOffset: movePosition.x - piece.position.x,
      yOffset: movePosition.y - piece.position.y,
      scenario: isCaptureMove
        ? PieceMoveScenario.CAPTURE
        : piece.specialStates.has(PieceSpecialState.FIRST_MOVE)
          ? PieceMoveScenario.FIRST_MOVE
          : PieceMoveScenario.MOVE
    }

    if (!isCaptureMove && !isDestinationPositionEmpty) {
      return of(movePiece.failure({}))
    }

    if (!isLegalPieceMove(piece, move, boardSize)) {
      return of(movePiece.failure({}))
    }

    const movePieceSuccess = movePiece.success({
      movedPiece: {
        ...piece,
        position: movePosition,
        specialStates: piece.specialStates.delete(PieceSpecialState.FIRST_MOVE)
      }
    })

    return !!pieceOnDestination
      ? of(movePieceSuccess, capturePiece({capturedPieceId: pieceOnDestination.id}))
      : of(movePieceSuccess)
  })
)

export const chessboardEpics = [
  spawnPieceEpic,
  spawnPieceAtRandomPositionEpic,
  movePieceEpic,
]
