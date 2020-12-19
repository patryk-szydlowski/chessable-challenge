import React from "react"
import {Provider as StoreProvider} from "react-redux"
import {createStore} from "./store"

export const AppProvider: React.FC = ({children}) => (
  <StoreProvider store={createStore()}>
    {children}
  </StoreProvider>
)
