import { ConfigureStoreOptions, EnhancedStore } from '@reduxjs/toolkit'
import React from 'react'

export interface PathStoreOptions<T> {
  reduxStoreOptions?: Partial<ConfigureStoreOptions>
  onStateChange?: OnStateChange<T>
}

export interface ActionMap<T> {
  [key: string]: StateReducer<T>
}

export interface PathContext<T> {
  context: React.Context<T>
  initialState: T
  paths: PathStoreMap<T>
  reduxPath: string
}

export type UseLocalOrReduxState<T> = UseReduxState<T> | [(T), React.Dispatch<React.SetStateAction<T>>]

export type UseReduxStateOptions<T, U = T> = {
  find?: FindWithinState<T, U>
  optional?: boolean
}

export type UseReduxSetReturn<T> = React.Dispatch<React.SetStateAction<T>> | PathStoreAction<T>

export type UseWithinState<T, U> = [U, (action: React.SetStateAction<U>) => UseReduxSetReturn<T>, () => UseReduxSetReturn<T>]

export type UseContextState<T> = [T, (action: React.SetStateAction<T>) => UseReduxSetReturn<T>, () => UseReduxSetReturn<T>]
export type UseReduxState<T> = [T, (action: React.SetStateAction<T>) => UseReduxSetReturn<T>, () => UseReduxSetReturn<T>]
export type OnStateChange<T> = ((state: T, action: PathStoreAction<T>, newState: T) => any) | undefined
export type StateReducer<T> = (state: T, action: PathStoreAction<T>) => T
export type ValueOf<T> = T[keyof T];

export type PathStoreAction<T> = {
  type: string
  immutablePath: string
  value: ActionPayload<T>
}

export type FindWithinState<T, U> = (value: T) => U

export type ActionPayload<T> = {
  key: string
  value: T
}

export type MorphsAs<T> = {
  [key in keyof T]: PathStoreMap<T[key]>
};

export type PathPropMap<T> = {
  store?: EnhancedStore
  context?: React.Context<T>
  reduxPath: string
  path: string // The objects path used for immutable object path set
  defaultValue: T // Allows us to reset a value
  actionName: string // Redux action name
};

export type PathStoreMap<T> = MorphsAs<T> & PathPropMap<T>
