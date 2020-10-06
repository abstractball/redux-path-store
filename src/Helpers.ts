import * as immutable from 'object-path-immutable'
import { ConfigureStoreOptions, EnhancedStore } from '@reduxjs/toolkit'
import React from 'react'
import PathStore from './PathStore'

type MorphsAs<T> = {
  [key in keyof T]: PathStoreMap<T[key]>
};

export type PathStoreMap<T> = MorphsAs<T> & {
  store: EnhancedStore
  path: string // The string path to access the objects attribute.
  defaultValue: T // Allows us to reset a value
  actionName: string // Redux action name.
};

export function createPathStore<T>(initialState: T, options: Partial<ConfigureStoreOptions> = {}, onStateChange: OnStateChange = undefined): PathStore<T> {
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
