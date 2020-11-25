import React from 'react'
import { getReduxState } from './getReduxState'
import { ActionPayload, PathStoreAction, PathStoreMap } from '../types'

export function setReduxState<T>(pathStoreMap: PathStoreMap<T>, action: React.SetStateAction<T>): PathStoreAction<T> {
  if (typeof action === 'function') action = (action as Function)(getReduxState(pathStoreMap))

  const payload = action as any as ActionPayload<T>

  if (!pathStoreMap.store || !('dispatch' in pathStoreMap.store)) {
    throw new Error('Missing store')
  }

  return pathStoreMap.store.dispatch({
    type: pathStoreMap.actionName,
    immutablePath: pathStoreMap.path,
    value: payload,
  } as PathStoreAction<T>)
}
