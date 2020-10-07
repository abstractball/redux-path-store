import { PathStoreMap } from '../index'
import immutable from "object-path-immutable"

export function getReduxState<T>(pathStoreMap: PathStoreMap<T>) {
  return immutable.get(pathStoreMap.store.getState(), pathStoreMap.path)
}
