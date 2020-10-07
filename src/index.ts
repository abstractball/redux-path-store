import useReduxState from './hooks/useReduxState'
import { EnhancedStore } from '@reduxjs/toolkit'
import { setReduxState } from './utils/setReduxState';
import { getReduxState } from './utils/getReduxState';
import { createStoreFromState } from './utils/createStoreFromState';

type MorphsAs<T> = {
  [key in keyof T]: PathStoreMap<T[key]>
};

export type PathStoreMap<T> = MorphsAs<T> & {
  store: EnhancedStore // Redux store we generated with the map
  path: string // The objects path used for immutable object path set
  defaultValue: T // Allows us to reset a value
  actionName: string // Redux action name
};


export {createStoreFromState, useReduxState, getReduxState, setReduxState}
