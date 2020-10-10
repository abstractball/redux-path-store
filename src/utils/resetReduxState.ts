import { PathStoreMap, setReduxState } from '../index'

export function resetReduxState<T>(pathMap: PathStoreMap<T>) {
  return setReduxState(pathMap, pathMap.defaultValue)
}
