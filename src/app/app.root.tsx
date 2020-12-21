import React, {FC} from "react"
import {AppProvider} from "./app.provider"
import {InteractiveChessboard} from "features/chessboard/components"

export const AppRoot: FC = () => (
  <AppProvider>
    <InteractiveChessboard/>
  </AppProvider>
)
