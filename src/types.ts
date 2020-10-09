import { EnhancedStore } from '@reduxjs/toolkit'

export interface ActionMap<T> {
  [key: string]: StateReducer<T>
}

export type OnStateChange<T> = ((state: T, action: any, newState: T) => any) | undefined
export type StateReducer<T> = (state: T, payload: { key: string, value: any }) => T
export type ValueOf<T> = T[keyof T];

export type MorphsAs<T> = {
  [key in keyof T]: PathStoreMap<T[key]>
};

export type PathStoreMap<T> = MorphsAs<T> & {
  store: EnhancedStore // Redux store we generated with the map
  path: string // The objects path used for immutable object path set
  defaultValue: T // Allows us to reset a value
  actionName: string // Redux action name
};