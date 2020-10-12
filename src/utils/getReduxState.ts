import * as immutable from 'object-path-immutable'
import { PathStoreMap } from '../types'

export function getReduxState<T>(pathStoreMap: PathStoreMap<T>) {
  return immutable.get(pathStoreMap.store.getState(), pathStoreMap.path) as T
}
