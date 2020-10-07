import * as immutable from 'object-path-immutable'
import { ConfigureStoreOptions } from '@reduxjs/toolkit'
import React from 'react'
import PathStore from './PathStore'
import { PathStoreMap } from './index'

export function createPathStore<T>(initialState: T, options: Partial<ConfigureStoreOptions> = {}, onStateChange: OnStateChange<T> = undefined): PathStore<T> {
  return new PathStore<T>(initialState, options, onStateChange)
}

export function getReduxState<T>(pathStoreMap: PathStoreMap<T>) {
  return immutable.get(pathStoreMap.store.getState(), pathStoreMap.path)
}

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
