import React from 'react'
import { getReduxState } from './getReduxState'
import { PathStoreMap } from '../index'

export function setReduxState<T>(pathStoreMap: PathStoreMap<T>, action: React.SetStateAction<T>): React.Dispatch<React.SetStateAction<T>> {
  if (typeof action === 'function') action = (action as Function)(getReduxState(pathStoreMap))

  return pathStoreMap.store.dispatch({
    type: pathStoreMap.actionName,
    key: pathStoreMap.path,
    value: action,
  } as any)
}
