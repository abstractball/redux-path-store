import { PathStoreMap, setReduxState } from '../index'

export function resetRootState<T>(pathMap: PathStoreMap<T>) {
  setReduxState(pathMap, pathMap.defaultValue)
}
