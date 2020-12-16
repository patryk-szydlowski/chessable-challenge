import React, {FC} from "react"
import {Chessboard} from "features/chessboard/components"
import {AppProvider} from "./app.provider"

export const AppRoot: FC = () => (
  <AppProvider>
    <Chessboard/>
  </AppProvider>
)
