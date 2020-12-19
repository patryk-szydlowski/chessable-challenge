import {ActionsObservable, StateObservable} from "redux-observable"
import {Observable} from "rxjs"
import {Action} from "typesafe-actions"

export function actions<T extends Action>(action$: Observable<T>): ActionsObservable<T> {
  return action$ as ActionsObservable<T>
}

export function state<T>(state$: Observable<T>): StateObservable<T> {
  return state$ as StateObservable<T>
}
