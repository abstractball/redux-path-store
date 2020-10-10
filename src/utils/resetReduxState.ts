import { PathStoreMap, setReduxState } from '../index'

export function resetReduxState<T>(pathMap: PathStoreMap<T>) {
  setReduxState(pathMap, pathMap.defaultValue)
}
