import * as immutable from 'object-path-immutable'
import { PathStoreMap } from '../index'

export function getReduxState<T>(pathStoreMap: PathStoreMap<T>) {
  return immutable.get(pathStoreMap.store.getState(), pathStoreMap.path)
}
