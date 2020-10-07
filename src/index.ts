import {createPathStore, getReduxState, setReduxState} from './Helpers'
import useReduxState from './useReduxState'
import { EnhancedStore } from '@reduxjs/toolkit'

type MorphsAs<T> = {
  [key in keyof T]: PathStoreMap<T[key]>
};

export type PathStoreMap<T> = MorphsAs<T> & {
  store: EnhancedStore
  path: string // The string path to access the objects attribute.
  defaultValue: T // Allows us to reset a value
  actionName: string // Redux action name.
};


export {createPathStore, useReduxState, getReduxState, setReduxState}
