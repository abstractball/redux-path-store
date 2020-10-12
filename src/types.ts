import { ConfigureStoreOptions, EnhancedStore } from '@reduxjs/toolkit'
import React from 'react'

export interface PathStoreOptions<T> {
  reduxStoreOptions?: Partial<ConfigureStoreOptions>
  onStateChange?: OnStateChange<T>
}

export interface ActionMap<T> {
  [key: string]: StateReducer<T>
}

export type UseReduxState<T> = [T, (action: React.SetStateAction<T>) => PathStoreAction<T>, () => PathStoreAction<T>]
export type UseOptionalReduxState<T> = [T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>] | UseReduxState<T>
export type OnStateChange<T> = ((state: T, action: PathStoreAction<T>, newState: T) => any) | undefined
export type StateReducer<T> = (state: T, action: PathStoreAction<T>) => T
export type ValueOf<T> = T[keyof T];

export type PathStoreAction<T> = {
  type: string
  immutablePath: string
  value: ActionPayload<T>
}

export type ActionPayload<T> = {
  key: string
  value: T
}

export type MorphsAs<T> = {
  [key in keyof T]: PathStoreMap<T[key]>
};
export type PathStoreMap<T> = MorphsAs<T> & {
  store: EnhancedStore // Redux store we generated with the map
  path: string // The objects path used for immutable object path set
  defaultValue: T // Allows us to reset a value
  actionName: string // Redux action name
};
