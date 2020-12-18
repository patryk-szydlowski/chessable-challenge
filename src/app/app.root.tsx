import React, {FC} from "react"
import {ChessboardContainer} from "features/chessboard/components";
import {AppProvider} from "./app.provider"

export const AppRoot: FC = () => (
  <AppProvider>
    <ChessboardContainer/>
  </AppProvider>
)
