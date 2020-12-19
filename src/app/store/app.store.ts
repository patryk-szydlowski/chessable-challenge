import {
  applyMiddleware,
  compose,
  createStore as createReduxStore,
  Store
} from "redux"
import {createEpicMiddleware} from "redux-observable"
import {composeWithDevtools, configureDevtools} from "./app.devtools"
import {appEpic} from "./app.epic"
import {appReducer} from "./app.reducer"

export function createStore(): Store {
  const composeEnhancers = composeWithDevtools || compose
  configureDevtools()

  const epicMiddleware = createEpicMiddleware()

  const enhancers = composeEnhancers(applyMiddleware(epicMiddleware))

  const store = createReduxStore(appReducer, enhancers)

  epicMiddleware.run(appEpic)

  return store
}
