import * as immutable from 'object-path-immutable'
import { PathStoreMap } from '../types'

export function getReduxState<T>(pathStoreMap: PathStoreMap<T>) {
  if (!pathStoreMap.store || !('dispatch' in pathStoreMap.store)) {
    throw new Error('Missing store')
  }

  return immutable.get(pathStoreMap.store.getState(), pathStoreMap.path) as T
}
