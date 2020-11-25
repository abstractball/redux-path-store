import { PathStoreMap } from '../types'
import { setReduxState } from './setReduxState'

export function resetReduxState<T>(pathMap: PathStoreMap<T>) {
  return setReduxState(pathMap, pathMap.defaultValue)
}
