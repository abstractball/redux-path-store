import { getReduxState } from '../index'
import React from 'react'
import { PathStoreMap } from '../types'

export function setReduxState<T>(pathStoreMap: PathStoreMap<T>, action: React.SetStateAction<T>): React.Dispatch<React.SetStateAction<T>> {
  if (typeof action === 'function') {
    action = (action as Function)(getReduxState(pathStoreMap))
  }

  return pathStoreMap.store.dispatch({
    type: pathStoreMap.actionName,
    key: pathStoreMap.path,
    value: action,
  } as any)
}
