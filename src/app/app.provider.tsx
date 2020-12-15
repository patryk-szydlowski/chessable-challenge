import React from "react";
import {Provider as StoreProvider} from "react-redux";
import {store} from "./app.store";

export const AppProvider: React.FC = ({children}) => (
  <StoreProvider store={store}>
    {children}
  </StoreProvider>
)
