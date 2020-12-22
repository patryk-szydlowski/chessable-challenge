import React from "react"
import {useDispatch, useSelector} from "react-redux"
import {dismissError, selectError} from "features/chessboard/store"
import {BoardErrorNotification} from "./board-error-notification"

export const BoardErrorNotificationContainer: React.VFC = () => {
  const error = useSelector(selectError)

  const dispatch = useDispatch()
  const dismissErrorNotification = () => dispatch(dismissError())

  return (
    <>
      {error && (
        <BoardErrorNotification
          error={error}
          onClose={dismissErrorNotification}
        />
      )}
    </>
  )
}
