export type TilePosition = {
  row: number
  column: number
}

export enum TileOccupation {
  EMPTY = "empty",
  OCCUPIED_BY_WHITE = "occupied-by-white",
  OCCUPIED_BY_BLACK = "occupied-by-black"
}
