import React from 'react'

export interface PathContext<T> {
  context: React.Context<T>
  initialState: T
  paths: PathStoreMap<T>
  reduxPath: string
}

export type ContextStateWithSet<T> = React.Context<T> & {
  setContext: (callback: ((newContext: T) => T)) => any
}

export type UseContextSetReturn<T> = React.Dispatch<React.SetStateAction<T>> | PathStoreAction<T>

export type UseWithinState<T, U> = [U, (action: React.SetStateAction<U>) => UseContextSetReturn<T>, () => UseContextSetReturn<T>]

export type UseContextState<T> = [T, (action: React.SetStateAction<T>) => UseContextSetReturn<T>, () => UseContextSetReturn<T>]

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
  context?: React.Context<T>
  reduxPath: string
  path: string // The objects path used for immutable object path set
  defaultValue: T // Allows us to reset a value
  actionName: string // Redux action name
};

export type PathStoreMap<T> = MorphsAs<T> & PathPropMap<T>
