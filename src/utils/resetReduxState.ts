import { setReduxState } from '../utils/setReduxState'
import { PathStoreMap } from '../types'

export function resetReduxState<T>(pathMap: PathStoreMap<T>) {
  return setReduxState(pathMap, pathMap.defaultValue)
}
